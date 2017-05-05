(function () {
    'use strict';

    angular
        .module('app.pages.actionPlan')
        .config(moduleConfig);

    function moduleConfig($stateProvider) {
        $stateProvider
            .state('actionPlan', {
                data: {
                    access: '@'
                },
                abstract: true,
                url: '/actionPlan',
                parent: 'default',
                views: {
                    content: {
                        template: '<ui-view />'
                    }
                }
            })
            .state('actionPlan.overview', {
                url: '/overview',
                params: {
                    prev: {
                        name: 'Ideal Client Q&A',
                        sref: 'idealClient.qa'
                    },
                    next: {
                        name: 'Action Plan Q&A',
                        sref: 'actionPlan.qa'
                    }
                },
                controller: 'ActionPlanOverviewController',
                templateUrl: 'pages/actionPlan/action-plan-overview/action-plan-overview.html'
            })
            .state('actionPlan.qa', {
                url: '/Q&A',
                params: {
                    prev: {
                        name: 'Action Plan Overview',
                        sref: 'actionPlan.overview'
                    },
                    next: {

                    }
                },
                controller: 'ActionPlanQAController',
                templateUrl: 'pages/actionPlan/action-plan-qa/action-plan-qa.html'
            });
    }
}());