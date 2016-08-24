import angular from "angular";

class SelectUserController {
    $onInit() {
        this.user = this.initialUser;
    }

    selectUser(user) {
        this.onSelectUser({
            user
        });
    }
}

const selectUser = {
    name: 'selectUser',
    config: {
        controller: SelectUserController,
        bindings: {
          initialUser: '<',
          users: '<',
          onSelectUser: '&',
          onLoadUser: '&'
        },
        template: `
            <md-select 
                style="min-width: 200px;"
                placeholder="Assign to user" 
                ng-model="$ctrl.user" 
                md-on-open="$ctrl.onLoadUser()" 
                md-on-close="$ctrl.selectUser($ctrl.user)"
            >
                <md-option ng-value="user" ng-repeat="user in $ctrl.users track by user.id">{{user.name}}</md-option>
            </md-select>
        `
    }
};

export default angular.module('app.components.selectUser', [])
    .component(selectUser.name, selectUser.config)
    .name;