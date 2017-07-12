(function() {
    'use strict';

    angular
        .module('adminapp.pages.main')
        .config(moduleConfig);

    moduleConfig.$inject = ['$stateProvider'];

    function moduleConfig($stateProvider) {
        $stateProvider
            .state('home', {
                data: {
                    access: '@'
                },
                parent : 'default',
                url : '/',
                views : {
                    content : {
                        controller : 'AdminMainIndexController',
                        templateUrl : 'admin/pages/main/index/main-index.html'
                    }
                }
            })
            .state('login', {
                data: {
                    access: '?'
                },
                parent : 'blank',
                url : '/login',
                views : {
                    content : {
                        controller : 'AdminMainLoginController as vm',
                        templateUrl : 'admin/pages/main/login/main-login.html'
                    }
                }
            });
    }
}());