import angular from "angular";
import materialDesign from "angular-material";
import uiState from "angular-ui-router";

import createTask from "./create-task.component";
import config from "./create-task.config";

export default angular.module('app.containers.createTask', [
    materialDesign,
    uiState,
])
    .component(createTask.name, createTask.config)
    .config(config)
    .name;