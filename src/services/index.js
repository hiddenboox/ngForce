import angular from "angular";

import request from "./request/request.service";

export default angular.module('app.services', [
    request
]).name;
