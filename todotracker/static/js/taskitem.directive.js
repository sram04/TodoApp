(function(){
    'use strict';

    angular.module("todotracker").directive('todoTask', TodoTaskItemDirective);

    function TodoTaskItemDirective(){
        return{
            templateUrl:'static/html/taskitem.html',
            restrict: 'E',
            controller: ['$scope', '$http', '$uibModal', function($scope, $http, $uibModal){
                var url = '/todotracker/taskitems/' + $scope.task.id + '/';
                $scope.url = url;

                if($scope.task.start_date){
                    $scope.task.start_date = new Date($scope.task.start_date);
                    //$scope.task.start_date = moment($scope.task.start_date).format("YYYY-MM-DD HH:mm:ss");
                } 
                if($scope.task.created_date){
                    $scope.task.created_date = new Date($scope.task.created_date);
                    //$scope.task.created_date = moment($scope.task.created_date).format("YYYY-MM-DD HH:mm:ss");
                }
                if($scope.task.completed_date){
                    $scope.task.completed_date = new Date($scope.task.completed_date);
                    //$scope.task.completed_date = moment($scope.task.completed_date).format("YYYY-MM-DD HH:mm:ss");
                }
                if($scope.task.due_date){
                    $scope.task.due_date = new Date($scope.task.due_date);
                    //$scope.task.due_date = moment($scope.task.due_date).format("YYYY-MM-DD HH:mm:ss");
                }
                
                $scope.isComplete = $scope.task.completed_date;
                $scope.isStarted = $scope.task.start_date;
                $scope.destStatus = $scope.status; 
                $scope.isArchived = false;

                var opened = false;

                $scope.taskActionsPopover = {
                    templateUrl: '/static/html/taskActions.html',
                  };

                $scope.editTask = function(){

                    if(opened) return;

                    var modalInstance = $uibModal.open({
                        templateUrl: '/static/html/editTaskModal.html',
                        controller : 'EditTaskController',
                        scope : $scope,
                    });

                    opened = true;                    
                    
                    modalInstance.result.then(
                        function (result) {
                            $scope.task = result;
                            opened = false;
                        }, 
                        function () {
                            console.log('edit modal closed');
                            opened = false;
                        });
                }   

                function removeTask(task, taskList){
                    taskList.splice(taskList.indexOf(task), 1);
                };

                $scope.update = function(){
                   return $http.put(url, 
                                    $scope.task);
                }

                $scope.updateStartDate = function(){
                    var today = new Date();
                    $scope.task.start_date = today
                    $scope.task.status = 2;
                    $http.put(url, $scope.task).then(function(){
                    });
                    $scope.isStarted = true;
                };

                $scope.updateCompletedDate = function(){
                    var today = new Date();
                    $scope.task.completed_date = today
                    $scope.task.status = 3;
                    $http.put(url, $scope.task).then(function(){
                    });
                    $scope.isComplete = true
                };

                $scope.delete = function(){
                    $http.delete(url).then(
                        function(){
                            removeTask($scope.task, $scope.event.task_list);
                        }
                    );
                };

                $scope.archive = function(){
                    $scope.task.archived = true;
                    $scope.update().then(function(){
                        removeTask($scope.task, $scope.event.task_list);
                        $scope.event.archived_task_list.push($scope.task);
                    })
                };

                $scope.restore = function(){
                    $scope.task.archived = false;
                    $scope.update().then(function(){
                        removeTask($scope.task, $scope.event.archived_task_list);
                        $scope.event.task_list.push($scope.task);
                    })
                };

                $scope.modelOptions = {
                    debounce: 500
                };

            }]
        };

    }    
})();