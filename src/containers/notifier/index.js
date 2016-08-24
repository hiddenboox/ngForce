import angular from "angular";

import notifier from "./notifier.component";

export default angular.module('app.containers.notifier', [])
    .component(notifier.name, notifier.config)
    .name;