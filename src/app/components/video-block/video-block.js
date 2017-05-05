(function () {
    'use strict';

    var videoBlock = {
        bindings: {
            visible: '=',
            videoSrc: '='
        },
        templateUrl: 'components/video-block/video-block.html',
        controller: function() {
        }

    };

    angular
        .module('app.components')
        .component('videoBlock', videoBlock);
}());
