(function () {
    'use strict';

    angular
        .module('manage.products.module')
        .config(moduleConfig);

    // moduleConfig.$inject = ['$stateProvider'];

    function moduleConfig($stateProvider) {
        $stateProvider
            .state('plans', {
                
                abstract: true,
                data: {
                    access: 'admin',
                    isAdminPage: true,
                    permissions: {
                        only: 'canPlans',
                        redirectTo: 'admin.home'
                    }
                },
                url: '/plans',
                parent: 'admin',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                }

            })
            .state('plans.list', {
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                url: '',
                controller: 'AdminProductsManageController',
                templateUrl: 'admin/pages/manage_data/products/list/products-manage.html'
            })
            .state('plans.add', {
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                url: '/add',
                controller: 'AdminProductsItemController',
                templateUrl: 'admin/pages/manage_data/products/item/products-item.html'
            })
            .state('plans.item', {
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                url: '/{product_id}',
                controller: 'AdminProductsItemController',
                templateUrl: 'admin/pages/manage_data/products/item/products-item.html'
            });
    }
}());