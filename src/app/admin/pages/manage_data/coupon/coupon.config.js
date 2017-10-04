(function() {
    'use strict';

    angular
        .module('manage.coupon.module')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider) {
        $stateProvider
            .state('coupon', {
                abstract: true,
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                url: '/coupon',
                parent: 'admin',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                }

            })
            .state('coupon.list', {
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                url: '',
                controller: 'CouponManageController',
                templateUrl: 'admin/pages/manage_data/coupon/list/coupon-manage.html'
            })
            .state('coupon.add', {
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                url: '/add',
                controller: 'CouponItemController',
                templateUrl: 'admin/pages/manage_data/coupon/item/coupon-item.html'
            })
            .state('coupon.item', {
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                url: '/{coupon_id}',
                controller: 'CouponItemController',
                templateUrl: 'admin/pages/manage_data/coupon/item/coupon-item.html'
            });
    }
}());