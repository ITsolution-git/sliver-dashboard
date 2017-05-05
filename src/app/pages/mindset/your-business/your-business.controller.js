(function() {
    'use strict';

    angular
        .module('app.pages.mindset')
        .controller('YourBusinessController', YourBusinessController);

    function YourBusinessController($scope, pageService) {

        angular.extend($scope, {
            showVideoBlock: false,
            showStaticTextBlock: false
        });

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Your Business With/Without a SLAP');
    }
}());