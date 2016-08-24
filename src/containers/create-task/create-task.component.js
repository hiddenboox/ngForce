import angular from "angular";

import { createTask } from "../tasks-page/actions";

const TASK_PAGE_SERVICE = new WeakMap();
const TASKS_SERVICE = new WeakMap();
const DIALOG = new WeakMap();
const REDUX = new WeakMap();
const STATE = new WeakMap();

class CreateTaskController {
    constructor($mdDialog, $state, $ngRedux, tasksService, taskPageService) {
        TASK_PAGE_SERVICE.set(this, taskPageService);
        TASKS_SERVICE.set(this, tasksService);
        DIALOG.set(this, $mdDialog);
        REDUX.set(this, $ngRedux);
        STATE.set(this, $state);
    }

    $onInit() {
        this.unsubscribe = REDUX.get(this).connect(this.mapStateToThis, this.mapDispatchToThis())(this);
        this.initialUser = this.users[this.selectedOwnerId];
        this.createAndShowDialog(this);
    }

    $onDestroy() {
        this.unsubscribe();
    }

    mapDispatchToThis() {
        return {
            createTask: this.createTask.bind(this)
        };
    }

    mapStateToThis(state) {
        return {
            selectedOwnerId: state.tasks.filter.selectedOwnerId,
            users: state.users,
        };
    }

    createTask(task) {
        return (dispatch, getState) => {
            const fields = 'id,subject,description';
            dispatch(createTask());
            return TASKS_SERVICE.get(this).createTask(task)
                .then(json => {
                    if(task.ownerId === getState().tasks.filter.selectedOwnerId) {
                        dispatch(TASK_PAGE_SERVICE.get(this).fetchTask(json.id, fields))
                    }
                });
        }
    }

    createAndShowDialog(parentController) {
        return DIALOG.get(this).show({
            controller: ['$mdDialog',
                function($mdDialog) {
                    this.saving = false;
                    this.task = {};
                    this.initialUser = parentController.initialUser;

                    this.cancel = () => {
                        $mdDialog.cancel();
                    };

                    this.saveFailed = ({data: messages}) => {
                        this.saving = false;

                        if(messages instanceof Array) {
                            this.errorMessage = messages[0].message;
                        } else {
                            this.errorMessage = messages.message;
                        }
                    };

                    this.save = task => {
                        this.errorMessage = '';
                        this.saving = true;

                        parentController.createTask(task)
                            .then(::$mdDialog.hide)
                            .catch(::this.saveFailed)
                    };

                    this.selectUser = ({ id }) => {
                        this.task.ownerId = id;
                    };
                }],
            controllerAs: '$ctrl',
            template: require('./create-task.dialog.html'),
            parent: angular.element(document.body),
            clickOutsideToClose: true,
        })
            .finally(() => STATE.get(this).go('taskPage'));
    }
}
CreateTaskController.$inject = [
    '$mdDialog',
    '$state',
    '$ngRedux',
    'tasksService',
    'taskPageService'
];

export default {
    name: 'createTaskDialog',
    config: {
        controller: CreateTaskController,
        template: `<div></div>`
    }
};
