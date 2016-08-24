import angular from "angular";

import SelectUserService from "./select-user.service";
import UsersService from "./users.service";

const SELECT_USER_SERVICE = new WeakMap();
const REDUX = new WeakMap();

class SelectUserContainerController {
    constructor($ngRedux, selectUserService) {
        SELECT_USER_SERVICE.set(this, selectUserService);
        REDUX.set(this, $ngRedux);
    }

    $onInit() {
        this.unsubscribe = REDUX.get(this).connect(this.mapStateToThis, this.mapDispatchToProps())(this);
        this.initialUser = {...this.initialUser};

        if(this.initialUser) {
            this.selectUser(this.initialUser);
        }
    }

    $onDestroy() {
        this.unsubscribe();
    }

    mapStateToThis(state) {
        return {
            users: state.users,
        };
    }

    selectUser(user) {
        this.onSelectUser({
            user
        });
    }

    mapDispatchToProps() {
        return {
            fetchUsers: SELECT_USER_SERVICE.get(this).fetchUsers,
        };
    }
}
SelectUserContainerController.$inject = ['$ngRedux', 'selectUserService'];


const selectUser = {
  name: 'selectUserContainer',
  config: {
      controller: SelectUserContainerController,
      bindings: {
        initialUser: '<',
        onSelectUser: '&'
      },
      template: `
        <select-user 
            initial-user="$ctrl.initialUser"
            users="$ctrl.users"
            on-select-user="$ctrl.selectUser(user)"
            on-load-user="$ctrl.fetchUsers()"
        ></select-user>`
  }
};

export default angular.module('app.containers.selectUser', [])
    .component(selectUser.name, selectUser.config)
    .service('selectUserService', SelectUserService)
    .service('usersService', UsersService)
    .name;