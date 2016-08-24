import { combineReducers } from 'redux';
import storageDebounce from 'redux-storage-decorator-debounce';
import storageFilter from 'redux-storage-decorator-filter';
import createStorageEngine from 'redux-storage-engine-localstorage';
import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import createLoggerMiddleware from 'redux-logger';
import * as storage from 'redux-storage';
import user from "../containers/authorize/reducer";
import contacts from "../containers/contacts/reducer";
import notifier from "../containers/notifier/reducer";
import tasks from "../containers/tasks-page/reducer";
import users from "../containers/select-user/reducer";
import config from '../config';
import { LOGOUT_USER } from "../containers/authorize/constants";

let appReducer = combineReducers({
    contacts,
    notifier,
    users,
    tasks,
    user,
});
appReducer = storage.reducer(appReducer);

const rootReducer = (state, action) => appReducer(action.type === LOGOUT_USER ? {
    ...appReducer({}, {})
} : state, action);

let storageEngine = createStorageEngine(config.reduxStoreLocalstorageName);
const createStorageMiddleware = storageEngine => {
  let decoratedEngine = storageFilter(storageEngine, [], [
      ['contacts'],
      ['notifier'],
      ['loader'],
      ['tasks', 'items'],
  ]);
  decoratedEngine = storageDebounce(decoratedEngine, config.reduxStoreDebounceTime);
  return storage.createMiddleware(decoratedEngine);
};
const localstorageMiddleware = createStorageMiddleware(storageEngine);

export default ['$ngReduxProvider', $ngReduxProvider => {
    $ngReduxProvider.createStoreWith(rootReducer, [
        thunkMiddleware,
        promiseMiddleware,
        createLoggerMiddleware(),
        localstorageMiddleware,
    ]);
}];