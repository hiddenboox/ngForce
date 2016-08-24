import angular from "angular";

class EmptyListContainerController {
    checkVisibilityState() {
        return !this.getCountOfItems(this.items) && !this.isFetching;
    }

    getCountOfItems(val) {
        if(val instanceof Array) {
            return val.length;
        }

        return Object.keys(val).length;
    }
}

const emptyListContainer = {
    name: 'emptyListContainer',
    config: {
        controller: EmptyListContainerController,
        bindings: {
            isFetching: '<',
            items: '<',
            buttonText: '@',
            text: '@',
            action: '&',
        },
        template: `
            <empty-list 
                ng-if="$ctrl.checkVisibilityState()"
                button-text="{{ ::$ctrl.buttonText }}"
                text="{{ ::$ctrl.text }}"
                action="$ctrl.action()"
            ></empty-list>`
    }
};

export default angular.module('app.containers.empty-list', [])
    .component(emptyListContainer.name, emptyListContainer.config)
    .name;