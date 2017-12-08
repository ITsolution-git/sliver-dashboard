(function() {
    'use strict';

    angular
        .module('adminapp',
            [
                'templates',

                'ngAnimate',
                'ngSanitize',
                'AngularPrint',
                
                'ui.router',
                'ui.select',
                'ui.bootstrap',
                'satellizer',
                'toaster',
                'restangular',
                'ngTable',
                'frapontillo.bootstrap-switch',
                'textAngular',

                'adminapp.filters',
                'adminapp.components',
                'adminapp.directives',
                'adminapp.pages'
            ]);
}());