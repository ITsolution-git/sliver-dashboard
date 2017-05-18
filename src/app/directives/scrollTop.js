(function() {
    'use strict';

    angular
        .module('app.directives')
        .directive('scrollTop', scrollTop);

    function scrollTop() {
        return {
            restrict: 'A',
            link: function(scope,el,attr) {
                var body = $("body, html");
                body.animate({scrollTop: 0}, 400);
            }
        }
    }
}());