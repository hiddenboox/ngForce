import uiState from 'angular-ui-router';
import angular from "angular";

import taskPageService from "./tasks-page.service";
import tasksService from "./tasks.service";
import taskPage from "./task-page.component";
import config from "./task-page.config";

export default angular.module('taskPage', [
    uiState
])
    .service('taskPageService', taskPageService)
    .component(taskPage.name, taskPage.config)
    .service('tasksService', tasksService)
    .config(config)
    .name;
