(function () {
    'use strict';

    angular
        .module('todotracker')
        .controller('LoginController', ['$scope', '$location', 'Login', LoginController]);

    function LoginController($scope, $location, Login) {

        $scope.login = function () {
            $scope.loginFailed = false;
            Login.login($scope.user)
                .then(function () {
                        $location.url('/');
                        
                    },
                    function () {
                        $scope.login_error = "Invalid username/password combination";
                        $scope.loginFailed = true;
                    })
        }

        $scope.registerUser = function(){
            $scope.isRegistered = false;
            $scope.registration_failed = false;
            Login.registerUser($scope.user)
                    .then(function(){
                        $scope.registration_success = "Registration Success!";
                        $scope.isRegistered = true;
                    },
                    function(response){
                        //$scope.registration_error = "Unable to register the user";
                        $scope.registration_error = response.data.message;
                        $scope.registration_failed = true;
                    })
        }

        $scope.loginPage = function(){
            $location.url('/login');
        }

        $scope.signup = function(){
            $location.url('/register');
        }

        $scope.forgotcredentials = function(){
            $location.url('/findUser');
        }

        if (Login.isLoggedIn()) {
            $location.url('/');
        }

    }

})();