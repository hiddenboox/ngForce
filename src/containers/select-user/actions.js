import actions from "./constants";

export function fetchUsers() {
    return {
        type: actions.FETCH_USERS
    };
}

export function receiveUsers(payload) {
    return {
        type: actions.RECEIVE_USERS,
        payload
    };
}