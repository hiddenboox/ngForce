import angular from "angular";

import app from './app.component';

export default angular.module('app.containers.app', [])
    .component(app.name, app.config)
    .name;