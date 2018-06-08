(function () {
    'use strict';

    angular.module('todotracker', ['ngRoute'])
        .controller('TodoTrackerController', ['$scope', '$http', '$location', 'Login', TodoTrackerController]);

    function TodoTrackerController($scope, $http, $location, Login) {  
        
        var ownerId = 0;
        $scope.ownerName = "";

        $scope.add = function(status, title, due){
            var task = {
                status : status.id,
                title : title,
                due_date : new Date(due),
                owner : ownerId,
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
        
        //var userId = Login.loggedinUserId;
        Login.redirectIfNotLoggedIn();
        $scope.data = [];
        $scope.getTasksDate = [];
        $scope.archivedTasks = [];
        $scope.logout = Login.logout;
        $scope.isLoggedIn = Login.isLoggedIn();

        if($scope.isLoggedIn){
            var currUser = localStorage.currentUser;
            console.log(currUser);
            ownerId = JSON.parse(currUser).id;
            console.log(ownerId);
            $scope.ownerName = JSON.parse(currUser).username;
            console.log($scope.ownerName);
        }

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
            $scope.getTasksDate = $scope.data;
            $scope.archivedTasks = $scope.data;
        });

        
        
        $scope.getalltasks = function(fromDate, toDate){
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
            $scope.fetchComplete = true;
        };

        $scope.archived = function(){
            $location.url('/archived');
        }

        $scope.resetArchived = function (){
            $scope.archivedTasks = $scope.data;
            $scope.archive_error = "";
        }

        $scope.getarchivedtasks = function(fromDate, toDate){

            if(fromDate && toDate){
                var testData = []
                for (var sts in $scope.data)
                {
                    var validTasks = [];
                    var currentStatus = $scope.data[sts];
                    var tasks = currentStatus.archived;
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
                            'archived' : validTasks
                        })
                    }

                }

                $scope.archivedTasks = testData;
                $scope.archive_error = "";
            }
            else{
                $scope.archive_error = "Filtering Failed. Showing all tasks. Please make sure to fill From Date & To Date fields!"
                $scope.archivedTasks = $scope.data
            }
        }
    }

}());