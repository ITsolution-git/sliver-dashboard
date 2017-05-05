(function () {
    'use strict';

    angular
        .module('app.pages.mindset')
        .controller('OurCommitmentController', OurCommitmentController);

    /* @ngInject */
    function OurCommitmentController($scope,pageService) {
        angular.extend($scope, {
            showVideoBlock: false,
            showStaticTextBlock: false
        });

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Our Commitment To You');
    }
}());