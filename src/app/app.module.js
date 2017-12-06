(function () {
    'use strict';

    angular
        .module(
            'app',
            [
                //SLAP modules
                'adminapp',
                'slapperm',
                //Templates
                'templates',
                //3th party
                'ngRoute',
                'ngAnimate',
                'ngSanitize',
                'ngMaterial',
                'ngAria',
                'ngMessages',
                'AngularPrint',

                'ngTable',
                
                'angular-loading-bar',
                'restangular',
                'satellizer',
                'toaster',
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
                'ui.router',
                //Sub modules
                'app.services',
                'app.filters',
                'app.components',
                'app.directives',
                'app.pages',
                'ngFileUpload'
            ]
        )
})();