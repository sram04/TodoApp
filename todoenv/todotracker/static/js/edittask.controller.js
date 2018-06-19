(function () {
    'use strict';

    angular
        .module('todotracker')
        .controller('EditTaskController', ['$scope', '$uibModalInstance',EditTaskController]);

    function EditTaskController($scope, $uibModalInstance) {
        
        $scope.closeEditModal = function(){
            $uibModalInstance.dismiss('cancel');
        }

    }
})();