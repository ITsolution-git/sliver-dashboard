(function () {
    'use strict';

    angular
        .module('app.pages.mindset')
        .controller('SlapMindsetController', SlapMindsetController);

    /* @ngInject */
    function SlapMindsetController($scope,pageService) {
        angular.extend($scope, {
            showVideoBlock: false,
            showStaticTextBlock: false
        });

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Get the SLAPmindset ');
    }
}());