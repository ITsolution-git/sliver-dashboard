(function () {
    'use strict';

    angular
        .module('app.pages.mindset')
        .controller('YourCommitmentController', YourCommitmentController);

    /* @ngInject */
    function YourCommitmentController($scope,mindsetService,pageService) {

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
            .setPageTitle('Your Commitment To Us');
    }
}());