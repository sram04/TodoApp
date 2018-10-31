(function () {
    'use strict';

    angular.module('todotracker')
        .config(['$routeProvider', config])
        .run(['$http', run]);   

    function config($routeProvider){

        $routeProvider
            .when('/', {
                templateUrl : '/static/html/events.html',
                controller : 'TodoTrackerController',
            })
            .when('/login', {
                templateUrl : '/static/html/login.html',
                controller : 'LoginController',
            })
            .when('/register', {
                templateUrl : '/static/html/registration.html',
                controller : 'LoginController',
            })
            .when('/alltasks', {
                templateUrl : '/static/html/alltasks.html',
                controller : 'TodoTrackerController',
            })
            .when('/archived', {
                templateUrl : '/static/html/archived.html',
                controller : 'TodoTrackerController',
            })
            .when('/findUser', {
                templateUrl : '/static/html/forgotcredentials.html',
                controller : 'UsersController',
            })
            .when('/userdetails', {
                templateUrl : '/static/html/userdetails.html',
                controller : 'UsersController',
            })
            .when('/rsoccer', {
                templateUrl : '/static/html/soccernews.html',
                controller : 'RedditController',
            })
            .otherwise('/');
    }

    function run($http){
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';
    }

})();