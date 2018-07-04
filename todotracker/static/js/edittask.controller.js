(function () {
    'use strict';

    angular
        .module('todotracker')
        .controller('EditTaskController', ['$scope','$http', '$uibModalInstance',EditTaskController]);

    function EditTaskController($scope, $http, $uibModalInstance) {

        
        var currentTaskStatusName = $scope.event.status_list.filter(
                                    function(element){ 
                                        return element.id == $scope.task.status; 
                                    })

        $scope.currentStatus = currentTaskStatusName[0];

        $scope.closeEditModal = function(){
            $uibModalInstance.dismiss('cancel');
        }

        function saveTaskDetails(){
            $scope.updateTaskItem().then(function(){
                $uibModalInstance.close($scope.task);
            },
            function(){
                $scope.save_error = 'unable to save task details';
            })

        }

         $scope.updateTaskItem = function(){
             return $http.put($scope.url, $scope.task);
         }

        /*
            Status Ids are hardcoded currently.
            need to find a way to move from status to status
        */
        $scope.updateTaskItemGeneric = function(){
            if($scope.destStatus == undefined)
            {
                saveTaskDetails();
                return;        
            }

            if($scope.destStatus.id == $scope.task.status){
                saveTaskDetails()
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
            $scope.updateTaskItem().then(function(){
                    $uibModalInstance.close($scope.task);
                },
                function(){
                    $scope.save_error = 'unable to save task details';
                });
        }
    }
})();