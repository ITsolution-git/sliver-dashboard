(function() {
    'use strict';

    angular
        .module('app.pages.actionPlan')
        .controller('ActionPlanQAController', ActionPlanQAController);

    /* @ngInject */
    function ActionPlanQAController($scope, pageService) {

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