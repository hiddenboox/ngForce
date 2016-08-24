const FOLLOW_SERVICE = new WeakMap();

class FollowButtonService {
    constructor(followService) {
        FOLLOW_SERVICE.set(this, followService);
        this.toggleFollow = ::this.toggleFollow;
    }

    toggleFollow(id) {
        return (dispatch, getState) => {
            return FOLLOW_SERVICE.get(this).followRecord(id);
        }

    }

    static factory(followService) {
        return new FollowButtonService(followService);
    }
}
FollowButtonService.factory.$inject = ['followService'];

export default FollowButtonService.factory;
