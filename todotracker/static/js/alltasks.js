(function () {
    'use strict';

    angular.module('todotracker')
        .controller('AllTasksController', ['$scope', '$http', 'Login', AllTasksController]);

    function AllTasksController($scope, $http, Login) {
        
        Login.redirectIfNotLoggedIn();
        $scope.data = [];
        $scope.logout = Login.logout;
        $scope.isLoggedIn = Login.isLoggedIn();
        $scope.sortBy = 'title';
        $scope.reverse = true;
        $scope.showFilters = false;
        $scope.fetchComplete = false;

        $scope.getalltasks = function(){
            $http.get('/todotracker/status/').then(function(response){
                $scope.data = response.data;
            });
            
            var fromDate = $scope.from_date;
            var toDate = $scope.to_date;

            for(eachStatus in $scope.data)
            {
                var tasks = eachStatus.tasks;
                var validtasks = tasks.forEach(element => { 
                    element.start_date >= fromDate && element.start_date <= toDate               
                });
                eachStatus.tasks = validtasks;
            }

            $scope.fetchComplete = true;
        }
            
    }

}());