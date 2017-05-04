(function () {
    'use strict';

    angular
        .module('app.pages.mindset')
        .config(moduleConfig);

    function moduleConfig($stateProvider) {
        $stateProvider
            .state('mindset', {
                data: {
                    access: '@'
                },
                abstract: true,
                url: '/mindset',
                parent: 'default',
                views: {
                    content: {
                        template: '<ui-view />'
                    }
                }
            })
            .state('mindset.ourCommitment', {
                url: '/ourCommitment',
                controller: 'OurCommitmentController',
                templateUrl: 'pages/mindset/our-commitment/our-commitment.html'
            })
            .state('mindset.yourCommitment', {
                url: '/yourCommitment',
                controller: 'YourCommitmentController',
                templateUrl: 'pages/mindset/your-commitment/your-commitment.html'
            })
            .state('mindset.slapMindset', {
                url: '/SLAPmindset',
                controller: 'SlapMindsetController',
                templateUrl: 'pages/mindset/get-slap-mindset/get-slap-mindset.html'
            });

    }
}());