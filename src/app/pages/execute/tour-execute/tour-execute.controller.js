(function () {
    'use strict';

    angular
        .module('app.pages.execute')
        .controller('TourExecuteController', TourExecuteController);

    /* @ngInject */
    function TourExecuteController($scope, pageService) {
        angular.extend($scope, {
            showVideoBlock: false,
            showStaticTextBlock: false
        });

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Tour of Execute');
    }
}());