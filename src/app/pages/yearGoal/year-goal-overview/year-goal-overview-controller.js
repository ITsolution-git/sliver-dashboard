(function () {
    'use strict';

    angular
        .module('app.pages.yearGoal')
        .controller('YearGoalOverviewController', YearGoalOverviewController);

    /* @ngInject */
    function YearGoalOverviewController($scope, pageService) {

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