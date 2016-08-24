import angular from "angular";

import home from './home.component';

export default angular.module('app.containers.home', [])
    .component(home.name, home.config)
    .config(['$stateProvider', $stateProvider => {
        $stateProvider.state({
            name: 'home',
            url: '',
            component: 'home',
        });
    }])
    .name;