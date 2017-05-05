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
                params: {
                    prev: {
                        sref: null,
                        name: null
                    },
                    next: {
                        sref: 'mindset.slapMindset',
                        name: 'Get the SLAPmindset'
                    }
                },
                controller: 'OurCommitmentController',
                templateUrl: 'pages/mindset/our-commitment/our-commitment.html'
            })
            .state('mindset.slapMindset', {
                url: '/SLAPmindset',
                params: {
                    prev: {
                        sref: 'mindset.ourCommitment',
                        name: 'Our Commitment To You'
                    },
                    next: {
                        name: 'Cashflow / Capacity Cath 22',
                        sref: 'mindset.cashFlow'
                    }
                },
                controller: 'SlapMindsetController',
                templateUrl: 'pages/mindset/get-slap-mindset/get-slap-mindset.html'
            })
            .state('mindset.cashFlow', {
                url: '/cashFlow',
                params: {
                    prev: {
                        sref: 'mindset.slapMindset',
                        name: 'Get the SLAPmindset'

                    },
                    next: {
                        sref: 'mindset.yourBusiness',
                        name: 'Your Business With / Without A SLAP'
                    }
                },
                controller: 'CashFlowController',
                templateUrl: 'pages/mindset/cashflow/cashflow.html'
            })
            .state('mindset.yourBusiness', {
                url: '/yourBusiness',
                params: {
                    prev: {
                        name: 'Cashflow / Capacity Cath 22',
                        sref: 'mindset.cashFlow'

                    },
                    next: {
                        name: 'Top Down, Bottom Up',
                        sref: 'mindset.topDownBottomUp'
                    }
                },
                controller: 'YourBusinessController',
                templateUrl: 'pages/mindset/your-business/your-business.html'
            })
            .state('mindset.topDownBottomUp', {
                url: '/topDownBottomUp',
                params: {
                    prev: {
                        sref: 'mindset.yourBusiness',
                        name: 'Your Business With / Without A SLAP'

                    },
                    next: {
                        name: 'Start SLAPn',
                        sref: 'mindset.startSlapn'
                    }
                },
                controller: 'TopDownBottomUpController',
                templateUrl: 'pages/mindset/top-down-bottom-up/top-down-bottom-up.html'
            })
            .state('mindset.startSlapn', {
                url: '/startSLAPn',
                params: {
                    prev: {
                        name: 'Top Down, Bottom Up',
                        sref: 'mindset.topDownBottomUp'

                    },
                    next: {
                        name: 'SLAPstatement Overview',
                        sref: 'statement.overview'
                    }
                },
                controller: 'StartSlapnController',
                templateUrl: 'pages/mindset/start-slapn/start-slapn.html'
            });

    }
}());