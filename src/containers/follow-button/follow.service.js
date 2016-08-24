const REQUEST = new WeakMap();

class FollowService {
    constructor(requestService) {
        REQUEST.set(this, requestService);
    }

    followRecord(id) {
        const self = this;
        return REQUEST.get(this).post(function() {
           const url = this.chatterPath('following');

            return {
                method: 'POST',
                url,
                // headers: {
                //     'Content-Type': 'application/x-www-form-urlencoded',
                // },
                data: {
                    subjectId: id
                }
            };
        });
    }

    static factory(requestService) {
        return new FollowService(requestService);
    }
}
FollowService.factory.$inject = ['requestService'];

export default FollowService.factory;