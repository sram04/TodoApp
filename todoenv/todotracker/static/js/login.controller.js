(function () {
    'use strict';

    angular
        .module('todotracker')
        .controller('LoginController', ['$scope', '$location', 'Login', LoginController]);

    function LoginController($scope, $location, Login) {
        $scope.login = function () {
            Login.login($scope.user)
                .then(function () {
                        $location.url('/');
                    },
                    function () {
                        $scope.login_error = "Invalid username/password combination";
                    })
        }

        $scope.registerUser = function(){
            Login.registerUser($scope.user)
                    .then(function(){
                        $scope.registration_success = "Registration Success!";
                        $scope.isRegistered = true;
                    },
                    function(){
                        $scope.registration_error = "Unable to register the user";
                    })
        }

        $scope.signup = function(){
            $location.url('/register');
        }

        if (Login.isLoggedIn()) {
            $location.url('/');
        }

    }

})();