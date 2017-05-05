(function () {
    'use strict';

    angular
        .module('app.pages.mindset')
        .controller('CashFlowController', CashFlowController);

    /* @ngInject */
    function CashFlowController($scope, pageService) {

        angular.extend($scope, {
            showVideoBlock: false,
            showStaticTextBlock: false
        });

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Cashflow Capacity Catch 22');
    }
}());