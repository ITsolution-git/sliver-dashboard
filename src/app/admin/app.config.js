(function() {
    'use strict';

    angular
        .module('adminapp')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$authProvider', 'CONFIG'];

    function config($stateProvider, $urlRouterProvider,$authProvider,CONFIG) {

        $stateProvider
            .state('blank', {
                abstract : true,
                controller : 'AdminLayoutBlankController',
                templateUrl : 'admin/layouts/layout-blank.html'
            })
            .state('default', {
                abstract : true,
                parent : 'blank',
                views : {
                    content : {
                        controller : 'AdminLayoutDefaultController',
                        templateUrl : 'admin/layouts/layout-default.html'
                    }
                }
            });

        $urlRouterProvider.when('', '/');

        $urlRouterProvider.otherwise('/');

        $authProvider.httpInterceptor = function() {
            return true;
        };

        $authProvider.withCredentials = false;
        $authProvider.loginUrl = CONFIG.api + '/admin/auth';
        $authProvider.baseUrl = '/';
        // $authProvider.unlinkUrl = '/auth/unlink/';
        $authProvider.tokenName = 'token';
        $authProvider.tokenRoot = 'data';
        $authProvider.tokenPrefix = 'satellizer';
        $authProvider.tokenHeader = 'Authorization';
        $authProvider.tokenType = 'Bearer';
        $authProvider.storageType = 'localStorage';

    }
}());