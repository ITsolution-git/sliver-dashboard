(function () {
    'use strict';

    angular
        .module('slapsters.main.module')
        .config(moduleConfig);

    function moduleConfig($stateProvider) {
        $stateProvider
            .state('slapsters', {
                abstract: true,
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                url: '/slapsters',
                parent: 'admin',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                }

            })
            .state('slapsters.list', {
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                url: '',
                controller: 'AdminSlapstersListController',
                templateUrl: 'admin/pages/slapsters/slapstersMain/list/slapsters-list.html'
            })
            .state('slapsters.item', {
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                url: '/{user_id}',
                controller: 'AdminSlapstersItemController',
                templateUrl: 'admin/pages/slapsters/slapstersMain/item/slapsters-item.html'
            });
    }
}());