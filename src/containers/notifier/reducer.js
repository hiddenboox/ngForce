import {
    RECEIVE_NOTIFICATION_FROM_SERVER,
    NOTIFICATION_FROM_SERVER_SEEN,
    ALERT_JUMPED,
} from "./constants";
import { Record } from 'immutable';

const InitialState = Record({
    visible: false,
    errorCode: '',
    seen: false,
    message: '',
});

export default function notifier(state = new InitialState(), action) {
    if (!(state instanceof InitialState)) return new InitialState(state);

    switch(action.type) {
        case RECEIVE_NOTIFICATION_FROM_SERVER:
            return state.merge({
               errorCode: action.payload.errorCode,
               message: action.payload.message,
               seen: false,
            });
        case NOTIFICATION_FROM_SERVER_SEEN:
            return state.merge({
                seen: true,
                visible: false,
                message: '',
            });
        case ALERT_JUMPED:
            return state.set('visible', true);
        default:
            return state;
    }
}
