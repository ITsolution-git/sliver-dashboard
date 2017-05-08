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
                        name: 'Step 1 SLAPsummary',
                        sref: 'statement.step1Summary'

                    },
                    next: {
                        name: 'Personal Expenses',
                        sref: 'yearGoal.personalExpenses'
                    }
                },
                controller: 'YearGoalOverviewController',
                templateUrl: 'pages/yearGoal/year-goal-overview/year-goal-overview.html'
            })
            .state('yearGoal.personalExpenses', {
                url: '/personalExpenses',
                params: {
                    prev: {
                        name: '1 Year Goal Overview',
                        sref: 'yearGoal.overview'

                    },
                    next: {
                        name: 'Fixed Business Expenses',
                        sref: 'yearGoal.fixedBusinessExpenses'
                    }
                },
                controller: 'PersonalExpensesController',
                templateUrl: 'pages/yearGoal/personal-expenses/personal-expenses.html'
            })
            .state('yearGoal.fixedBusinessExpenses', {
                url: '/fixedBusinessExpenses',
                params: {
                    prev: {
                        name: 'Personal Expenses',
                        sref: 'yearGoal.personalExpenses'

                    },
                    next: {
                        name: 'Total Fixed Expenses Revenue',
                        sref: 'yearGoal.totalFixedExpensesRevenue'
                    }
                },
                controller: 'FixedBusinessExpensesController',
                templateUrl: 'pages/yearGoal/fixed-business-expenses/fixed-business-expenses.html'
            })
            .state('yearGoal.totalFixedExpensesRevenue', {
                url: '/totalFixedExpensesRevenue',
                params: {
                    prev: {
                        name: 'Fixed Business Expenses',
                        sref: 'yearGoal.fixedBusinessExpenses'

                    },
                    next: {
                        name: 'Selling Price',
                        sref: 'yearGoal.sellingPrice'
                    }
                },
                controller: 'TotalFixedExpensesRevenueController',
                templateUrl: 'pages/yearGoal/total-fixed-expenses-revenue/total-fixed-expenses-revenue.html'
            })
            .state('yearGoal.sellingPrice', {
                url: '/sellingPrice',
                params: {
                    prev: {
                        name: 'Total Fixed Expenses Revenue',
                        sref: 'yearGoal.totalFixedExpensesRevenue'

                    },
                    next: {
                        name: 'Variable Business Expenses',
                        sref: 'yearGoal.variableBusinessExpenses'
                    }
                },
                controller: 'SellingPriceController',
                templateUrl: 'pages/yearGoal/selling-price/selling-price.html'
            })
            .state('yearGoal.variableBusinessExpenses', {
                url: '/variableBusinessExpenses',
                params: {
                    prev: {
                        name: 'Selling Price',
                        sref: 'yearGoal.sellingPrice'

                    },
                    next: {
                        name: 'Profit Margin',
                        sref: 'yearGoal.profitMargin'
                    }
                },
                controller: 'VariableBusinessExpensesController',
                templateUrl: 'pages/yearGoal/variable-business-expenses/variable-business-expenses.html'
            })
            .state('yearGoal.profitMargin', {
                url: '/profitMargin',
                params: {
                    prev: {
                        name: 'Variable Business Expenses',
                        sref: 'yearGoal.variableBusinessExpenses'

                    },
                    next: {
                        name: 'Revenue Breakdown',
                        sref: 'yearGoal.revenueBreakdown'
                    }
                },
                controller: 'ProfitMarginController',
                templateUrl: 'pages/yearGoal/profit-margin/profit-margin.html'
            })
            .state('yearGoal.revenueBreakdown', {
                url: '/revenueBreakdown',
                params: {
                    prev: {
                        name: 'Profit Margin',
                        sref: 'yearGoal.profitMargin'

                    },
                    next: {
                        name: 'Your 1 Year Goal',
                        sref: 'yearGoal.yourYearGoal'
                    }
                },
                controller: 'RevenueBreakdownController',
                templateUrl: 'pages/yearGoal/revenue-breakdown/revenue-breakdown.html'
            })
            .state('yearGoal.yourYearGoal', {
                url: '/yourYearGoal',
                params: {
                    prev: {
                        name: 'Revenue Breakdown',
                        sref: 'yearGoal.revenueBreakdown'

                    },
                    next: {
                        name: 'Adjust your 1 Year Goal',
                        sref: 'yearGoal.adjustYourYearGoal'
                    }
                },
                controller: 'YourYearGoalController',
                templateUrl: 'pages/yearGoal/your-year-goal/your-year-goal.html'
            })
            .state('yearGoal.adjustYourYearGoal', {
                url: '/adjustYourYearGoal',
                params: {
                    prev: {
                        name: 'Your 1 Year Goal',
                        sref: 'yearGoal.yourYearGoal'

                    },
                    next: {
                        name: '1 Year Goal Q&A',
                        sref: 'yearGoal.qa'
                    }
                },
                controller: 'AdjustYourYearGoalController',
                templateUrl: 'pages/yearGoal/adjust-your-year-goal/adjust-your-year-goal.html'
            })
            .state('yearGoal.qa', {
                url: '/Q&A',
                params: {
                    prev: {
                        name: 'Adjust your 1 Year Goal',
                        sref: 'yearGoal.adjustYourYearGoal'

                    },
                    next: {
                        name: 'Commit To Your 1 Year Goal',
                        sref: 'yearGoal.commitYourYearGoal'
                    }
                },
                controller: 'YearGoalQAController',
                templateUrl: 'pages/yearGoal/year-goal-qa/year-goal-qa.html'
            })
            .state('yearGoal.commitYourYearGoal', {
                url: '/commitYourYearGoal',
                params: {
                    prev: {
                        name: '1 Year Goal Q&A',
                        sref: 'yearGoal.qa'

                    },
                    next: {
                        name: 'Step 2 SLAPsummary',
                        sref: 'yearGoal.step2Summary'
                    }
                },
                controller: 'CommitYourYearGoalController',
                templateUrl: 'pages/yearGoal/commit-your-year-goal/commit-your-year-goal.html'
            })
            .state('yearGoal.step2Summary', {
                url: '/step2Summary',
                params: {
                    prev: {
                        name: 'Commit To Your 1 Year Goal',
                        sref: 'yearGoal.commitYourYearGoal'
                    },
                    next: {
                        name: 'First SLAPexpert Review',
                        sref: 'yearGoal.firstExpertReview'
                    }
                },
                controller: 'Step2SummaryController',
                templateUrl: 'pages/yearGoal/step2-summary/step2-summary.html'
            })
            .state('yearGoal.firstExpertReview', {
                url: '/firstSLAPexpertReview',
                params: {
                    prev: {
                        name: 'Step 2 SLAPsummary',
                        sref: 'yearGoal.step2Summary'
                    },
                    next: {
                        name: 'Ideal Client Overview',
                        sref: 'idealClient.overview'
                    }
                },
                controller: 'FirstExpertReviewController',
                templateUrl: 'pages/yearGoal/first-expert-review/first-expert-review.html'
            });
    }
}());