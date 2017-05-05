(function () {
    'use strict';

    var slapStaticText = {
        bindings: {
            visible: '='
        },
        templateUrl: 'components/slap-static-text/slap-static-text.html',
        controller: function() {
        }

    };

    angular
        .module('app.components')
        .component('slapStaticText', slapStaticText);
}());

