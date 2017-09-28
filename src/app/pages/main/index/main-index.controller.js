(function () {
    'use strict';

    angular
        .module('app.pages.main')
        .controller('MainIndexController', MainIndexController);

    /* @ngInject */
    function MainIndexController($scope, pageService, activeStep) {

        // --- vars ---

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Dashboard');
    }
})();