(function () {
    'use strict';

    angular
        .module('adminapp')
        .controller('AdminLayoutDefaultController', AdminLayoutDefaultController);

    // LayoutDefaultController.$inject = ['$state'];

    /* @ngInject */
    function AdminLayoutDefaultController($scope, BCService) {
        $scope.bc = BCService;
    }
}());