(function () {
    'use strict';

    var videoBlock = {
        templateUrl: 'components/video-block/video-block.html',
        controller: videoController,
        bindings: {
            visible: '=',
            video: '='
        }
    };
    function videoController($scope, $sce, CONFIG) {
        $scope.videoUrl = CONFIG.api +'/v1/video/SLAP_20.mp4';
        var vm = this;
        var defaulVideo = 'http://media.w3.org/2016/01/Emmy-Award.mp4';
        vm.videoUrl = CONFIG.api + '/v1/video/SLAP_20.mp4';
        $scope.trustUrl = function(url){
            return url ? $sce.trustAsResourceUrl(url) : $sce.trustAsResourceUrl(defaulVideo);
        }

    };

    angular
        .module('app.components')
        .component('videoBlock', videoBlock);
}());
