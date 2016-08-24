const REDUX = new WeakMap();
const CONTACT_SERVICE = new WeakMap();

class ContactsController {
    constructor($ngRedux, ContactService) {
        CONTACT_SERVICE.set(this, ContactService);
        REDUX.set(this, $ngRedux);
    }

    $onInit() {
        this.unsubscribe = REDUX.get(this).connect(
            this.mapStateToThis,
            this.mapDispatchToThis()
        )(this);
    }

    delete(contact) {
        this.deleteContact(contact);
    }

    mapDispatchToThis() {
        return {
            deleteContact: CONTACT_SERVICE.get(this).removeContact,
        };
    }
}
ContactsController.$inject = ['$ngRedux', 'ContactService'];

export default {
    name: 'contacts',
    config: {
        controller: ContactsController,
        bindings: {
            contacts: '<',
        },
        template: `
            <div>
                <md-list>
                    <contact 
                        data-ng-repeat="contact in $ctrl.contacts track by contact.id" 
                        contact="contact"
                        delete="$ctrl.delete(contact)"
                    />
                </md-list>
            </div>
        `
    }
};