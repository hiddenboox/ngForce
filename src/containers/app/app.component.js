const CONTACT_SERVICE = new WeakMap();
const DIALOG = new WeakMap();
const REDUX = new WeakMap();

class AppController {
    constructor($ngRedux, ContactService, $mdDialog) {
        CONTACT_SERVICE.set(this, ContactService);
        DIALOG.set(this, $mdDialog);
        REDUX.set(this, $ngRedux);
    }

    $onInit() {
        this.unsubscribe = REDUX.get(this).connect(null, this.mapDispatchToTarget())(this);

        this.authorize.login();
    }

    $onDestoy() {
        this.unsubscribe();
    }

    mapDispatchToTarget() {
        return {
            fetchContacts: CONTACT_SERVICE.get(this).fetchContacts,
        };
    }
}
AppController.$inject = ['$ngRedux', 'ContactService', '$mdDialog'];

export default {
    name: 'app',
    config: {
        controller: AppController,
        require: {
          'authorize': '?^^authorize',
        },
        template: `
        <app-header></app-header>
        <md-content flex layout="column">
            <md-nav-bar aria-label="Navigation bar">
                <md-nav-item md-nav-sref="taskPage" name="tasks">Tasks</md-nav-item>           
            </md-nav-bar>
            <ui-view layout="column" flex></ui-view>
        </md-content>
    `
    }
};