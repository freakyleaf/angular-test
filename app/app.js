'use strict';

// Declare app level module which depends on views, and core components
angular

.module('weatherApp', ['weatherApp.search'])

.config(['$locationProvider', function ($locationProvider) {

    $locationProvider
        .hashPrefix('!')
        .html5Mode(true);

}]);
