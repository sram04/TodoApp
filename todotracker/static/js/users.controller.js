(function () {
    'use strict';

    angular
        .module('todotracker')
        .controller('UsersController', ['$scope', '$http', '$location','$interval','Login', 'NavigationBar', UsersController]);

    function UsersController($scope, $http, $location, $interval,Login, NavigationBar) {

        $scope.passChangeError = '';

        $scope.home = NavigationBar.home;
        $scope.alltasks = NavigationBar.allTasks;
        $scope.archived = NavigationBar.archived;
        $scope.userDetails = NavigationBar.userDetails;
        $scope.logout = Login.logout;
        $scope.isLoggedIn = Login.isLoggedIn();
        $scope.readRedditSoccer = NavigationBar.readRedditSoccer;

        $scope.date = new Date();

        $interval(function(){
            $scope.date = new Date();
        }, 1000);

        $scope.findUser = function(){
            $scope.userNotFound = false;
            $scope.userFound = false;
            console.log($scope.emailaddress);           
            $http.get('/auth_api/findUser/', {params: {"emailaddress": $scope.find.emailaddress}})
                    .then(function(response){
                        $scope.username = response.data.username;
                        $scope.userFound = true;
                    },
                    function(response){
                        $scope.findUserError = response.data.message;
                        $scope.userNotFound = true;
                    })
        }

        if($scope.isLoggedIn){
            var currUser = localStorage.currentUser;
            $scope.currentUserName = JSON.parse(currUser).username;
            $scope.ownerName = $scope.currentUserName;
            console.log($scope.ownerName);
        }

        $scope.loginPage = function(){
            $location.url('/login')
        }

        $scope.changeUserPassword = function(){
            $scope.passwordChanged = false;
            $http.post('/auth_api/changePassword/', $scope.user)
                .then(function(response){
                    $scope.passwordChanged = true;
                    $scope.passwordChangeSuccess = 'Your password change has been successfull. Please login to access your account!'
                    $scope.passChangeError = '';
                },
                function(response){
                    $scope.passChangeError = response.data.message;
                })
        }

        $scope.closeChangePassword = function(){
            $scope.changePassword = false;
            $scope.passwordChanged = false;
            $scope.passChangeError = '';
            $scope.user.newPassword = '';
            $scope.user.currPassword = '';
        }
        
        $scope.logoutFromChangePass = Login.logout;
    }

})();