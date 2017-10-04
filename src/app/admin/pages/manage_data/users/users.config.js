(function () {
    'use strict';

    angular
        .module('manage.users.module')
        .config(moduleConfig);

    function moduleConfig($stateProvider) {
        $stateProvider
            .state('users', {
                abstract: true,
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                url: '/users',
                parent: 'admin',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                }

            })
            .state('users.list', {
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                url: '',
                controller: 'AdminUsersManageController',
                templateUrl: 'admin/pages/manage_data/users/list/users-manage.html'
            })
            .state('users.add', {
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                url: '/add',
                controller: 'AdminUsersItemController',
                templateUrl: 'admin/pages/manage_data/users/item/users-item.html'
            })
            .state('users.item', {
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                url: '/{user_id}',
                controller: 'AdminUsersItemController',
                templateUrl: 'admin/pages/manage_data/users/item/users-item.html'
            });
    }
}());