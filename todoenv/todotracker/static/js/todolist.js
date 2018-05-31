(function () {
    'use strict';

    angular.module('todotracker', ['ngRoute'])
        .controller('TodoTrackerController', ['$scope', '$http', '$location', 'Login', TodoTrackerController]);

    function TodoTrackerController($scope, $http, $location, Login) {
        $scope.add = function(status, title, due){
            var task = {
                status : status.id,
                title : title,
                due_date : due,
            };
            $http.post('/todotracker/taskitems/', task)
                .then(function(response){
                    status.tasks.push(response.data);
                },
                function(){
                    alert('could not create a task!')
                });
                
            $scope.new_task = '';
        };
        
        Login.redirectIfNotLoggedIn();
        $scope.data = [];
        $scope.logout = Login.logout;
        $scope.isLoggedIn = Login.isLoggedIn();
        $scope.sortBy = 'title';
        $scope.reverse = true;
        $scope.showFilters = false;

        $scope.home = function(){
            $location.url('/');
        }

        $scope.alltasks = function(){
            $location.url('/alltasks');
        }

        $scope.fetchComplete = false;

        $http.get('/todotracker/status/').then(function(response){
            $scope.data = response.data;
        });

        $scope.getTasksDate = $scope.data
        
        $scope.getalltasks = function(fromDate, toDate){
            /*$http.get('/todotracker/status/').then(function(response){
                $scope.filtereddata = response.data;
            });*/
            var testData = []
            for (var sts in $scope.data)
            {
                var validTasks = [];
                var currentStatus = $scope.data[sts];
                var tasks = currentStatus.tasks;
                for(var tsk in tasks){
                    var createdDate = new Date(tasks[tsk].created_date);
                    if(createdDate >= new Date(fromDate)  && createdDate <= new Date(toDate))
                    {
                        validTasks.push(tasks[tsk]);
                    }
                }
                if(validTasks.length > 0){
                    testData.push({
                        'id' : currentStatus.id,
                        'stname' : currentStatus.stname,
                        'tasks' : validTasks
                    })
                }

            }

            $scope.getTasksDate = testData;
            /*for(var eachStatus in $scope.getTasksDate)
            {
                var tasks = eachStatus.tasks;
                var validtasks = tasks.forEach(element => { 
                    element.created_date >= fromDate && element.created_date <= toDate               
                });
                eachStatus.tasks = validtasks;
            }*/

            $scope.fetchComplete = true;
        };
    }

}());