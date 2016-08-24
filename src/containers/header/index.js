import angular from "angular";

import header from "./header.component";

export default angular.module('app.container.header', [])
    .component(header.name, header.config)
    .name;