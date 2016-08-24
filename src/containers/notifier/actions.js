import {
    RECEIVE_NOTIFICATION_FROM_SERVER,
    NOTIFICATION_FROM_SERVER_SEEN,
    ALERT_JUMPED,
} from "./constants";

export function receiveError(error) {
    return {
        type: RECEIVE_NOTIFICATION_FROM_SERVER,
        payload: error,
    }
}

export function alertJumped() {
    return {
        type: ALERT_JUMPED,
    }
}

export function userSeenNotification() {
    return {
        type: NOTIFICATION_FROM_SERVER_SEEN
    }
}