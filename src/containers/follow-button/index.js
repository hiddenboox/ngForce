import angular from "angular";

import followButtonService from "./follot-button.service";
import followButton from "./follow-button.component";
import followService from "./follow.service";

export default angular.module('app.containers.follow', [])
    .component(followButton.name, followButton.config)
    .service('followButtonService', followButtonService)
    .service('followService', followService)
    .name;