(function() {
    'use strict';

    angular
        .module('app.directives')
        .directive('toggleClass', toggleClass);

    function toggleClass($timeout, $document, $rootScope) {
        return {
            restrict: 'A',
            link: function(scope,el,attr) {

                el.on('click', function (event) {
                   el.toggleClass(attr.toggleClass);

                    var hItem =  el[0].clientHeight + 'px';
                    scope.htItem = hItem;

                    attr.heightItem = hItem;

                });

                var agenda = attr.webinarAgenda;

                if(agenda === ''){
                    scope.agenda = 'No description for this webinar';
                }else {
                    scope.agenda = agenda;
                }
            }
        }
    }
}());