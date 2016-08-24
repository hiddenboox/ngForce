import objectKeysToCase from "../../util/object-keys-to-case";

const REQUEST = new WeakMap();

class TasksService {
    constructor(requestService) {
        REQUEST.set(this, requestService);
        this.objectName = 'task';
    }

    fetchTasks(fields, predicates, opt) {
        let query = `select ${fields} from ${this.objectName}`;

        if(predicates) {
            query = `select ${fields} from ${this.objectName} WHERE ${predicates.join(' ')}`;
        }

        if(opt) {
            query += opt;
        }

        return REQUEST.get(this).get(query)
            .then(({ data }) => objectKeysToCase(data.records));
    }

    fetchLike(insertedById) {
        return REQUEST.get(this).get(`select feedItemId, feedEntityId, insertedById where insertedById == ${insertedById}`)
            .then(::console.log);
    }

    createTask(task) {
        return REQUEST.get(this).post(this.objectName, task)
            .then(({ data }) => objectKeysToCase(data));
    }

    fetchTask(id, fields) {
        const config = {
            params: {
                fields
            },
            url: REQUEST.get(this).retrievePath(this.objectName, id),

        };
        return REQUEST.get(this).get(config)
            .then(({ data }) => objectKeysToCase(data));
    }

    static factory(requestService) {
        return new TasksService(requestService);
    }
}
TasksService.factory.$inject = ['requestService'];

export default TasksService.factory;
