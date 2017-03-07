(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('resize', resize);

    function resize($window) {
        return {
            link: link,
            restrict: 'AE'
        };

        function link(scope, el, atts) {
            scope.onResize = function () {
                el.css('min-height', $window.innerHeight);
            };

            scope.onResize();

            angular.element($window).bind('resize', function () {
                scope.onResize();
            })
        }
    }
})();