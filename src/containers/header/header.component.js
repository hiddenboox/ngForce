import { logout } from "../authorize/actions";

const REDUX = new WeakMap();

class HeaderController {
    constructor($ngRedux) {
        REDUX.set(this, $ngRedux);
    }

    $onInit() {
        this.unsubscribe = REDUX.get(this).connect(this.mapStateToThis)(this);
    }

    $onDestory() {
        this.unsubscribe();
    }

    mapStateToThis(state) {
        return {
            user: state.user
        };
    }

    logout() {
        REDUX.get(this).dispatch(logout());
    }
}
HeaderController.$inject = ['$ngRedux'];

export default {
    name: 'appHeader',
    config: {
        controller: HeaderController,
        template: `
            <md-toolbar layout="row">
              <div class="md-toolbar-tools">
                <h2>
                    <a ui-sref="home">ngForce</a>
                </h2>
                <h6 flex-offset="5" ng-show="$ctrl.user">
                    Hello, <span data-ng-bind="$ctrl.user.name"/>
                </h6>
                <span flex></span>
                <md-button class="md-icon-button" aria-label="Logout" ng-click="$ctrl.logout()">
                  <md-icon>exit_to_app</md-icon>
                </md-button>
              </div>
            </md-toolbar>
        `
    }
}