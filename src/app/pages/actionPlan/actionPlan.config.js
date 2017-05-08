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
                        name: 'Choose Your Connecting Strategies',
                        sref: 'actionPlan.chooseYourConnectingStrategies'
                    }
                },
                controller: 'RateConnectingStrategiesController',
                templateUrl: 'pages/actionPlan/rate-connecting-strategies/rate-connecting-strategies.html'
            })
            .state('actionPlan.chooseYourConnectingStrategies', {
                url: '/chooseYourConnectingStrategies',
                params: {
                    prev: {
                        name: 'Rate the 10 Connecting Strategies',
                        sref: 'actionPlan.rateConnectingStrategies'
                    },
                    next: {
                        name: 'Connecting Strategy Strategizing',
                        sref: 'actionPlan.connectingStrategyStrategizing'
                    }
                },
                controller: 'ChooseYourConnectingStrategiesController',
                templateUrl: 'pages/actionPlan/choose-your-connecting-strategies/choose-your-connecting-strategies.html'
            })
            .state('actionPlan.connectingStrategyStrategizing', {
                url: '/connectingStrategyStrategizing',
                params: {
                    prev: {
                        name: 'Choose Your Connecting Strategies',
                        sref: 'actionPlan.chooseYourConnectingStrategies'
                    },
                    next: {
                        name: 'Action Items',
                        sref: 'actionPlan.actionItems'
                    }
                },
                controller: 'ConnectingStrategyStrategizingController',
                templateUrl: 'pages/actionPlan/connecting-strategy-strategizing/connecting-strategy-strategizing.html'
            })
            .state('actionPlan.actionItems', {
                url: '/actionItems',
                params: {
                    prev: {
                        name: 'Connecting Strategy Strategizing',
                        sref: 'actionPlan.connectingStrategyStrategizing'
                    },
                    next: {
                        name: 'Action Plan Review',
                        sref: 'actionPlan.actionPlanReview'
                    }
                },
                controller: 'ActionItemsController',
                templateUrl: 'pages/actionPlan/action-items/action-items.html'
            })
            .state('actionPlan.actionPlanReview', {
                url: '/actionPlanReview',
                params: {
                    prev: {
                        name: 'Action Items',
                        sref: 'actionPlan.actionItems'
                    },
                    next: {
                        name: 'Quarterly Goals',
                        sref: 'actionPlan.quarterlyGoals'
                    }
                },
                controller: 'ActionPlanReviewController',
                templateUrl: 'pages/actionPlan/action-plan-review/action-plan-review.html'
            })
            .state('actionPlan.quarterlyGoals', {
                url: '/quarterlyGoals',
                params: {
                    prev: {
                        name: 'Action Plan Review',
                        sref: 'actionPlan.actionPlanReview'
                    },
                    next: {
                        name: 'Double Check 1 Year Goal',
                        sref: 'actionPlan.doubleCheckYearGoal'
                    }
                },
                controller: 'QuarterlyGoalsController',
                templateUrl: 'pages/actionPlan/quarterly-goals/quarterly-goals.html'
            })
            .state('actionPlan.doubleCheckYearGoal', {
                url: '/doubleCheckYearGoal',
                params: {
                    prev: {
                        name: 'Quarterly Goals',
                        sref: 'actionPlan.quarterlyGoals'
                    },
                    next: {
                        name: 'Action Plan Q&A',
                        sref: 'actionPlan.qa'
                    }
                },
                controller: 'DoubleCheckYearGoalController',
                templateUrl: 'pages/actionPlan/double-check-year-goal/double-check-year-goal.html'
            })
            .state('actionPlan.qa', {
                url: '/Q&A',
                params: {
                    prev: {
                        name: 'Double Check 1 Year Goal',
                        sref: 'actionPlan.doubleCheckYearGoal'
                    },
                    next: {
                        name: 'Commit To Your Action Plan',
                        sref: 'actionPlan.commitYourActionPlan'
                    }
                },
                controller: 'ActionPlanQAController',
                templateUrl: 'pages/actionPlan/action-plan-qa/action-plan-qa.html'
            })
            .state('actionPlan.commitYourActionPlan', {
                url: '/commitToYourActionPlan',
                params: {
                    prev: {
                        name: 'Action Plan Q&A',
                        sref: 'actionPlan.qa'
                    },
                    next: {
                        name: 'Step 4 SLAPsummary',
                        sref: 'actionPlan.step4Summary'
                    }
                },
                controller: 'CommitYourActionPlanController',
                templateUrl: 'pages/actionPlan/commit-your-action-plan/commit-your-action-plan.html'
            })
            .state('actionPlan.step4Summary', {
                url: '/step4SLAPsummary',
                params: {
                    prev: {
                        name: 'Commit To Your Action Plan',
                        sref: 'actionPlan.commitYourActionPlan'
                    },
                    next: {
                        name: 'Second SLAPexpert Review',
                        sref: 'actionPlan.secondExpertReview'
                    }
                },
                controller: 'Step4SummaryController',
                templateUrl: 'pages/actionPlan/step4-summary/step4-summary.html'
            })
            .state('actionPlan.secondExpertReview', {
                url: '/secondSLAPexpertReview',
                params: {
                    prev: {
                        name: 'Step 4 SLAPsummary',
                        sref: 'actionPlan.step4Summary'
                    },
                    next: {
                        name: 'Living SLAP Day-to-Day',
                        sref: 'execute.livingDayToDay'
                    }
                },
                controller: 'SecondExpertReviewController',
                templateUrl: 'pages/actionPlan/second-expert-review/second-expert-review.html'
            });
    }
}());