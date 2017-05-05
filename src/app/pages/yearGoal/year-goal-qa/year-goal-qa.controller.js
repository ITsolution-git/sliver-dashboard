(function () {
    'use strict';

    angular
        .module('app.pages.yearGoal')
        .controller('YearGoalQAController', YearGoalQAController);

    /* @ngInject */
    function YearGoalQAController($scope, pageService) {

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