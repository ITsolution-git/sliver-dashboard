(function () {
    'use strict';

    var slapStaticTextOnce = {
        bindings: {
            visible: '=',
            t: '@'
        },
        templateUrl: 'components/slap-static-text-once/slap-static-text-once.html',
        controller: function() {
        }

    };

    angular
        .module('app.components')
        .component('slapStaticTextOnce', slapStaticTextOnce);
}());
