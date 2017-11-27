(function() {
    'use strict';

    angular
        .module('reports.reportBuilder.module')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider) {
        $stateProvider
            .state('reports', {
                abstract: true,
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                url: '/reports',
                parent: 'admin',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                }

            })
            .state('reports.list', {
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                url: '',
                controller: 'AdminReportsManageController',
                templateUrl: 'admin/pages/reports/report_builder/list/reports-manage.html'
            })
            .state('reports.add', {
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
                    allPartners: function (partnerService, $state) {
                        return partnerService.list()
                        .then(function (response) {
                            return response.data;
                        })
                        .catch(function(err) { console.log(err); $state.go('reports.partner.item'); });
                    },
                    allExperts: function (adminUserService, $state) {
                        return adminUserService.list()
                        .then(function (response) {
                            return response.data.filter(function (item) {
                                return item.role === 2;
                            });
                        }).catch(function(err) { console.log(err); $state.go('reports.slapexpert.item'); });
                    }
                },
                url: '/add',
                controller: 'AdminReportsItemController',
                templateUrl: 'admin/pages/reports/report_builder/item/reports-item.html'
            })
            .state('reports.item', {
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                resolve: {
                    allProducts: function (productsService, $state) {
                        return productsService.getAllProducts().then(function(response) {
                            return  response.data;
                        }).catch(function(err) { console.log(err); $state.go('reports.list'); });
                    },
                    allCoupons: function (couponService, $state) {
                        return couponService.list()
                        .then(function (response) {
                            return response.data;
                        }).catch(function(err) { console.log(err); $state.go('reports.list'); });
                    },
                    allPartners: function (partnerService, $state) {
                        return partnerService.list()
                        .then(function (response) {
                            return response.data;
                        })
                        .catch(function(err) { console.log(err); $state.go('reports.partner.item'); });
                    },
                    allExperts: function (adminUserService, $state) {
                        return adminUserService.list()
                        .then(function (response) {
                            return response.data.filter(function (item) {
                                return item.role === 2;
                            });
                        }).catch(function(err) { console.log(err); $state.go('reports.slapexpert.item'); });
                    }
                },
                url: '/{report_id}',
                controller: 'AdminReportsItemController',
                templateUrl: 'admin/pages/reports/report_builder/item/reports-item.html'
            });
    }
}());
