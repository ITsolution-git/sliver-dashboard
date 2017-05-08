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
                        name: 'Step 3 SLAPsummary',
                        sref: 'idealClient.step3Summary'
                    },
                    next: {
                        name: 'The World Around You',
                        sref: 'actionPlan.worldAroundYou'
                    }
                },
                controller: 'ActionPlanOverviewController',
                templateUrl: 'pages/actionPlan/action-plan-overview/action-plan-overview.html'
            })
            .state('actionPlan.worldAroundYou', {
                url: '/worldAroundYou',
                params: {
                    prev: {
                        name: 'Action Plan Overview',
                        sref: 'actionPlan.overview'
                    },
                    next: {
                        name: 'Double Check Start Date',
                        sref: 'actionPlan.doubleCheckStartDate'
                    }
                },
                controller: 'WorldAroundYouController',
                templateUrl: 'pages/actionPlan/world-around-your/world-around-your.html'
            })
            .state('actionPlan.doubleCheckStartDate', {
                url: '/doubleCheckStartDate',
                params: {
                    prev: {
                        name: 'The World Around You',
                        sref: 'actionPlan.worldAroundYou'
                    },
                    next: {
                        name: 'What\'s Happening in Q1-Q4',
                        sref: 'actionPlan.whatsHappening'
                    }
                },
                controller: 'DoubleCheckStartDateController',
                templateUrl: 'pages/actionPlan/double-check-start-date/double-check-start-date.html'
            })
            .state('actionPlan.whatsHappening', {
                url: '/whatsHappeningInQ1-Q4',
                params: {
                    prev: {
                        name: 'Double Check Start Date',
                        sref: 'actionPlan.doubleCheckStartDate'
                    },
                    next: {
                        name: 'Rate the 10 Connecting Strategies',
                        sref: 'actionPlan.rateConnectingStrategies'
                    }
                },
                controller: 'WhatsHappeningController',
                templateUrl: 'pages/actionPlan/whats-happening/whats-happening.html'
            })
            .state('actionPlan.rateConnectingStrategies', {
                url: '/rateThe10ConnectingStrategies',
                params: {
                    prev: {
                        name: 'What\'s Happening in Q1-Q4',
                        sref: 'actionPlan.whatsHappening'
                    },
                    next: {
                        name: '',
                        sref: ''
                    }
                },
                controller: 'RateConnectingStrategiesController',
                templateUrl: 'pages/actionPlan/rate-connecting-strategies/rate-connecting-strategies.html'
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