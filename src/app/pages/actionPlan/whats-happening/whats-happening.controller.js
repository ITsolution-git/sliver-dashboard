(function () {
    'use strict';

    angular
        .module('app.pages.actionPlan')
        .controller('WhatsHappeningController', WhatsHappeningController);

    function WhatsHappeningController($scope, pageService) {

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