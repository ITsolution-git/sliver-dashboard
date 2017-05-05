(function() {
    'use strict';

    angular
        .module('app.pages.idealClient')
        .controller('IdealClientOverviewController', IdealClientOverviewController);

    /* @ngInject */
    function IdealClientOverviewController() {
        console.log('IdealClientOverviewController');
    }
}());