(function () {
    'use strict';

    var slapRegistrationFooter = {
        bindings: {
            send: '&',
            forward: '='
        },
        templateUrl: 'components/slap-registrationFooter/slap-registrationFooter.html'
    };

    angular
        .module('app.components')
        .component('slapRegistrationFooter', slapRegistrationFooter);
}());