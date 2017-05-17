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
                resolve: {
                    activeStep: function (stepService, $state) {
                        return stepService.resolveActiveStep(this)
                            .then(function (active) {
                                if (active) {
                                    return active;
                                }

                                return stepService.getLastFinished()
                                    .then(function (finishedStep) {
                                        $state.go(finishedStep.sref);
                                    });
                            })
                    }
                },
                controller: 'ActionPlanOverviewController',
                templateUrl: 'pages/actionPlan/action-plan-overview/action-plan-overview.html'
            })
            .state('actionPlan.worldAroundYou', {
                url: '/worldAroundYou',
                resolve: {
                    activeStep: function (stepService, $state) {
                        return stepService.resolveActiveStep(this)
                            .then(function (active) {
                                if (active) {
                                    return active;
                                }

                                return stepService.getLastFinished()
                                    .then(function (finishedStep) {
                                        $state.go(finishedStep.sref);
                                    });
                            })
                    }
                },
                controller: 'WorldAroundYouController',
                templateUrl: 'pages/actionPlan/world-around-your/world-around-your.html'
            })
            .state('actionPlan.doubleCheckStartDate', {
                url: '/doubleCheckStartDate',
                resolve: {
                    activeStep: function (stepService, $state) {
                        return stepService.resolveActiveStep(this)
                            .then(function (active) {
                                if (active) {
                                    return active;
                                }

                                return stepService.getLastFinished()
                                    .then(function (finishedStep) {
                                        $state.go(finishedStep.sref);
                                    });
                            })
                    }
                },
                controller: 'DoubleCheckStartDateController',
                templateUrl: 'pages/actionPlan/double-check-start-date/double-check-start-date.html'
            })
            .state('actionPlan.whatsHappening', {
                url: '/whatsHappeningInQ1-Q4',
                resolve: {
                    activeStep: function (stepService, $state) {
                        return stepService.resolveActiveStep(this)
                            .then(function (active) {
                                if (active) {
                                    return active;
                                }

                                return stepService.getLastFinished()
                                    .then(function (finishedStep) {
                                        $state.go(finishedStep.sref);
                                    });
                            })
                    }
                },
                controller: 'WhatsHappeningController',
                templateUrl: 'pages/actionPlan/whats-happening/whats-happening.html'
            })
            .state('actionPlan.rateConnectingStrategies', {
                url: '/rateThe10ConnectingStrategies',
                resolve: {
                    activeStep: function (stepService, $state) {
                        return stepService.resolveActiveStep(this)
                            .then(function (active) {
                                if (active) {
                                    return active;
                                }

                                return stepService.getLastFinished()
                                    .then(function (finishedStep) {
                                        $state.go(finishedStep.sref);
                                    });
                            })
                    }
                },
                controller: 'RateConnectingStrategiesController',
                templateUrl: 'pages/actionPlan/rate-connecting-strategies/rate-connecting-strategies.html'
            })
            .state('actionPlan.chooseYourConnectingStrategies', {
                url: '/chooseYourConnectingStrategies',
                resolve: {
                    activeStep: function (stepService, $state) {
                        return stepService.resolveActiveStep(this)
                            .then(function (active) {
                                if (active) {
                                    return active;
                                }

                                return stepService.getLastFinished()
                                    .then(function (finishedStep) {
                                        $state.go(finishedStep.sref);
                                    });
                            })
                    }
                },
                controller: 'ChooseYourConnectingStrategiesController',
                templateUrl: 'pages/actionPlan/choose-your-connecting-strategies/choose-your-connecting-strategies.html'
            })
            .state('actionPlan.connectingStrategyStrategizing', {
                url: '/connectingStrategyStrategizing',
                resolve: {
                    activeStep: function (stepService, $state) {
                        return stepService.resolveActiveStep(this)
                            .then(function (active) {
                                if (active) {
                                    return active;
                                }

                                return stepService.getLastFinished()
                                    .then(function (finishedStep) {
                                        $state.go(finishedStep.sref);
                                    });
                            })
                    }
                },
                controller: 'ConnectingStrategyStrategizingController',
                templateUrl: 'pages/actionPlan/connecting-strategy-strategizing/connecting-strategy-strategizing.html'
            })
            .state('actionPlan.actionItems', {
                url: '/actionItems',
                resolve: {
                    activeStep: function (stepService, $state) {
                        return stepService.resolveActiveStep(this)
                            .then(function (active) {
                                if (active) {
                                    return active;
                                }

                                return stepService.getLastFinished()
                                    .then(function (finishedStep) {
                                        $state.go(finishedStep.sref);
                                    });
                            })
                    }
                },
                controller: 'ActionItemsController',
                templateUrl: 'pages/actionPlan/action-items/action-items.html'
            })
            .state('actionPlan.actionPlanReview', {
                url: '/actionPlanReview',
                resolve: {
                    activeStep: function (stepService, $state) {
                        return stepService.resolveActiveStep(this)
                            .then(function (active) {
                                if (active) {
                                    return active;
                                }

                                return stepService.getLastFinished()
                                    .then(function (finishedStep) {
                                        $state.go(finishedStep.sref);
                                    });
                            })
                    }
                },
                controller: 'ActionPlanReviewController',
                templateUrl: 'pages/actionPlan/action-plan-review/action-plan-review.html'
            })
            .state('actionPlan.quarterlyGoals', {
                url: '/quarterlyGoals',
                resolve: {
                    activeStep: function (stepService, $state) {
                        return stepService.resolveActiveStep(this)
                            .then(function (active) {
                                if (active) {
                                    return active;
                                }

                                return stepService.getLastFinished()
                                    .then(function (finishedStep) {
                                        $state.go(finishedStep.sref);
                                    });
                            })
                    }
                },
                controller: 'QuarterlyGoalsController',
                templateUrl: 'pages/actionPlan/quarterly-goals/quarterly-goals.html'
            })
            .state('actionPlan.doubleCheckYearGoal', {
                url: '/doubleCheckYearGoal',
                resolve: {
                    activeStep: function (stepService, $state) {
                        return stepService.resolveActiveStep(this)
                            .then(function (active) {
                                if (active) {
                                    return active;
                                }

                                return stepService.getLastFinished()
                                    .then(function (finishedStep) {
                                        $state.go(finishedStep.sref);
                                    });
                            })
                    }
                },
                controller: 'DoubleCheckYearGoalController',
                templateUrl: 'pages/actionPlan/double-check-year-goal/double-check-year-goal.html'
            })
            .state('actionPlan.qa', {
                url: '/Q&A',
                resolve: {
                    activeStep: function (stepService, $state) {
                        return stepService.resolveActiveStep(this)
                            .then(function (active) {
                                if (active) {
                                    return active;
                                }

                                return stepService.getLastFinished()
                                    .then(function (finishedStep) {
                                        $state.go(finishedStep.sref);
                                    });
                            })
                    }
                },
                controller: 'ActionPlanQAController',
                templateUrl: 'pages/actionPlan/action-plan-qa/action-plan-qa.html'
            })
            .state('actionPlan.commitYourActionPlan', {
                url: '/commitToYourActionPlan',
                resolve: {
                    activeStep: function (stepService, $state) {
                        return stepService.resolveActiveStep(this)
                            .then(function (active) {
                                if (active) {
                                    return active;
                                }

                                return stepService.getLastFinished()
                                    .then(function (finishedStep) {
                                        $state.go(finishedStep.sref);
                                    });
                            })
                    }
                },
                controller: 'CommitYourActionPlanController',
                templateUrl: 'pages/actionPlan/commit-your-action-plan/commit-your-action-plan.html'
            })
            .state('actionPlan.step4Summary', {
                url: '/step4SLAPsummary',
                resolve: {
                    activeStep: function (stepService, $state) {
                        return stepService.resolveActiveStep(this)
                            .then(function (active) {
                                if (active) {
                                    return active;
                                }

                                return stepService.getLastFinished()
                                    .then(function (finishedStep) {
                                        $state.go(finishedStep.sref);
                                    });
                            })
                    }
                },
                controller: 'Step4SummaryController',
                templateUrl: 'pages/actionPlan/step4-summary/step4-summary.html'
            })
            .state('actionPlan.secondExpertReview', {
                url: '/secondSLAPexpertReview',
                resolve: {
                    activeStep: function (stepService, $state) {
                        return stepService.resolveActiveStep(this)
                            .then(function (active) {
                                if (active) {
                                    return active;
                                }

                                return stepService.getLastFinished()
                                    .then(function (finishedStep) {
                                        $state.go(finishedStep.sref);
                                    });
                            })
                    }
                },
                controller: 'SecondExpertReviewController',
                templateUrl: 'pages/actionPlan/second-expert-review/second-expert-review.html'
            });
    }
}());