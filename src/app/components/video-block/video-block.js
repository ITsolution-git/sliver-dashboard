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
    function videoController($scope, $sce) {
        var vm = this;
        var defaulVideo = 'http://media.w3.org/2016/01/Emmy-Award.mp4';
        $scope.trustUrl = function(url){
            return url ? $sce.trustAsResourceUrl(url) : $sce.trustAsResourceUrl(defaulVideo);
        }

    };

    angular
        .module('app.components')
        .component('videoBlock', videoBlock);
}());
