(function() {
    'use strict';

    angular
        .module('app.pages.yearGoal')
        .controller('AdjustYourYearGoalController', AdjustYourYearGoalController);

    function AdjustYourYearGoalController($scope, pageService) {

        angular.extend($scope, {
            model: {
                first: 'Dropdown Label'
            },
            showVideoBlock: false,
            showStaticTextBlock: false
        });

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Year Goal');
    }
}());