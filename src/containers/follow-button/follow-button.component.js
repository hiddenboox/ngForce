const FOLLOW_BUTTON_SERVICE = new WeakMap();
const REDUX = new WeakMap();

class FollowButtonContainerController {
    constructor($ngRedux, followButtonService) {
        FOLLOW_BUTTON_SERVICE.set(this, followButtonService);
        REDUX.set(this, $ngRedux);
    }

    $onInit() {
        this.unsubscribe = REDUX.get(this).connect(null, this.mapDispatchToThis())(this);
    }

    mapDispatchToThis() {
        return {
            toggleFollow: FOLLOW_BUTTON_SERVICE.get(this).toggleFollow.bind(this, this.subjectId)
        };
    }

    $onDestroy() {
        this.unsubscribe();
    };
}
FollowButtonContainerController.$inject = ['$ngRedux', 'followButtonService'];

export default {
    name: 'followButtonContainer',
    config: {
        bindings: {
            subjectId: '<'
        },
        controller: FollowButtonContainerController,
        template: `<follow-button on-click="$ctrl.toggleFollow()"></follow-button>`
    }
};
