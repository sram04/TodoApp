(function () {
    'use strict';

    angular.module('todotracker')
        .config(['$routeProvider', config])
        .run(['$http', run]);   

    function config($routeProvider){

        $routeProvider
            .when('/', {
                templateUrl : '/static/html/status.html',
                controller : 'TodoTrackerController',
            })
            .when('/login', {
                templateUrl : '/static/html/login.html',
                controller : 'LoginController',
            })
            .when('/alltasks', {
                templateUrl : '/static/html/alltasks.html',
                controller : 'TodoTrackerController',
            })
            .otherwise('/');
    }

    function run($http){
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';
    }

})();