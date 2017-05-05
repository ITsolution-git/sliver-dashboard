(function () {
    'use strict';

    angular
        .module('app.pages.mindset')
        .controller('AreYourStuckController', AreYourStuckController);

    /* @ngInject */
    function AreYourStuckController($scope,mindsetService) {

        angular.extend($scope, {
            showInfoBlock: false,
            showVideoBlock: false,
            showStaticTextBlock: false,
            sliders: mindsetService.getSliders()
        });

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Are You Stuck?');
    }
}());