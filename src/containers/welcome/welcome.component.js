import config from "../../config";

const AUTH_SERVICE = new WeakMap();
const REDUX = new WeakMap();

class HelloController {
    constructor($ngRedux, AuthService) {
        AUTH_SERVICE.set(this, AuthService);
        REDUX.set(this, $ngRedux);
    }

    $onInit() {
        this.unsubscribe = REDUX.get(this).connect(null, this.mapDispatchToThis())(this);
        this.appName = config.appName;
    }

    $onDestoy() {
        this.unsubscribe();
    }

    mapDispatchToThis() {
        const { login } = AUTH_SERVICE.get(this);

        return {
            login,
        };
    }
}
HelloController.$inject = ['$ngRedux', 'AuthService'];

export default {
    name: 'welcome',
    config: {
        controller: HelloController,
        require: {
            authorize: '?^^authorize',
        },
        template: `
            <div layout="column" layout-align="center center" layout-fill>
                <div layout layout-align="center center">
                    <md-card flex="50">
                        <md-card-header>
                            <md-card-header-text>
                                <span class="md-title">ngForce</span>
                                <span class="md-subhead">an angular application</span>
                            </md-card-header-text>
                        </md-card-header>
                        <md-card-content>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                In mollis ultrices orci porta bibendum. 
                                Sed tincidunt massa ac nunc tempus, in sodales arcu bibendum. 
                                Phasellus aliquet vitae odio vitae laoreet. Sed at interdum magna, a viverra ex. 
                                Sed sagittis ligula sed nulla convallis egestas nec eu metus. Ut quis nulla orci.
                            </p>
                        </md-card-content>
                        <md-card-actions layout="column" layout-align="start">
                            <md-button ng-click="$ctrl.authorize.login()">Login</md-button>
                        </md-card-actions>
                    </md-card>
                </div>
                <span flex="50"></span>
            </div>
        `
    },
}