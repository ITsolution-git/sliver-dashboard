(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    /* @ngInject */
    function config($stateProvider, $urlRouterProvider, $authProvider, cfpLoadingBarProvider, CONFIG) {

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

            });

        // set default routes when no path specified
        $urlRouterProvider.when('', '/');
        //$urlRouterProvider.when('/', '/main/index');

        // always goto 404 if route not found
        //$urlRouterProvider.otherwise('/');
        $urlRouterProvider.otherwise('/404');

        // loading bar config
        cfpLoadingBarProvider.includeSpinner = false;

        // auth config
        $authProvider.httpInterceptor = function () {
            return true;
        };
        //$authProvider.tokenPrefix = '_';
        $authProvider.loginUrl = CONFIG.api + '/v1/auth';
        $authProvider.signupUrl = CONFIG.api + '/v1/auth/signup';
        $authProvider.tokenRoot = 'data';//compensates success response macro
        $authProvider.withCredentials = false;
        $authProvider.baseUrl = CONFIG.api + '/';
        $authProvider.unlinkUrl = CONFIG.api + '/auth/unlink/';
        // $authProvider.tokenName = 'token';
        // $authProvider.tokenPrefix = 'satellizer';
        // $authProvider.tokenHeader = 'Authorization';
        // $authProvider.tokenType = 'Bearer';
        $authProvider.storageType = 'localStorage';

    }
})();