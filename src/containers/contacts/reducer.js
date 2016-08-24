import {
    RECEIVE_CONTACTS,
    CONTACT_UPDATED,
    CONTACT_REMOVED,
    CONTACT_CREATED,
} from "./constants";
import objectKeysToCase from "../../util/object-keys-to-case";
import sliceNameToFirstAndLastName from "../../util/slice-name-to-first-and-last-name";

export default function contacts(state = [], action) {
    switch (action.type) {
        case RECEIVE_CONTACTS:
            action.payload = objectKeysToCase(action.payload);

            return [
                ...state
            ].concat(action.payload.filter(contact =>
                state.every(old => old.id !== contact.id)
            )).map(contact => ({
                ...contact,
                ...sliceNameToFirstAndLastName(contact.name)
            }));
        case CONTACT_UPDATED:
            const updatedContact = objectKeysToCase(action.payload);
            return state.map(contact => {
                if(contact.id === updatedContact.id) {
                    const newContact = {
                        ...contact,
                        ...updatedContact,
                        ...sliceNameToFirstAndLastName(updatedContact.name)
                    };

                    return {
                        ...newContact,
                        name: `${newContact.firstName} ${newContact.lastName}`,
                    };
                }

                return {...contact};
            });
        case CONTACT_REMOVED:
            return state.filter(contact => contact.id !== action.payload.id);
        case CONTACT_CREATED:
            action.payload = objectKeysToCase(action.payload);

            return [
                ...state,
                {
                    ...action.payload,
                    ...sliceNameToFirstAndLastName(action.payload.name)
                },
            ];
    }

    return state;
}