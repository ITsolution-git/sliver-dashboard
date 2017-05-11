(function () {
    'use strict';

    angular
        .module('app.pages.execute')
        .controller('LivingDayToDayController', LivingDayToDayController);

        function LivingDayToDayController($scope, pageService) {

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