import keyMirror from 'key-mirror';
import { alertJumped, userSeenNotification } from "./actions";

const ERROR_CODES = keyMirror({ INVALID_SESSION_ID: null });

const DIALOG = new WeakMap();
const REDUX = new WeakMap();

class NotifierController {
    constructor($ngRedux, $mdDialog) {
        DIALOG.set(this, $mdDialog);
        REDUX.set(this, $ngRedux);
    }

    showAlert(error, errorCodes) {
        const alert = {
            clickOutsideToClose: true,
            template: `
                <md-dialog aria-label="Notification alert">
                  <md-dialog-content class="md-dialog-content">
                    <span data-ng-bind="$ctrl.error.message"/>
                  </md-dialog-content>
                  <md-dialog-actions ng-switch on="$ctrl.error.errorCode">
                    <div ng-switch-when="${ERROR_CODES.INVALID_SESSION_ID}">
                        <md-button 
                            ng-click="$ctrl.refreshToken()" 
                            class="md-primary"
                        >
                            refresh token
                        </md-button>
                    </div>
                    <div ng-switch-default>
                        <md-button 
                            ng-click="$ctrl.closeDialog()" 
                            class="md-primary"
                        >
                            ok
                        </md-button>
                    </div>
                  </md-dialog-actions>
                </md-dialog>
            `,
            controller: ['$mdDialog', 'force', function($mdDialog, force) {
                this.closeDialog = () => {
                    $mdDialog.cancel();
                };

                this.refreshToken = () => {
                    return force.refreshTokenWithHTTPRequest();
                }
            }],
            controllerAs: '$ctrl',
            bindToController: true,
            locals: {
                ERROR_CODES: errorCodes,
                error,
            },
            onShowing: () => {
                REDUX.get(this).dispatch(alertJumped());
            }
        };

        DIALOG.get(this).show(alert).catch(() => REDUX.get(this).dispatch(userSeenNotification()));
    }

    $onInit() {
        const vm = this;
        REDUX.get(this).subscribe(() => {
            const {notifier} = REDUX.get(this).getState();

            if(notifier.errorCode === ERROR_CODES.INVALID_SESSION_ID) {
                vm.isRefreshTokenOn = true;
            }

            if(notifier.message && notifier.visible === false) {
                this.showAlert({
                    errorCode: notifier.errorCode,
                    message: notifier.message
                }, ERROR_CODES);
            }
        });
    }

    $onDestroy() {
        this.unsubscribe();
        this.isRefreshTokenOn = false;
    }
}
NotifierController.$inject = ['$ngRedux', '$mdDialog'];

export default {
    name: 'notifier',
    config: {
        controller: NotifierController
    }
};