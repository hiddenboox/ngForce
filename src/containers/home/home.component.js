const CONTACT_SERVICE = new WeakMap();
const DIALOG = new WeakMap();
const REDUX = new WeakMap();

class HomeController {
    constructor($ngRedux, $mdDialog, ContactService) {
        CONTACT_SERVICE.set(this, ContactService);
        DIALOG.set(this, $mdDialog);
        REDUX.set(this, $ngRedux);
    }

    $onInit() {
        this.unsubscribe = REDUX.get(this).connect(this.mapStateToThis, this.mapDispatchToThis())(this);

    }

    $onDestroy() {
        this.unsubscribe();
    }

    showCreateContactForm() {
        return DIALOG.get(this).show({
            controller: ['$scope', '$mdDialog', '$ngRedux', 'ContactService',
                function ($scope, $mdDialog, $ngRedux, ContactService) {
                this.saving = false;

                this.cancel = () => {
                    $mdDialog.cancel();
                };

                this.saveFailed = messages => {
                    this.saving = false;

                    this.errorMessage = messages[0].message;
                };

                this.save = contact => {
                    this.errorMessage = '';
                    this.saving = true;

                    return $ngRedux.dispatch(ContactService.createContact(contact))
                        .then(::$mdDialog.hide)
                        .catch(::this.saveFailed)
                        .then(() => $scope.$apply());
                };
            }],
            controllerAs: '$ctrl',
            template: require('../contacts/create-contact.dialog.html'),
            parent: angular.element(document.body),
            clickOutsideToClose: true,
        }).then(::console.log);
    }

    mapStateToThis(state) {
        return {
            contacts: state.contacts
        }
    }

    mapDispatchToThis() {
        return {
            fetchContacts: CONTACT_SERVICE.get(this).fetchContacts,
        }
    }
}
HomeController.$inject = ['$ngRedux', '$mdDialog', 'ContactService'];

export default {
    name: 'home',
    config: {
        controller: HomeController,
        template: `
            <div layout layout-align="space-between start">
                <md-button ng-click="$ctrl.fetchContacts()">Load contacts</md-button>
                <md-button class="md-icon-button" ng-click="$ctrl.showCreateContactForm()">
                    <md-icon>add</md-icon>
                </md-button>
            </div>
            <contacts contacts="$ctrl.contacts"></contacts>
        `
    }
}