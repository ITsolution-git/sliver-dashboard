(function() {
    'use strict';

    angular
        .module('adminapp.pages.main')
        .config(moduleConfig);

    moduleConfig.$inject = ['$stateProvider'];

    function moduleConfig($stateProvider) {
        $stateProvider
            .state('admin.home', {
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                parent : 'admin',
                url : '/home',
                views : {
                    content : {
                        controller : 'AdminMainIndexController',
                        templateUrl : 'admin/pages/main/index/main-index.html'
                    }
                }
            })
            .state('admin-login', {
                data: {
                    access: '?',
                    isAdminPage: true
                },
                parent : 'blank',
                url : '/admin/login',
                views : {
                    content : {
                        controller : 'AdminMainLoginController as vm',
                        templateUrl : 'admin/pages/main/login/main-login.html'
                    }
                }
            });
    }
}());