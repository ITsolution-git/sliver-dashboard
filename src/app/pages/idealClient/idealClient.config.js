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
                        name: '1 Year Goal Q&A',
                        sref: 'yearGoal.qa'
                    },
                    next: {
                        name: 'Ideal Client Q&A',
                        sref: 'idealClient.qa'
                    }
                },
                controller: 'IdealClientOverviewController',
                templateUrl: 'pages/idealClient/ideal-client-overview/ideal-client-overview.html'
            })
            .state('idealClient.qa', {
                url: '/Q&A',
                params: {
                    prev: {
                        name: 'Ideal Client Overview',
                        sref: 'idealClient.overview'
                    },
                    next: {
                        name: 'Action Plan Overview',
                        sref: 'actionPlan.overview'
                    }
                },
                controller: 'IdealClientQAController',
                templateUrl: 'pages/idealClient/ideal-client-qa/ideal-client-qa.html'
            });
    }
}());