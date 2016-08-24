import angular from "angular";

import styles from "./empty-list.css";

class EmptyListController {
    $onInit() {
        this.styles = styles;
    }
}

const emptyList = {
    name: 'emptyList',
    config: {
        controller: EmptyListController,
        bindings: {
            buttonText: '@',
            text: '@',
            action: '&',
        },
        template: `
            <div class="{{ ::$ctrl.styles.emptyList }}">
                <p data-ng-bind="$ctrl.text"></p>
                <md-button ng-click="$ctrl.action()">{{ ::$ctrl.buttonText }}</md-button>
            </div>
        `
    }
}

export default angular.module('app.components.emptyList', [])
    .component(emptyList.name, emptyList.config)
    .name;