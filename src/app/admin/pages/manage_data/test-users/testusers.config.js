(function () {
    'use strict';

    angular
        .module('manage.testusers.module')
        .config(moduleConfig);

    function moduleConfig($stateProvider) {
        $stateProvider
            .state('testusers', {
                abstract: true,
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                url: '/test-users',
                parent: 'admin',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                }

            })
            .state('testusers.list', {
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                url: '',
                controller: 'AdminTestUsersManageController',
                templateUrl: 'admin/pages/manage_data/test-users/list/testusers-manage.html'
            })
            .state('testusers.add', {
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                url: '/add',
                controller: 'AdminTestUsersItemController',
                templateUrl: 'admin/pages/manage_data/test-users/item/testuser-item.html'
            })
            .state('testusers.item', {
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                url: '/{user_id}',
                controller: 'AdminTestUsersItemController',
                templateUrl: 'admin/pages/manage_data/test-users/item/testuser-item.html'
            });
    }
}());