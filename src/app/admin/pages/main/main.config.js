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
                resolve: {
                    allUsers: function (adminUserService, $state) {
                        return adminUserService.list()
                        .then(function (response) {
                            return response.data;
                        });
                    }
                },
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
                parent : 'withNavbarWithoutLinks',
                url : '/admin/login',
                views : {
                    content : {
                        controller : 'AdminMainLoginController as vm',
                        templateUrl : 'admin/pages/main/login/main-login.html'
                    }
                }
            })
            
            .state('admin.myaccounts', {
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                parent: 'admin',
                url: '/myaccounts',
                resolve: {
                    userAllData: function (stepService) {
                        return stepService.getAllUserData(this)
                    }
                },
                views: {
                    content: {
                        controller: 'MyaccountsController',
                        templateUrl: 'pages/settingsUser/myaccounts/myaccounts.html'
                    }
                }
            });
    }
}());