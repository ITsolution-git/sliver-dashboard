(function() {
    'use strict';

    angular
        .module('app.pages.idealClient')
        .controller('IdealClientOverviewController', IdealClientOverviewController);

    /* @ngInject */
    function IdealClientOverviewController($scope, pageService) {

        angular.extend($scope, {
            showVideoBlock: false,
            showStaticTextBlock: false
        });

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('SLAPstatement Q&A');
    }
}());