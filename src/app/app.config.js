(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    /* @ngInject */
    function config($stateProvider, $urlRouterProvider, $authProvider, cfpLoadingBarProvider, CONFIG,$compileProvider, $mdThemingProvider, RestangularProvider) {
        RestangularProvider.setRestangularFields({
            id: "_id"
        });

        $stateProvider
        // app blank layout
            .state('blank', {
                abstract: true,
                controller: 'LayoutBlankController',
                templateUrl: 'layouts/layout-blank.html'
            })

            // app default layout
            .state('default', {
                abstract: true,
                parent: 'blank',
                views: {
                    content: {
                        controller: 'LayoutDefaultController',
                        templateUrl: 'layouts/layout-default.html'
                    }
                }

            })
            .state('one', {
                abstract:true,
                parent:'blank',
                views: {
                    content: {
                        controller: 'LayoutOneController',
                        template: '<div ui-view="content"></div>'
                    }
                }
            })
            .state('withNavbar', {
                abstract:true,
                parent:'blank',
                views: {
                    content: {
                        controller: 'LayoutWithNavbarController',
                        template: '<slap-header></slap-header><div class="slap-container" ui-view="content"></div>'
                    }
                }
            });

        // set default routes when no path specified
        $urlRouterProvider.when('', '/');
        //$urlRouterProvider.when('/', '/main/index');

        // always goto 404 if route not found
        //$urlRouterProvider.otherwise('/');
        $urlRouterProvider.otherwise('/404');

        $compileProvider.debugInfoEnabled(true);  // in production false

        // loading bar config
        cfpLoadingBarProvider.includeSpinner = false;

        // auth config
        $authProvider.httpInterceptor = function () {
            return true;
        };
        // $authProvider.tokenPrefix = '_';
        $authProvider.loginUrl = CONFIG.api + '/v1/auth';
        $authProvider.signupUrl = CONFIG.api + '/v1/auth/signup';
        $authProvider.tokenRoot = 'data';//compensates success response macro
        $authProvider.withCredentials = false;
        $authProvider.baseUrl = CONFIG.api + '/';
        $authProvider.unlinkUrl = CONFIG.api + '/auth/unlink/';
        $authProvider.tokenName = 'token';
        $authProvider.tokenPrefix = 'satellizer';
        $authProvider.tokenHeader = 'Authorization';
        $authProvider.tokenType = 'Bearer';
        $authProvider.storageType = 'localStorage';


        // Extend the red theme with a different color and make the contrast color black instead of white.
        // For example: raised button text will be black instead of white.
        var slapTheme = $mdThemingProvider.extendPalette('light-blue', {
        });

        // Register the new color palette map with the name <code>neonRed</code>
        $mdThemingProvider.definePalette('slapTheme', slapTheme);

        // Use that theme for the primary intentions
        $mdThemingProvider.theme('default')
        .primaryPalette('slapTheme');

    }
})();