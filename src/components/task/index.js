import angular from "angular";

import task from "./task.component";

export default angular.module('app.components.task', [])
    .component(task.name, task.config)
    .name;