(function () {
    'use strict';

    var slapMainFooter = {
        bindings: {
            send: '&',
            forward: '='
        },
        templateUrl: 'components/slap-mainFooter/slap-mainFooter.html'
    };

    angular
        .module('app.components')
        .component('slapMainFooter', slapMainFooter);
}());