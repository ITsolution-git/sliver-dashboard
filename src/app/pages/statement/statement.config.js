(function () {
    'use strict';

    angular
        .module('app.pages.statement')
        .config(moduleConfig);

    function moduleConfig($stateProvider) {
        $stateProvider
            .state('statement', {
                data: {
                    access: '@'
                },
                abstract: true,
                url: '/statement',
                parent: 'default',
                views: {
                    content: {
                        template: '<ui-view />'
                    }
                }
            })
            .state('statement.overview', {
                url: '/overview',
                params: {
                    prev: {
                        name: 'Your SLAP Start Date',
                        sref: 'mindset.slapStartDate'

                    },
                    next: {
                        name: 'SLAPstatement Q&A',
                        sref: 'statement.qa'
                    }
                },
                controller: 'StatementOverviewController',
                templateUrl: 'pages/statement/statement-overview/statement-overview.html'
            })
            .state('statement.qa', {
                url: '/Q&A',
                params: {
                    prev: {
                        name: 'SLAPstatement Overview',
                        sref: 'statement.overview'

                    },
                    next: {
                        name: '1 Year Goal Overview',
                        sref: 'yearGoal.overview'
                    }
                },
                controller: 'StatementQAController',
                templateUrl: 'pages/statement/statement-qa/statement-qa.html'
            });
    }
}());