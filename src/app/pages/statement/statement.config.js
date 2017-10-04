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
                url: '/slapstatement',
                parent: 'default',
                views: {
                    content: {
                        template: '<ui-view />'
                    }
                }
            })
            .state('statement.overview', {
                url: '/slapstatementoverview',
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
                controller: 'StatementOverviewController',
                templateUrl: 'pages/statement/statement-overview/statement-overview.html'
            })
            .state('statement.qa', {
                url: '/slapstatementq&a',
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
                controller: 'StatementQAController',
                templateUrl: 'pages/statement/statement-qa/statement-qa.html'
            })
            .state('statement.yourStatement', {
                url: '/yourslapstatement',
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
                controller: 'YourStatementController',
                templateUrl: 'pages/statement/your-statement/your-statement.html'
            })
            .state('statement.commitToYour', {
                url: '/reviewslapstatement',
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
                controller: 'CommitToYourController',
                templateUrl: 'pages/statement/commit-toYour/commit-toYour.html'
            })
            .state('statement.statement', {
                url: '/SLAPstatement',
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
                controller: 'StatementController',
                templateUrl: 'pages/statement/statement/statement.html'
            }).state('statement.step1Summary', {
                url: '/step1slapsummary',
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
                controller: 'Step1SummaryController',
                templateUrl: 'pages/statement/step1-summary/step1-summary.html'
            });
    }
}());