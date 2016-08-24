import actions from "./constants";

export function fetchTasks() {
    return {
        type: actions.FETCH_TASKS,
    };
}

export function receiveTasks(payload) {
    return {
        type: actions.RECEIVE_TASKS,
        payload,
    };
}

export function fetchTask() {
    return {
        type: actions.FETCH_TASK
    }
}

export function createTask() {
    return {
        type: actions.CREATE_TASK,
    };
}

export function receiveTask(payload) {
    return {
        type: actions.RECEIVE_TASK,
        payload,
    };
}

export function changeFilter(payload) {
    return {
        type: actions.CHANGE_TASKS_FILTER,
        payload,
    }
}