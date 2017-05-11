(function () {
    'use strict';

    angular
        .module('app.pages.actionPlan')
        .controller('ActionPlanReviewController', ActionPlanReviewController);

    function ActionPlanReviewController($scope, pageService) {

        angular.extend($scope, {
            showVideoBlock: false,
            showStaticTextBlock: false
        });

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Action Plan Review');
    }
}());