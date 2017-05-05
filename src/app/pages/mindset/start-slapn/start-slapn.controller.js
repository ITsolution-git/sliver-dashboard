(function () {
    'use strict';

    angular
        .module('app.pages.mindset')
        .controller('StartSlapnController', StartSlapnController);

    /* @ngInject */
    function StartSlapnController($scope, pageService) {

        angular.extend($scope, {
            showVideoBlock: false,
            showStaticTextBlock: false
        });

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Start SLAPn!');
    }
}());