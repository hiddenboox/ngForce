import angular from "angular";
import styles from "./styles.css";

class FollowButtonController {
    $onInit() {
        this.isDone = false;
    }

    $onDestroy() {

    }
}

const like = {
    name: 'followButton',
    config: {
        controller: FollowButtonController,
        bindings: {
            onClick: '&',
        },
        template: `
          <md-button class="md-icon-button" aria-label="Follow" ng-click="$ctrl.onClick()">
            <md-icon>favorite_border</md-icon>
          </md-button>
        `
    }
};

export default angular.module('app.containers.like', [])
    .component(like.name, like.config)
    .name;