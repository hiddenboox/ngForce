import angular from "angular";

import storage from "./storage.component";

export default angular.module('app.containers.storage', [])
    .component(storage.name, storage.config)
    .name;