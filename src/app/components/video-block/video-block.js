(function () {
    'use strict';

    var videoBlock = {
        templateUrl: 'components/video-block/video-block.html',
        controller: videoController,
        bindings: {
            visible: '=',
            video: '='
            // videoUrl: '='
        }
    };
    function videoController($scope, CONFIG) {
        // $scope.videoUrl = CONFIG.api +'/v1/video/SLAP_20.mp4';
        // $scope.videoUrl = 'http://content.jwplatform.com/videos/UNz3tfmI-CZ1S4g0I.mp4';
        var vm = this;

        // vm.videoUrl = 'http://content.jwplatform.com/videos/UNz3tfmI-CZ1S4g0I.mp4';
        // var defaulVideo = 'http://media.w3.org/2016/01/Emmy-Award.mp4';
        // vm.videoUrl = CONFIG.api + '/v1/video/SLAP_20.mp4';
        // vm.videoUrl = activeStep.videoUrl;
        // $scope.trustUrl = function(url){
        //     return url ? $sce.trustAsResourceUrl(url) : $sce.trustAsResourceUrl(defaulVideo);
        // }

    };

    angular
        .module('app.components')
        .component('videoBlock', videoBlock);
}());
