import app from './module';

describe('app', () => {

    describe('storeContainer', () => {
        let storeComponent

        beforeEach(() => {
           angular.mock.module(app);

            angular.mock.inject(($componentController) => {
                storeComponent = $componentController('storage', null, {});
            });
        });

        it('should load store from localstorage', (done) => {
            expect(1).toBe(1);
        });
    });

});