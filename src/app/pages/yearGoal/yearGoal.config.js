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
                url: '/personalExpenses',
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
                url: '/fixedBusinessExpenses',
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
                url: '/totalFixedExpensesRevenue',
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
            .state('yearGoal.sellingPrice', {
                url: '/sellingPrice',
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
                controller: 'SellingPriceController',
                templateUrl: 'pages/yearGoal/selling-price/selling-price.html'
            })
            .state('yearGoal.variableBusinessExpenses', {
                url: '/variableBusinessExpenses',
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
                controller: 'VariableBusinessExpensesController',
                templateUrl: 'pages/yearGoal/variable-business-expenses/variable-business-expenses.html'
            })
            .state('yearGoal.profitMargin', {
                url: '/profitMargin',
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
                controller: 'ProfitMarginController',
                templateUrl: 'pages/yearGoal/profit-margin/profit-margin.html'
            })
            .state('yearGoal.revenueBreakdown', {
                url: '/revenueBreakdown',
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
                controller: 'RevenueBreakdownController',
                templateUrl: 'pages/yearGoal/revenue-breakdown/revenue-breakdown.html'
            })
            .state('yearGoal.yourYearGoal', {
                url: '/yourYearGoal',
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
                url: '/adjustYourYearGoal',
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
                controller: 'AdjustYourYearGoalController',
                templateUrl: 'pages/yearGoal/adjust-your-year-goal/adjust-your-year-goal.html'
            })
            .state('yearGoal.qa', {
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
                controller: 'YearGoalQAController',
                templateUrl: 'pages/yearGoal/year-goal-qa/year-goal-qa.html'
            })
            .state('yearGoal.commitYourYearGoal', {
                url: '/commitYourYearGoal',
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
                controller: 'CommitYourYearGoalController',
                templateUrl: 'pages/yearGoal/commit-your-year-goal/commit-your-year-goal.html'
            })
            .state('yearGoal.step2Summary', {
                url: '/step2Summary',
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
                controller: 'Step2SummaryController',
                templateUrl: 'pages/yearGoal/step2-summary/step2-summary.html'
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