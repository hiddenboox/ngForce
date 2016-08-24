import merge from "lodash/merge";

import actions from "./constants";

export default function users(state = [], action) {
    switch(action.type) {
        case actions.RECEIVE_USERS:
            return merge({}, state, action.payload.entities.users);
    }

    return state;
}