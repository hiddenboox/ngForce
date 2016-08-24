import objectKeysToCase from "../../util/object-keys-to-case";

const REQUEST = new WeakMap();

class UsersService {
    constructor(RequestService) {
        REQUEST.set(this, RequestService);
        this.objectName = 'user';
    }

    fetchUsers() {
        return REQUEST.get(this).get(`select id, name from user`)
            .then(({ data }) => objectKeysToCase(data.records));
    }

    static factory(requestService) {
        return new UsersService(requestService);
    }
}
UsersService.factory.$inject = ['requestService'];

export default UsersService.factory;