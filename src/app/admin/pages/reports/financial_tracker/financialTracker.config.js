(function() {
    'use strict';

    angular
        .module('reports.financialTracker.module')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider) {
        $stateProvider
            .state('financial_tracker',{
                abstract: true,
                data: {
                    access: '@'
                },
                url: '/financial_tracker',
                parent: 'default',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                }
            })
            .state('financial_tracker.list',{
                url: '',
                controller: 'FinancialTrackerList',
                templateUrl: 'pages/reports/financial_tracker/list/index.html'
            })
    }
}());
