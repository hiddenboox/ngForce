import angular from "angular";

import welcome from "./welcome.component";

export default angular.module('app.containers.welcome', [])
    .component(welcome.name, welcome.config)
    .name;