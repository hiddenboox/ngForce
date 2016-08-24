import angular from 'angular';

import app from './module';

angular.element(document).ready(function() {
    angular.bootstrap(document.body, [app]);
});