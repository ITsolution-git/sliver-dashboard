(function() {
    'use strict';

    angular
        .module('app.pages.slapWorld')
        .controller('SlapWorldController', SlapWorldController);

    /* @ngInject */
    function SlapWorldController($scope, $state, pageService) {
        pageService
        .setPageTitle('SLAPworld');

    }
}());