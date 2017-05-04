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
                'ngMaterial',
                'ngAria',

                'angular-loading-bar',
                'restangular',
                'satellizer',
                'toaster',
                'ui.router',
                'ui.bootstrap',
                'ui.mask',
                'frapontillo.bootstrap-switch',
                'mgcrea.ngStrap',
                'ngTable',
                'ngCsv',
                'daterangepicker',
                'rzModule',

                'app.services',
                'app.filters',
                'app.components',
                'app.directives',
                'app.pages'
            ]
        )
})();