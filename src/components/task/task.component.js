export default {
    name: 'task',
    config: {
        bindings: {
            task: '<',
            editTask: '&',
        },
        template: `
            <md-card>
                <md-card-header>
                    <md-card-header-text>
                        <span 
                            class="md-title" 
                            data-ng-bind="$ctrl.task.subject"
                            data-ng-click="$ctrl.editTask(task)"
                        />
                    </md-card-header-text>
                </md-card-header>
                <md-card-content>
                    <p style="word-wrap: break-word" data-ng-bind="$ctrl.task.description"></p>
                </md-card-content>
                <md-card-actions layout="row" layout-align="end center">
                  <follow-button-container subject-id="$ctrl.task.id"></follow-button-container>
                  <md-button class="md-icon-button" aria-label="Edit">
                    <md-icon>edit</md-icon>
                  </md-button>
                </md-card-actions>
            </md-card>
        `
    }
}