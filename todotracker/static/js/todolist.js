(function () {
    'use strict';

    angular.module('todotracker', ['ngRoute', 'ui.bootstrap'])
        .controller('TodoTrackerController', ['$scope', '$http','Login', 'NavigationBar',TodoTrackerController]);

    function TodoTrackerController($scope, $http, Login, NavigationBar) {  
        
        var ownerId = 0;
        $scope.ownerName = '';

        $scope.add = function(status, title){
            var task = {
                status : status.id,
                title : title,
                owner : ownerId,
                created_date : new Date(),
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

        $scope.home = NavigationBar.home;
        $scope.alltasks = NavigationBar.allTasks;
        $scope.archived = NavigationBar.archived;
        $scope.userDetails = NavigationBar.userDetails;

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