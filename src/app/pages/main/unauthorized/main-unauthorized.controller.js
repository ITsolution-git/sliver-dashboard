(function () {
    'use strict';

    angular
        .module('app.pages.main')
        .controller('MainUnauthorizedController',MainUnauthorizedController);

    /* @ngInject */
    function MainUnauthorizedController(pageService) {

        // --- init ---

        pageService.reset().addCrumb({name:'UnAuthorized',path:'UnAuthorized'});
    }
})();