(function () {
    'use strict';

    angular
        .module(
            'app',
            [
                'adminapp',
                'templates',

                'ngRoute',
                'ngAnimate',
                'ngSanitize',
                'ngMaterial',
                'ngAria',
                'ngMessages',

                'ngTable',

                'angular-loading-bar',
                'restangular',
                'satellizer',
                'toaster',
                'ui.router',
                'ui.bootstrap',
                'ui.mask',
                'frapontillo.bootstrap-switch',
                'ui.select',
                'mgcrea.ngStrap',
                'ngCsv',
                'daterangepicker',
                'rzModule',
                'angular-svg-round-progressbar',
                'angular.filter',
                'dataGrid', 
                'pagination',


                'app.services',
                'app.filters',
                'app.components',
                'app.directives',
                'app.pages'
            ]
        )
})();