(function() {
    'use strict';

    angular
        .module('reports.reportBuilder.module')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider) {
        $stateProvider
            .state('report-builder',{
                abstract: true,
                data: {
                    access: '@'
                },
                url: '/report-builder',
                parent: 'admin',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                }
            })
            .state('report-builder.index',{
                url: '',
                controller: 'ReportBuilderIndex',
                templateUrl: 'admin/pages/reports/report_builder/index/index.html'
            })
    }
}());
