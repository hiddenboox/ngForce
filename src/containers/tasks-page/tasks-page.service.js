import { normalize } from 'normalizr';

import Schemas from "../../store/schemas";
import {
    receiveTasks,
    changeFilter,
    receiveTask,
    fetchTasks,
    createTask,
    fetchTask,
} from "./actions";

const TASKS_SERVICE = new WeakMap();

class TaskPageService {
    constructor(tasksService) {
        TASKS_SERVICE.set(this, tasksService);
        this.fetchTasks = ::this.fetchTasks;
    }

    fetchTasks(...args) {
        return dispatch => {
            dispatch(fetchTasks());
            return TASKS_SERVICE.get(this).fetchTasks(...args)
                .then(json => ({
                    ...normalize(json, Schemas.TASK_ARRAY)
                }))
                .then(res => dispatch(receiveTasks(res)));
        };
    }

    createTask(task) {
        return dispatch => {
            dispatch(createTask());
            return TASKS_SERVICE.get(this).createTask(task)
                .then(json => dispatch(this.fetchTask(json.id, [`owner.id IN ('${task.ownerId}')`])))
        }
    }

    fetchTask(...args) {
        return dispatch => {
            dispatch(fetchTask());
            return TASKS_SERVICE.get(this).fetchTask(...args)
                .then(json => ({
                    ...normalize(json, Schemas.TASK)
                }))
                .then(task => dispatch(receiveTask(task)))
        }
    }

    changeFilter(filter) {
        return changeFilter(filter);
    }

    static factory(tasksService) {
        return new TaskPageService(tasksService);
    }
}
TaskPageService.factory.$inject = ['tasksService'];

export default TaskPageService.factory;