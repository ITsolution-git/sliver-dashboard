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
                    access: '@'
                },
                url: '/coupon',
                parent: 'default',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                }

            })
            .state('coupon.list', {
                url: '',
                controller: 'CouponManageController',
                templateUrl: 'pages/manage_data/coupon/list/coupon-manage.html'
            })
            .state('coupon.add', {
                url: '/add',
                controller: 'CouponItemController',
                templateUrl: 'pages/manage_data/coupon/item/coupon-item.html'
            })
            .state('coupon.item', {
                url: '/{coupon_id}',
                controller: 'CouponItemController',
                templateUrl: 'pages/manage_data/coupon/item/coupon-item.html'
            });
    }
}());