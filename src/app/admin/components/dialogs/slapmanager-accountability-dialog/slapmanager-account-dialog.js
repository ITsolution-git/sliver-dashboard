(function () {
    'use strict';

    angular
        .module('adminapp.components')
        .controller('SlapManagerAccountDialogController', SlapManagerAccountDialogController);

    /* @ngInject */
    function SlapManagerAccountDialogController($scope, $state) {
        $scope.formData.journey = {name: 'Accountability Call', section: 'q1'}
    }
}());