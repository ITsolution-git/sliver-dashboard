(function () {
    'use strict';

    angular
        .module('app.pages.execute')
        .controller('SetYourselfUpForSuccessController', SetYourselfUpForSuccessController);

    function SetYourselfUpForSuccessController($scope, pageService) {

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