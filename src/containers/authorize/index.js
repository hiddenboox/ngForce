import angular from "angular";

import directive from "./directive";
import service from './service';

export default angular.module('app.containers.authorize', [])
    .directive(directive.name, directive.config)
    .factory('AuthService', service)
    .name;