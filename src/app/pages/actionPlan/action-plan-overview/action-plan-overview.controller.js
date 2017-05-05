(function() {
    'use strict';

    angular
        .module('app.pages.actionPlan')
        .controller('ActionPlanOverviewController', ActionPlanOverviewController);

    /* @ngInject */
    function ActionPlanOverviewController($scope, pageService) {

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