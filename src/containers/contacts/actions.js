import {
    FETCH_CONTACTS,
    RECEIVE_CONTACTS,
    CONTACT_UPDATED,
    CONTACT_REMOVED,
    CONTACT_CREATED,
} from "./constants";

export function requestContacts() {
    return {
        type: FETCH_CONTACTS
    };
}

export function receiveContacts(contacts) {
    return {
        type: RECEIVE_CONTACTS,
        payload: contacts
    }
}

export function updateContact(contact) {
    return {
        type: CONTACT_UPDATED,
        payload: contact
    };
}

export function deleteContact(contact) {
    return {
        type: CONTACT_REMOVED,
        payload: contact
    }
}

export function createContact(contact) {
    return {
        type: CONTACT_CREATED,
        payload: contact
    }
}