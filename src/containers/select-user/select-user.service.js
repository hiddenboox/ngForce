import { normalize } from "normalizr";

import Schemas from "../../store/schemas";
import { receiveUsers, fetchUsers } from "./actions";

const USERS_SERVICE = new WeakMap();

class SelectUserService {
    constructor(usersService) {
        USERS_SERVICE.set(this, usersService);
        this.fetchUsers = ::this.fetchUsers;
    }

    fetchUsers() {
        return dispatch => {
            dispatch(fetchUsers());
            return USERS_SERVICE.get(this).fetchUsers()
                .then(json => {
                    return {
                        ...normalize(json, Schemas.USER_ARRAY)
                    };
                })
                .then(users => dispatch(receiveUsers(users)));
        }
    }

    static factory(usersService) {
        return new SelectUserService(usersService);
    }
}
SelectUserService.factory.$inject = ['usersService'];

export default SelectUserService.factory;