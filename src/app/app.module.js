(function () {
    'use strict';

    angular
        .module(
            'app',
            [
                'templates',

                'ngRoute',
                'ngAnimate',
                'ngSanitize',

                'angular-loading-bar',
                'restangular',
                'satellizer',
                'toaster',
                'ui.router',
                'frapontillo.bootstrap-switch',
                'mgcrea.ngStrap',
                'ngTable',
                'ngCsv',
                'daterangepicker',

                'app.services',
                'app.filters',
                'app.directives',
                'app.pages'
            ]
        )
})();