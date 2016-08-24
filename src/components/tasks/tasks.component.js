export default {
    name: 'tasks',
    config: {
        bindings: {
            isFetching: '<',
            tasks: '<',
            editTask: '&',
            addTask: '&',
        },
        template: `
            <task 
                ng-repeat="task in $ctrl.tasks track by task.id" 
                edit-task="$ctrl.editTask(task)"
                task="task"
            ></task>
            <empty-list-container
                is-fetching="$ctrl.isFetching"
                text="No assigned tasks" 
                button-text="Add task"
                items="$ctrl.tasks"
                action="$ctrl.addTask()" 
            ></empty-list-container>
        `
    }
}
