(function () {
    'use strict';

    angular
        .module('manage.products.module')
        .config(moduleConfig);

    // moduleConfig.$inject = ['$stateProvider'];

    function moduleConfig($stateProvider) {
        // $stateProvider
        //     .state('plans', {
        //         abstract: true,
        //         data: {
        //             access: '@'
        //         },
        //         url: '/plans',
        //         parent: 'admin.default',
        //         views: {
        //             content: {
        //                 template: '<ui-view/>'
        //             }
        //         }

        //     })
        //     .state('plans.list', {
        //         url: '',
        //         controller: 'AdminProductsManageController',
        //         templateUrl: 'admin/pages/manage_data/products/list/products-manage.html'
        //     })
        //     .state('plans.add', {
        //         url: '/add',
        //         controller: 'AdminProductsItemController',
        //         templateUrl: 'admin/pages/manage_data/products/item/products-item.html'
        //     })
        //     .state('plans.item', {
        //         url: '/{product_id}',
        //         controller: 'AdminProductsItemController',
        //         templateUrl: 'admin/pages/manage_data/products/item/products-item.html'
        //     });
    }
}());