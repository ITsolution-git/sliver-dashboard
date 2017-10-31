(function() {
    'use strict';

    angular
        .module('app.directives')
        .directive('animatePlans', animatePlans);

    function animatePlans($timeout, $document) {
        return {
            restrict: 'A',
            link: function(scope,el,attr) {
                scope.$on('togglePlans', function() {

                    if(el.hasClass('flipInY')) {
                        el.removeClass('flipInY');
                    }

                    $timeout(function () {
                        el.addClass('flipInY');
                    });

                });


            }
        }
    }
}());