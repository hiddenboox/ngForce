import styles from "./tasks-page.css";

const TASK_PAGE_SERVICE = new WeakMap();
const STATE = new WeakMap();
const REDUX = new WeakMap();

class TaskPageController {
    constructor($ngRedux, $state, taskPageService) {
        TASK_PAGE_SERVICE.set(this, taskPageService);
        REDUX.set(this, $ngRedux);
        STATE.set(this, $state);

        this.styles = styles;
        this.createTaskStateName = 'taskPage.create';
    }

    $onInit() {
        this.unsubscribe = REDUX.get(this).connect(
            this.mapStateToThis,
            this.mapDispatchToThis()
        )(this);

        REDUX.get(this).dispatch(this.onChangeFilter(this.user));
        REDUX.get(this).dispatch(this.onFetchTasksByUserId(this.taskFilters.selectedOwnerId));
    }

    $onDestroy() {
        this.unsubscribe();
    }

    mapStateToThis(state) {
        const {isFetching, items, filter} = state.tasks;
        return {
            taskFilters: filter,
            tasks: items,
            isFetching,
            user: state.users[state.user.id]
        }
    }

    mapDispatchToThis() {
        return {
            toggleShowCompleted: this.onToggleShowCompleted.bind(this),
            fetchTasksByUserId: this.onFetchTasksByUserId.bind(this),
            changeFilter: this.onChangeFilter.bind(this),
        };
    }

    onChangeFilter({id, showCompleted}) {
        return TASK_PAGE_SERVICE.get(this).changeFilter({ selectedOwnerId: id, showCompleted });
    }

    onToggleShowCompleted() {
        return this.onChangeFilter({ showCompleted: !this.taskFilters.showCompleted });
    }

    createTask() {
        STATE.get(this).go(this.createTaskStateName);
    }

    onFetchTasksByUserId(id) {
        const fields = 'id, subject, description';
        const predicates = [`owner.id IN ('${id}')`];
        return TASK_PAGE_SERVICE.get(this).fetchTasks(fields, predicates);
    }
}
TaskPageController.$inject = ['$ngRedux', '$state','taskPageService'];

export default {
    name: 'taskPage',
    config: {
        controller: TaskPageController,
        template: `
            <div flex="none" layout layout-align="space-between center" layout-wrap>
                <md-button ng-click="$ctrl.fetchTasksByUserId($ctrl.taskFilters.selectedOwnerId)">
                    fetch tasks
                </md-button>
                <select-user-container 
                    initial-user="$ctrl.user" 
                    on-select-user="$ctrl.changeFilter(user)"
                ></select-user-container>
                <md-button class="md-icon-button" ui-sref="taskPage.create">
                    <md-icon>add</md-icon>
                </md-button>        
            </div>
            <div class="{{ ::$ctrl.styles.showCompleted }}">
                <md-checkbox ng-click="$ctrl.toggleShowCompleted()">Show completed</md-checkbox>
            </div>
            <div flex layout layout-align="center center" ng-if="$ctrl.isFetching">
                <md-progress-circular></md-progress-circular>
            </div>
            <tasks tasks="$ctrl.tasks" is-fetching="$ctrl.isFetching" add-task="$ctrl.createTask()"></tasks>
            <ui-view></ui-view>
        `
    }
}
