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
                            //$scope.result = result;
                            $scope.task = result;
                            opened = false;
                        }, 
                        function () {
                            console.log('edit modal closed');
                            opened = false;
                        });
                }   


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
                }

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

                $scope.modelOptions = {
                    debounce: 500
                };

            }]
        };

    }    
})();