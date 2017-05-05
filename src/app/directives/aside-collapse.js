(function() {
    'use strict';

    angular
        .module('app.directives')
        .directive('asideCollapse', asideCollapse);

    function asideCollapse() {
        return {
            restrict: 'A',
            link: function(scope,el,attr) {
                el.on('click', function() {
                    var parent = el.parent();
                    if(!$(parent).find('.in').length) {
                        $('.in').removeClass('in');
                    }
                });
            }
        }
    }
}());