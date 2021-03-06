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
                url: '/1yeargoal',
                parent: 'default',
                views: {
                    content: {
                        template: '<ui-view />'
                    }
                }
            })
            .state('yearGoal.overview', {
                url: '/1yeargoaloverview',
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
                controller: 'YearGoalOverviewController',
                templateUrl: 'pages/yearGoal/year-goal-overview/year-goal-overview.html'
            })
            .state('yearGoal.personalExpenses', {
                url: '/personalexpenses',
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
                controller: 'PersonalExpensesController',
                templateUrl: 'pages/yearGoal/personal-expenses/personal-expenses.html'
            })
            .state('yearGoal.fixedBusinessExpenses', {
                url: '/fixedbusinessexpenses',
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
                controller: 'FixedBusinessExpensesController',
                templateUrl: 'pages/yearGoal/fixed-business-expenses/fixed-business-expenses.html'
            })
            .state('yearGoal.totalFixedExpensesRevenue', {
                url: '/yourbreakevennumber',
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
                controller: 'TotalFixedExpensesRevenueController',
                templateUrl: 'pages/yearGoal/total-fixed-expenses-revenue/total-fixed-expenses-revenue.html'
            })
            .state('yearGoal.revenueStreams', {
                url: '/revenuestreams',
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
                controller: 'RevenueStreamsController',
                templateUrl: 'pages/yearGoal/revenue-streams/revenue-streams.html'
            })
            .state('yearGoal.sellingPrice', {
                url: '/sellingprice',
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
                controller: 'RevenueStreamsController',
                templateUrl: 'pages/yearGoal/selling-price/selling-price.html'
            })
            .state('yearGoal.variableBusinessExpenses', {
                url: '/variableexpenses',
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
                controller: 'RevenueStreamsController',
                templateUrl: 'pages/yearGoal/variable-business-expenses/variable-business-expenses.html'
            })
            .state('yearGoal.profitMargin', {
                url: '/yourprofitmargin',
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
                controller: 'RevenueStreamsController',
                templateUrl: 'pages/yearGoal/profit-margin/profit-margin.html'
            })
            .state('yearGoal.revenueBreakdown', {
                url: '/revenuebreakdown',
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
                controller: 'RevenueStreamsController',
                templateUrl: 'pages/yearGoal/revenue-breakdown/revenue-breakdown.html'
            })
            .state('yearGoal.yourYearGoal', {
                url: '/your1yeargoal',
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
                controller: 'YourYearGoalController',
                templateUrl: 'pages/yearGoal/your-year-goal/your-year-goal.html'
            })
            .state('yearGoal.adjustYourYearGoal', {
                url: '/review1yeargoal',
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
                controller: 'RevenueStreamsController',
                templateUrl: 'pages/yearGoal/adjust-your-year-goal/adjust-your-year-goal.html'
            })
            .state('yearGoal.qa', {
                url: '1yeargoalq&a',
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
                controller: 'YearGoalQAController',
                templateUrl: 'pages/yearGoal/year-goal-qa/year-goal-qa.html'
            })
            .state('yearGoal.commitYourYearGoal', {
                url: '/youryeargoal',
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
                controller: 'RevenueStreamsController',
                templateUrl: 'pages/yearGoal/commit-your-year-goal/commit-your-year-goal.html'
            })
            .state('yearGoal.step3Summary', {
                url: '/step3slapsummary',
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
                controller: 'Step3SummaryController',
                templateUrl: 'pages/yearGoal/step3-summary/step3-summary.html'
            })
            .state('yearGoal.firstExpertReview', {
                url: '/firstSLAPexpertReview',
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
                controller: 'FirstExpertReviewController',
                templateUrl: 'pages/yearGoal/first-expert-review/first-expert-review.html'
            });
    }
}());