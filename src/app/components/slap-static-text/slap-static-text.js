(function () {
    'use strict';

    var slapStaticText = {
        bindings: {
            visible: '=',
            t1: '@',
            t2: '@',
            t3: '@',
            t4: '@',
        },
        templateUrl: 'components/slap-static-text/slap-static-text.html',
        controller: function() {
        }

    };

    angular
        .module('app.components')
        .component('slapStaticText', slapStaticText);
}());

