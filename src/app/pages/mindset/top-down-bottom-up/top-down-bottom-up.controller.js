(function() {
    'use strict';

    angular
        .module('app.pages.mindset')
        .controller('TopDownBottomUpController', TopDownBottomUpController);

    function TopDownBottomUpController($scope, pageService) {

        angular.extend($scope, {
            showVideoBlock: false,
            showStaticTextBlock: false
        });

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Top Down, Bottom Up');
    }
}());