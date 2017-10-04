(function () {
    'use strict';

    var slapHeaderWithoutLinks = {
        binding: {},
        controller: function () {
            var vm = this;
        },
        templateUrl: 'components/slap-header-without-links/slap-header-without-links.html'
    };

    angular
        .module('app.components')
        .component('slapHeaderWithoutLinks', slapHeaderWithoutLinks);
}());