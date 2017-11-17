(function() {
    'use strict';

    angular
        .module('app.components')
        .controller('ItemDialogController', ItemDialogController);

    /* @ngInject */
    function ItemDialogController($scope, $state) {
        $scope.change = function (revenue){
           $scope.formData.title = $scope.formData.revenue.id;
           $scope.formData.name = $scope.formData.revenue.name;
        }
    }
}());