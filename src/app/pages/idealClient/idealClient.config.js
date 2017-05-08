(function () {
    'use strict';

    angular
        .module('app.pages.idealClient')
        .config(moduleConfig);

    function moduleConfig($stateProvider) {
        $stateProvider
            .state('idealClient', {
                data: {
                    access: '@'
                },
                abstract: true,
                url: '/idealClient',
                parent: 'default',
                views: {
                    content: {
                        template: '<ui-view />'
                    }
                }
            })
            .state('idealClient.overview', {
                url: '/overview',
                params: {
                    prev: {
                        name: 'First SLAPexpert Review',
                        sref: 'yearGoal.firstExpertReview'
                    },
                    next: {
                        name: 'Who Are Your Ideal Clients?',
                        sref: 'idealClient.whoAreYourIdealClients'
                    }
                },
                controller: 'IdealClientOverviewController',
                templateUrl: 'pages/idealClient/ideal-client-overview/ideal-client-overview.html'
            })
            .state('idealClient.whoAreYourIdealClients', {
                url: '/whoAreYourIdealClients',
                params: {
                    prev: {
                        name: 'Ideal Client Overview',
                        sref: 'idealClient.overview'
                    },
                    next: {
                        name: 'Define Your Ideal Client',
                        sref: 'idealClient.defineYourIdealClient'
                    }
                },
                controller: 'WhoAreYourIdealClientsController',
                templateUrl: 'pages/idealClient/who-are-your-ideal-clients/who-are-your-ideal-clients.html'
            })
            .state('idealClient.defineYourIdealClient', {
                url: '/defineYourIdealClient',
                params: {
                    prev: {
                        name: 'Who Are Your Ideal Clients?',
                        sref: 'idealClient.whoAreYourIdealClients'
                    },
                    next: {
                        name: 'Name Your Ideal Client',
                        sref: 'idealClient.nameYourIdealClient'
                    }
                },
                controller: 'DefineYourIdealClientController',
                templateUrl: 'pages/idealClient/define-your-ideal-client/define-your-ideal-client.html'
            })
            .state('idealClient.nameYourIdealClient', {
                url: '/nameYourIdealClient',
                params: {
                    prev: {
                        name: 'Define Your Ideal Client',
                        sref: 'idealClient.defineYourIdealClient'
                    },
                    next: {
                        name: 'Ideal Client Q&A',
                        sref: 'idealClient.qa'
                    }
                },
                controller: 'NameYourIdealClientController',
                templateUrl: 'pages/idealClient/name-your-ideal-client/name-your-ideal-client.html'
            })
            .state('idealClient.qa', {
                url: '/Q&A',
                params: {
                    prev: {
                        name: 'Name Your Ideal Client',
                        sref: 'idealClient.nameYourIdealClient'
                    },
                    next: {
                        name: 'Commit To Your Ideal Client',
                        sref: 'idealClient.commitYourIdealClient'
                    }
                },
                controller: 'IdealClientQAController',
                templateUrl: 'pages/idealClient/ideal-client-qa/ideal-client-qa.html'
            })
            .state('idealClient.commitYourIdealClient', {
                url: '/commitToYourIdealClient',
                params: {
                    prev: {
                        name: 'Ideal Client Q&A',
                        sref: 'idealClient.qa'
                    },
                    next: {
                        name: 'Double Check',
                        sref: 'idealClient.doubleCheck'
                    }
                },
                controller: 'CommitYourIdealClientController',
                templateUrl: 'pages/idealClient/commit-your-ideal-client/commit-your-ideal-client.html'
            })
            .state('idealClient.doubleCheck', {
                url: '/doubleCheck',
                params: {
                    prev: {
                        name: 'Commit To Your Ideal Client',
                        sref: 'idealClient.commitYourIdealClient'
                    },
                    next: {
                        name: 'SLAPstatement',
                        sref: 'idealClient.slapStatement'
                    }
                },
                controller: 'DoubleCheckController',
                templateUrl: 'pages/idealClient/double-check/double-check.html'
            })
            .state('idealClient.slapStatement', {
                url: '/SLAPstatement',
                params: {
                    prev: {
                        name: 'Double Check ',
                        sref: 'idealClient.doubleCheck'
                    },
                    next: {
                        name: 'Step 3 SLAPsummary',
                        sref: 'idealClient.step3Summary'
                    }
                },
                controller: 'SlapStatementController',
                templateUrl: 'pages/idealClient/slap-statement/slap-statement.html'
            })
            .state('idealClient.step3Summary', {
                url: '/step3Summary',
                params: {
                    prev: {
                        name: 'SLAPstatement',
                        sref: 'idealClient.slapStatement'
                    },
                    next: {
                        name: 'Action Plan Overview',
                        sref: 'actionPlan.overview'
                    }
                },
                controller: 'Step3SummaryController',
                templateUrl: 'pages/idealClient/step3-summary/step3-summary.html'
            });
    }
}());