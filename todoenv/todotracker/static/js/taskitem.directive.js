(function(){
    'use strict';

    angular.module("todotracker").directive('todoTask', TodoTaskItemDirective);

    function TodoTaskItemDirective(){
        return{
            templateUrl:'static/html/taskitem.html',
            restrict: 'E',
            controller: ['$scope', '$http', function($scope, $http){
                var url = '/todotracker/taskitems/' + $scope.task.id + '/';

                $scope.isComplete = $scope.task.completed_date;
                $scope.isStarted = $scope.task.start_date;
                $scope.destStatus = $scope.status; 
                $scope.isArchived = false;

                function removeTaskFromStatus(task, status){
                    var tasks = status.tasks;
                    tasks.splice(tasks.indexOf(task), 1);
                };

                function removeTaskFromArchived(task, status){
                    var tasks = status.archived;
                    tasks.splice(tasks.indexOf(task), 1);
                };

                $scope.update = function(){
                   return $http.put(url, 
                                    $scope.task);
                };

                $scope.updateStartDate = function(){
                    var today = new Date();
                    $scope.task.start_date = today
                    $scope.task.status = 2;
                    $http.put(url, $scope.task).then(function(){
                        removeTaskFromStatus($scope.task, $scope.status);
                        assignMovingStatus();
                        $scope.inProgress.tasks.push($scope.task)
                    });
                    $scope.isStarted = true;
                };

                $scope.updateCompletedDate = function(){
                    var today = new Date();
                    $scope.task.completed_date = today
                    $scope.task.status = 3;
                    $http.put(url, $scope.task).then(function(){
                        removeTaskFromStatus($scope.task, $scope.status);
                        assignMovingStatus();
                        $scope.done.tasks.push($scope.task);
                    });
                    $scope.isComplete = true
                };

                $scope.delete = function(){
                    $http.delete(url).then(
                        function(){
                            removeTaskFromStatus($scope.task, $scope.status);
                        }
                    );
                };

                $scope.archive = function(){
                    $scope.task.archived = true;
                    $scope.update().then(function(){
                        removeTaskFromStatus($scope.task, $scope.status);
                        $scope.status.archived.push($scope.task);
                    })
                };

                $scope.restore = function(){
                    $scope.task.archived = false;
                    $scope.update().then(function(){
                        removeTaskFromArchived($scope.task, $scope.status);
                        $scope.status.tasks.push($scope.task);
                    })
                };

                $scope.move = function(){
                    if($scope.destStatus == undefined)
                    {
                        return;        
                    }

                    var fromStatus = $scope.task.status;
                    var toStatus = $scope.destStatus.id;
                    var today = new Date();
                    
                    //update start date when going from 1 -> 2
                    //update completed date when going from 2->3
                    if(fromStatus == 1)
                    {
                        if (toStatus == 2)
                        {
                            $scope.task.start_date = today;
                        }
                    }
                    else if (fromStatus == 2)
                    {
                        if(toStatus == 3)
                        {
                            $scope.task.completed_date = today;
                        }
                    }

                    $scope.task.status = $scope.destStatus.id;
                    $scope.update().then(function(){
                        {
                            removeTaskFromStatus($scope.task, $scope.status);
                            $scope.destStatus.tasks.push($scope.task);
                        }
                    });

                }

                $scope.modelOptions = {
                    debounce: 500
                };

            }]
        };

    }    
})();