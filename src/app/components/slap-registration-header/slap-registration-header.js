(function () {
    'use strict';

    var slapRegistrationHeader = {
        binding: {},
        controller: function () {
            var vm = this;
        },
        templateUrl: 'components/slap-registration-header/slap-registration-header.html'
    };
 
    angular
        .module('app.components')
        .component('slapRegistrationHeader', slapRegistrationHeader);
}());