(function () {
    'use strict';

    var videoBlockTools = {
        templateUrl: 'components/video-block-tools/video-block-tools.html',
        controller: videoToolsController,
        scope: {},
        bindings: {
            video: '=',
            idvideo: '='
        }
    };


    function videoToolsController($scope, CONFIG) {
        var vm = this;


    };

    angular
        .module('app.components')
        .component('videoBlockTools', videoBlockTools);
}());
