(function() {
    'use strict';

    angular
        .module('adminapp')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$authProvider', 'CONFIG'];

    function config($stateProvider, $urlRouterProvider,$authProvider,CONFIG) {

        

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