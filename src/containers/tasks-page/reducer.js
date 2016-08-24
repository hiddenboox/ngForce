import merge from 'lodash/merge';

import actions from "./constants";

const initialState = {
    items: {},
    isFetching: false,
    filter: {
        selectedOwnerId: '',
        showCompleted: false,
    }
};

export default function tasks(state = initialState, action) {

    switch (action.type) {
        case actions.FETCH_TASKS:
            return {
                isFetching: true,
                items: {},
                filter: {
                    ...state.filter
                },
            };
        case actions.RECEIVE_TASKS:
        case actions.RECEIVE_TASK:
            return merge({}, state, {
                items: {
                    ...state.items,
                    ...action.payload.entities.tasks
                },
                isFetching: false,
            });
        case actions.CHANGE_TASKS_FILTER:
            return merge({}, state, {
                filter: {
                    ...action.payload
                }
            });
    }

    return state;
}