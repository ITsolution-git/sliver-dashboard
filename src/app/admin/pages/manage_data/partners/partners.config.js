(function () {
    'use strict';

    angular
        .module('manage.coupon.module')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider) {
        $stateProvider
            .state('partners', {
                abstract: true,
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                url: '/partners',
                parent: 'admin',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                }

            })
            .state('partners.list', {
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                url: '',
                controller: 'partnersManageController',
                templateUrl: 'admin/pages/manage_data/partners/list/partners-manage.html'
            })
            .state('partners.add', {
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                url: '/add',
                controller: 'partnersItemController',
                templateUrl: 'admin/pages/manage_data/partners/item/partners-item.html',
                resolve: {
                    coupons: function (couponService) {
                        return couponService.list()
                            .then(function (response) {
                                return response.data;
                            });
                    }
                }
            })
            .state('partners.item', {
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                url: '/{partner_id}',
                controller: 'partnersItemController',
                templateUrl: 'admin/pages/manage_data/partners/item/partners-item.html',
                resolve : {
                    coupons: function (couponService) {
                        return couponService.list()
                            .then(function (response) {
                                return response.data;
                            });
                    }
                }
            });
    }
}());