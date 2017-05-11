(function () {
    'use strict';

    angular
        .module('app.pages.actionPlan')
        .controller('Step4SummaryController', Step4SummaryController);

    function Step4SummaryController($scope, pageService) {

        angular.extend($scope, {
            showVideoBlock: false,
            showStaticTextBlock: false
        });

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Action Plan');
    }
}());