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
            .state('reports.slapexpert.item', {
                data: {
                    access: 'admin',
                    isAdminPage: true

                },

                resolve: {
                    allExperts: function (adminUserService, $state) {
                        return adminUserService.list()
                            .then(function (response) {
                                return response.data.filter(function (item) {
                                    return item.role === 2;
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
