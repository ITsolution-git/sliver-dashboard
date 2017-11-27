(function () {
    'use strict';

    var videoBlock = {
        templateUrl: 'components/video-block/video-block.html',
        controller: videoController,
        bindings: {
            visible: '=',
            video: '=',
            dis: '=',
            idvideo: '='
            // videoUrl: '='
        }
    };
    function videoController($scope, CONFIG) {
        var vm = this;
        vm.videoActiv = function () {
          if(vm.video == undefined){
              $('video').attr("poster", "/images/video-message.png");
          }else {
              $('video').attr("poster", "/images/movie-logo.png");
          }

        };
        vm.playVideo = function (index) {
            console.log(index);
            index  = index == undefined ? 0 : index;
            console.log('dd',index);

            if(vm.video !== undefined) {
                console.log(index);
                console.log($('video.main-video'));
                $('video.main-video')[index].play();
                $('.z-in-'+index).hide();
            }else {
                console.log('sd',index);
                $('video.main-video')[index].play();
                $('.z-in').hide();

            }

        }
    };

    angular
        .module('app.components')
        .component('videoBlock', videoBlock);
}());
