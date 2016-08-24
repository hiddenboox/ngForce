import merge from 'lodash/merge';
import union from 'lodash/union';

import {
    LOGIN_USER,
    LOGOUT_USER,
    RECEIVE_USER_DATA,
} from "./constants";
import actions from  "../tasks-page/constants";
import objectKeysToCase from "../../util/object-keys-to-case";
import sliceNameToFirstAndLastName from "../../util/slice-name-to-first-and-last-name";

export default function user(state = {}, action) {
    switch(action.type) {
        case LOGIN_USER:
            return state;
        case RECEIVE_USER_DATA:
            action.payload = objectKeysToCase(action.payload);

            return {
                ...state,
                ...action.payload,
                id: action.payload.id.split('/').pop(),
                ...sliceNameToFirstAndLastName(action.payload.name),
                logged: true
            };
        case LOGOUT_USER:
            return {
                logged: false
            };
        case actions.RECEIVE_TASKS: {
            return merge({}, state, {
                ids: union(state.ids, action.payload.result)
            });
        }
        case actions.RECEIVE_TASK:
            return merge({}, state, {
                ids: union(state.ids, action.payload.result)
            });
        default:
            return state;
    }
}