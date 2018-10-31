(function () {
    'use strict';

    angular.module('todotracker', ['ngRoute', 'ui.bootstrap'])
        .controller('TodoTrackerController', ['$scope', '$http','$interval','Login','NavigationBar',TodoTrackerController]);

    function TodoTrackerController($scope, $http, $interval, Login, NavigationBar) {  
        
        var ownerId = 0;
        $scope.ownerName = '';
        
        $scope.date = new Date();

        $interval(function(){
            $scope.date = new Date();
        }, 1000);

        $scope.addTask = function(title, event){
            var task = {
                status : 1,
                title : title,
                owner : ownerId,
                created_date : new Date(),
                event : event.id,
            };
            $http.post('/todotracker/taskitems/', task)
                .then(function(response){
                    event.task_list.push(response.data);
                },
                function(){
                    alert('could not create a task!')
                });
                
            $scope.new_task = '';
        };

        $scope.addEvent = function(event){
            var newEvent = {
                name : event.name,
                owner : ownerId,
            };
            $http.post('/todotracker/events/', newEvent)
                .then(function(response){
                    $scope.events.push(response.data);
                },
                function(){
                    alert('could not create an event!')
                });
                
        };

        function removeEvent(event, events){
            events.splice(events.indexOf(event), 1);
        }

        $scope.deleteEvent = function(event){
            var eventurl = '/todotracker/events/' + event.id + '/';
            $http.delete(eventurl).then(
                function(){
                    removeEvent(event, $scope.events);
                }
            );
        }
        
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
        $scope.readRedditSoccer = NavigationBar.readRedditSoccer;

        $scope.fetchComplete = false;

        /*$http.get('/todotracker/status/').then(function(response){
            $scope.data = response.data;
            $scope.getTasksDate = $scope.data;
            $scope.archivedTasks = $scope.data;
        });*/

        $http.get('/todotracker/events/').then(function(response){
            $scope.events = response.data;
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