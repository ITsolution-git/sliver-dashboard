(function () {
    'use strict';

    var videoBlock = {
        bindings: {
            visible: '=',
            videoSrc: '='
        },
        templateUrl: 'components/video-block/video-block.html',
        controller: function($scope, $state, stepService) {

            $scope.title = stepService.getActiveStep().name;
            // console.log(stepService.getActiveStep());

        }

    };

    angular
        .module('app.components')
        .component('videoBlock', videoBlock);
}());
