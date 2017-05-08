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
                        name: 'Your SLAPstatement',
                        sref: 'statement.your'
                    }
                },
                controller: 'StatementOverviewController',
                templateUrl: 'pages/statement/statement-overview/statement-overview.html'
            })
            .state('statement.your', {
                url: '/yourStatement',
                params: {
                    prev: {
                        name: 'SLAPstatement Overview',
                        sref: 'statement.overview'
                    },
                    next: {
                        name: 'SLAPstatement Q&A',
                        sref: 'statement.qa'
                    }
                },
                controller: 'YourStatementController',
                templateUrl: 'pages/statement/your-statement/your-statement.html'
            })
            .state('statement.qa', {
                url: '/Q&A',
                params: {
                    prev: {
                        name: 'Your SLAPstatement',
                        sref: 'statement.your'

                    },
                    next: {
                        name: 'Commit To Your',
                        sref: 'statement.commitToYour'
                    }
                },
                controller: 'StatementQAController',
                templateUrl: 'pages/statement/statement-qa/statement-qa.html'
            })
            .state('statement.commitToYour', {
                url: '/commitToYour',
                params: {
                    prev: {
                        name: 'SLAPstatement Q&A',
                        sref: 'statement.qa'

                    },
                    next: {
                        name: 'SLAPStatement',
                        sref: 'statement.statement'
                    }
                },
                controller: 'CommitToYourController',
                templateUrl: 'pages/statement/commit-toYour/commit-toYour.html'
            })
            .state('statement.statement', {
                url: '/SLAPstatement',
                params: {
                    prev: {
                        name: 'Commit To Your',
                        sref: 'statement.commitToYour'

                    },
                    next: {
                        name: 'Step 1 SLAPsummary',
                        sref: 'statement.step1Summary'
                    }
                },
                controller: 'StatementController',
                templateUrl: 'pages/statement/statement/statement.html'
            }).state('statement.step1Summary', {
                url: '/step1SLAPsummary',
                params: {
                    prev: {
                        name: 'SLAPStatement',
                        sref: 'statement.statement'

                    },
                    next: {
                        name: '1 Year Goal Overview',
                        sref: 'yearGoal.overview'
                    }
                },
                controller: 'Step1SummaryController',
                templateUrl: 'pages/statement/step1-summary/step1-summary.html'
            });
    }
}());