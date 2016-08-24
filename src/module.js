import materialDesign from "angular-material";
import uiState from 'angular-ui-router';
import animate from "angular-animate";
import * as force from "./force";
import aria from "angular-aria";
import ngRedux from "ng-redux";
import angular from "angular";

import configureStore from './store/configure-store';
import containers from "./containers";
import components from "./components";
import * as startup from "./startup";
import services from "./services";

export default angular.module('app', [
    materialDesign,
    containers,
    components,
    services,
    ngRedux,
    animate,
    uiState,
    aria,
])
    .config(configureStore)
    .config(['$locationProvider', $locationProvider => {
        // $locationProvider.html5Mode(true);
    }])
    .config(['$urlRouterProvider', $urlRouterProvider => {
        $urlRouterProvider.otherwise('home');
    }])
    .run(startup.configureForceConnection())
    .factory('force', () => force)
    .name;