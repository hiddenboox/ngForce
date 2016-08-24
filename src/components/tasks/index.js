import angular from "angular";

import tasks from "./tasks.component";

export default angular.module('app.components.tasks', [])
    .component(tasks.name, tasks.config)
    .name;