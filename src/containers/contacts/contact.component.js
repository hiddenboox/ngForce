const CONTACT_SERVICE = new WeakMap();
const DIALOG = new WeakMap();
const REDUX = new WeakMap();

class ContactController {
    constructor($mdDialog, $ngRedux, ContactService) {
        CONTACT_SERVICE.set(this, ContactService);
        DIALOG.set(this, $mdDialog);
        REDUX.set(this, $ngRedux);
    }

    $onInit($mdDialog) {
        this.contact = {...this.contact};
    }

    delete(contact) {
        const confirm = DIALOG.get(this).confirm()
            .title('Realy want to delete this record?')
            .textContent(`${contact.name} will be removed forever`)
            .ariaLabel('Deleting item')
            .ok('Delete')
            .cancel('cancel');
        DIALOG.get(this).show(confirm).then(() => this.deleteContact({contact}));
    }

    showDetail(contact) {
        const dialog = DIALOG.get(this);
        const fields = [
            'Birthdate',
            'Name',
            'CleanStatus',
            'Department',
            'Description',
            'Email',
        ];

        REDUX.get(this).dispatch(CONTACT_SERVICE.get(this).getById(contact.id, fields))
            .then(contact =>
                dialog.show(
                    dialog.alert()
                        .clickOutsideToClose(true)
                        .title(`Detail of ${contact.name}`)
                        .textContent(JSON.stringify(contact))
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Got it!')
                )
            );
    }

    edit(contact) {
        DIALOG.get(this).show({
            controller: ['$scope', '$mdDialog', '$ngRedux', 'ContactService', 'contact',
                function ($scope, $mdDialog, $ngRedux, ContactService, contact) {
                    this.contact = {...contact};
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

                        return $ngRedux.dispatch(ContactService.updateContact(contact))
                            .then(::$mdDialog.hide)
                            .catch(::this.saveFailed)
                            .then(() => $scope.$apply());
                    };
            }],
            controllerAs: '$ctrl',
            template: require('./edit-contact.dialog.html'),
            locals: {
                contact
            },
            parent: angular.element(document.body),
            clickOutsideToClose:true,
        });
    }
}
ContactController.$inject = ['$mdDialog', '$ngRedux', 'ContactService'];

export default {
    name: 'contact',
    config: {
        controller: ContactController,
        bindings: {
            contact: '<',
            updateContact: '&update',
            deleteContact: '&delete',
        },
        template: `
            <md-list-item ng-click="$ctrl.showDetail($ctrl.contact)" class="noright">
                <p>{{ $ctrl.contact.name }}</p>
                <md-button class="md-icon-button" ng-click="$ctrl.edit($ctrl.contact)">
                    <md-icon>edit</md-icon>
                </md-button>
                <md-button class="md-icon-button" ng-click="$ctrl.delete($ctrl.contact)">
                    <md-icon>delete</md-icon>
                </md-button>
            </md-list-item>
        `
    }
}