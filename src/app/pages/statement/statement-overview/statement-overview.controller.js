(function () {
    'use strict';

    angular
        .module('app.pages.statement')
        .controller('StatementOverviewController', StatementOverviewController);

    /* @ngInject */
    function StatementOverviewController($scope, pageService) {

        angular.extend($scope, {
            showVideoBlock: false,
            showStaticTextBlock: false
        });

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('SLAPstatement Overview');

    }
}());