(function () {
    'use strict';

    angular
        .module('app.pages.yearGoal')
        .config(moduleConfig);

    function moduleConfig($stateProvider) {
        $stateProvider
            .state('yearGoal', {
                data: {
                    access: '@'
                },
                abstract: true,
                url: '/yearGoal',
                parent: 'default',
                views: {
                    content: {
                        template: '<ui-view />'
                    }
                }
            })
            .state('yearGoal.overview', {
                url: '/overview',
                params: {
                    prev: {
                        name: 'SLAPstatement Q&A',
                        sref: 'statement.qa'

                    },
                    next: {
                        name: '1 Year Goal Q&A',
                        sref: 'yearGoal.qa'
                    }
                },
                controller: 'YearGoalOverviewController',
                templateUrl: 'pages/yearGoal/year-goal-overview/year-goal-overview.html'
            })
            .state('yearGoal.qa', {
                url: '/Q&A',
                params: {
                    prev: {
                        name: '1 Year Goal Overview',
                        sref: 'yearGoal.overview'

                    },
                    next: {
                        name: 'Ideal Client Overview',
                        sref: 'idealClient.overview'
                    }
                },
                controller: 'YearGoalQAController',
                templateUrl: 'pages/yearGoal/year-goal-qa/year-goal-qa.html'
            });
    }
}());