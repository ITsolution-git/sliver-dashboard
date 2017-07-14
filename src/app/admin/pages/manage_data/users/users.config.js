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
                    access: '@'
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
                url: '',
                controller: 'AdminUsersManageController',
                templateUrl: 'admin/pages/manage_data/users/list/users-manage.html'
            })
            .state('users.add', {
                url: '/add',
                controller: 'AdminUsersItemController',
                templateUrl: 'admin/pages/manage_data/users/item/users-item.html'
            })
            .state('users.item', {
                url: '/{user_id}',
                controller: 'AdminUsersItemController',
                templateUrl: 'admin/pages/manage_data/users/item/users-item.html'
            });
    }
}());