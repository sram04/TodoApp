(function () {
    'use strict';

    angular
        .module('todotracker')
        .service('NavigationBar', ['$http', '$location', 'Login', NavigationBar]);

    function NavigationBar($http, $location, Login) {
        this.home = home;
        this.allTasks = allTasks;
        this.archived = archived;
        this.userDetails = userDetails;
        this.logout = logout;

        function home (){
            $location.url('/');
        }

        function allTasks(){
            $location.url('/alltasks')
        }

        function archived(){
            $location.url('/archived')
        }

        function userDetails(){
            $location.url('/userdetails');
        }

        function logout(){
            Login.logout;
        }
    }
})();