(function () {
    'use strict';

    angular
        .module('todotracker')
        .service('Login', ['$http', '$location', Login]);

    function Login($http, $location) {
        this.login = login;
        this.isLoggedIn = isLoggedIn;
        this.logout = logout;
        this.redirectIfNotLoggedIn = redirectIfNotLoggedIn;
        this.registerUser = registerUser;
        this.loggedinUserId = loggedinUserId;

        function login(credentials) {
            return $http.post('/auth_api/login/', credentials)
                .then(function (response) {
                    localStorage.currentUser = JSON.stringify(response.data);
                });
        }

        function registerUser(userdata){
            return $http.post('/auth_api/register/', userdata)
                        .then(function(response){

                        })
        }

        function isLoggedIn () {
            return !!localStorage.currentUser;
        }

        function loggedinUserId(){
            return JSON.parse(localStorage.currentUser).id;         
        }


        function logout () {
            delete localStorage.currentUser;
            $http.get('/auth_api/logout/').then(function(){
                    $location.url('/login');
                });
        }

        function redirectIfNotLoggedIn () {
            if (!isLoggedIn()) {
                $location.url('/login');
            }
        }
    }
})();