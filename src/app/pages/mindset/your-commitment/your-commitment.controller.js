(function () {
    'use strict';

    angular
        .module('app.pages.mindset')
        .controller('YourCommitmentController', YourCommitmentController);

    /* @ngInject */
    function YourCommitmentController($scope,mindsetService) {
        $scope.sliders = mindsetService.getSliders();
    }
}());