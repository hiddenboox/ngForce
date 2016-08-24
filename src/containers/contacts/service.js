import { receiveError } from "../notifier/actions";
import {
    requestContacts,
    receiveContacts,
    updateContact,
    deleteContact,
    createContact,
} from "./actions";

export default ['force', force => {
    const objectName = 'contact';

    function update(contact) {
        delete contact.name;
        return dispatch => {
            return force.update(objectName, contact)
                .then(() => dispatch(updateContact(contact)));
        };
    }

    function remove(contact) {
        return dispatch => {
            return force.del(objectName, contact.id)
                .then(() => dispatch(deleteContact(contact)))
                .catch(err => dispatch(receiveError(err[0])));
        }
    }

    function create(contact) {
        return dispatch => {
            return force.create(objectName, contact)
                .then(response =>
                    dispatch(getById(response.id, 'name'))

                );
        }
    }

    function fetch() {
        return dispatch => {
            dispatch(requestContacts());

            return force.query('select id, Name from contact LIMIT 50')
                .then(response => dispatch(receiveContacts(response.records)))
                .catch(err => dispatch(receiveError(err[0], )));
        };
    }

    function getById(id, fields) {
        const byId = id => contact => parseInt(id, 10) === parseInt(contact.id, 10);
        return (dispatch, getState) => {
            return force.retrieve(objectName, id, fields)
                .then(contact => {
                    const isExists = getState().contacts.some(contact => parseInt(contact.id, 10) === parseInt(id, 10));

                    if(isExists) {
                        dispatch(updateContact(contact));
                    } else {
                        dispatch(createContact(contact));
                    }
                })
                .then(() => getState().contacts.filter(byId(id))[0])
        };
    }

    return {
        fetchContacts: fetch,
        updateContact: update,
        removeContact: remove,
        createContact: create,
        getById,
    };
}];
