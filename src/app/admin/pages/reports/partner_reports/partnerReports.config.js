(function() {
    'use strict';

    angular
        .module('reports.partnerReports.module')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider) {
        $stateProvider
            .state('reports.partner', {
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                url: '/partner',
                parent: 'admin',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                },
                controller: 'AdminPartnerReportsManageController',
                templateUrl: 'admin/pages/reports/partner_reports/list/partnerReports-manage.html'
            })
            .state('reports.partner.add', {
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                resolve: {

                    allProducts: function (productsService, $state) {
                        return productsService.getAllProducts().then(function(response) {
                            return  response.data;
                        }).catch(function(err) { console.log(err); $state.go('slapsters'); });
                    },
                    allCoupons: function (couponService, $state) {
                        return couponService.list()
                            .then(function (response) {
                                return response.data;
                            }).catch(function(err) { console.log(err); $state.go('slapsters'); });
                    },
                },
                url: '/addpartner',
                controller: 'AdminPartnerReportsItemController',
                templateUrl: 'admin/pages/reports/partner_reports/item/partnerReports-item.html'
            })
            .state('reports.partner.item', {
                data: {
                    access: 'admin',
                    isAdminPage: true

                },

                resolve: {
                    // allProducts: function (productsService, $state) {
                    //     return productsService.getAllProducts().then(function(response) {
                    //         return  response.data;
                    //     }).catch(function(err) { console.log(err); $state.go('reports.list'); });
                    // },
                    // allCoupons: function (couponService, $state) {
                    //     return couponService.list()
                    //         .then(function (response) {
                    //             return response.data;
                    //         }).catch(function(err) { console.log(err); $state.go('reports.list'); });
                    // },
                    allPartners: function (adminUserService, $state) {
                        return adminUserService.list()
                            .then(function (response) {
                                return response.data.filter(function (item) {
                                    return item.role === 5;
                                });
                            }).catch(function(err) { console.log(err); $state.go('reports.partner.item'); });
                    }
                },
                url: '/{partner_report_id}',
                controller: 'AdminPartnerReportsItemController',
                templateUrl: 'admin/pages/reports/partner_reports/item/partnerReports-item.html'
            });
    }
}());
