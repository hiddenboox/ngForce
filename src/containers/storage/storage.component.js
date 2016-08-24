import createEngine from 'redux-storage-engine-localstorage';
import * as storage from "redux-storage";
import config from "../../config";

const REDUX = new WeakMap();

class StorageController {
    constructor($ngRedux) {
        REDUX.set(this, $ngRedux);
        this.storeLoaded = false;
    }

    $onInit() {
        const engine = createEngine(config.reduxStoreLocalstorageName);
        const load = storage.createLoader(engine);

        load(REDUX.get(this))
            .then(newState => {
                console.log('Loaded state:', newState);
                this.storeLoaded = true;
            })
            .catch(() => console.log('Failed to load previous state'));
    }
}
StorageController.$inject = ['$ngRedux'];

export default {
    name: 'storage',
    config: {
        controller: StorageController,
        transclude: true,
        template: `
            <ng-transclude ng-if="$ctrl.storeLoaded"></ng-transclude>
        `
    }
}