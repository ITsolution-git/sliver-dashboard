(function() {
    'use strict';

    angular
        .module('reports.SLAPexpertReports.module')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider) {
        $stateProvider
            .state('reports.slapexpert', {
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                url: '/slapexpert',
                parent: 'admin',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                },
                controller: 'AdminSLAPexpertReportsManageController',
                templateUrl: 'admin/pages/reports/slap-expert_reports/list/SLAPexpertReports-manage.html'
            })
            .state('reports.slapexpert.add', {
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
                url: '/addslapexpert',
                controller: 'AdminSLAPexpertReportsItemController',
                templateUrl: 'admin/pages/reports/slap-expert_reports/item/SLAPexpertReports-item.html'
            })
            .state('reports.slapexpert.item', {
                data: {
                    access: 'admin',
                    isAdminPage: true

                },

                resolve: {
                    allPartners: function (adminUserService, $state) {
                        return adminUserService.list()
                            .then(function (response) {
                                return response.data.filter(function (item) {
                                    return item.role === 5;
                                });
                            }).catch(function(err) { console.log(err); $state.go('reports.slapexpert.item'); });
                    }
                },
                url: '/{slapexpert_report_id}',
                controller: 'AdminSLAPExpertReportsItemController',
                templateUrl: 'admin/pages/reports/slap-expert_reports/item/SLAPexpertReports-item.html'
            });
    }
}());
