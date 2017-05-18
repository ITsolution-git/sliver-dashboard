(function () {
    'use strict';

    angular
        .module('app.pages.actionPlan')
        .controller('ChooseYourConnectingStrategiesController', ChooseYourConnectingStrategiesController);

    function ChooseYourConnectingStrategiesController($scope, pageService) {

        angular.extend($scope, {
            model: {
                first: 'Dropdown Label'
            },
            showVideoBlock: false,
            showStaticTextBlock: false,
            showContent: false
        });

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Action Plan');
    }
}());