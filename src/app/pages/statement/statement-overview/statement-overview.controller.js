(function() {
    'use strict';

    angular
        .module('app.pages.statement')
        .controller('StatementOverviewController', StatementOverviewController);

    /* @ngInject */
    function StatementOverviewController() {
        console.log('StatementOverviewController');
    }
}());