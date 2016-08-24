const AUTH_SERVICE = new WeakMap();
const REQUEST = new WeakMap();
const REDUX = new WeakMap();

class AuthorizeController {
    constructor($ngRedux, AuthService, RequestService) {
        AUTH_SERVICE.set(this, AuthService);
        REQUEST.set(this, RequestService);
        REDUX.set(this, $ngRedux);

        this.unsubscribe = REDUX.get(this).connect(this.mapStateToThis, this.mapDispatchToThis())(this);
    }

    login() {
        return this.requestLogin(this.user)
            .then(({ id }) => this.getUserById(id));
    }

    mapStateToThis(state) {
        return {
            user: state.user
        };
    }

    mapDispatchToThis() {
        const { login, getUserById } = AUTH_SERVICE.get(this);

        return {
            getUserById,
            requestLogin: login,
        };
    }
}
AuthorizeController.$inject = ['$ngRedux', 'AuthService', 'requestService'];

export default {
    name: 'authorize',
    config: () => {
        return {
            controller: AuthorizeController,
            controllerAs: '$authorize',
            transclude: true,
            link(scope, element, attrs, ctrl, transcludeFn) {
                transcludeFn(scope, clonedTranscludedContent => {
                    element.append(clonedTranscludedContent);
                });
            }
        }
    }
}