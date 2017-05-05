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
                        sref: 'mindset.yourCommitment',
                        name: 'Your Commitment to Us'
                    }
                },
                controller: 'OurCommitmentController',
                templateUrl: 'pages/mindset/our-commitment/our-commitment.html'
            })
            .state('mindset.yourCommitment', {
                url: '/yourCommitment',
                params: {
                    prev: {
                        sref: 'mindset.ourCommitment',
                        name: 'Our Commitment to You'
                    },
                    next: {
                        sref: 'mindset.slapMindset',
                        name: 'Get the SLAPmindset'
                    }
                },
                controller: 'YourCommitmentController',
                templateUrl: 'pages/mindset/your-commitment/your-commitment.html'
            })
            .state('mindset.slapMindset', {
                url: '/SLAPmindset',
                params: {
                    prev: {
                        sref: 'mindset.yourCommitment',
                        name: 'Your Commitment to Us'
                    },
                    next: {
                        name: 'Privilege and Responsibility',
                        sref: 'mindset.privilegeAndResponsibility'
                    }
                },
                controller: 'SlapMindsetController',
                templateUrl: 'pages/mindset/get-slap-mindset/get-slap-mindset.html'
            })
            .state('mindset.privilegeAndResponsibility', {
                url: '/privilageAndResponsibility',
                params: {
                    prev: {
                        sref: 'mindset.slapMindset',
                        name: 'Get the SLAPmindset'
                    },
                    next: {
                        name: 'Are You Stuck?',
                        sref: 'mindset.areYourStuck'
                    }
                },
                controller: 'PrivilegeAndResponsibilityController',
                templateUrl: 'pages/mindset/privilege_and_responsibility/privilege-and-responsibility.html'
            })
            .state('mindset.areYourStuck', {
                url: '/areYourStuck',
                params: {
                    prev: {
                        name: 'Privilege and Responsibility',
                        sref: 'mindset.privilegeAndResponsibility'
                    },
                    next: {
                        name: 'Cashflow / Capacity Cath 22',
                        sref: 'mindset.cashFlow'
                    }
                },
                controller: 'AreYourStuckController',
                templateUrl: 'pages/mindset/are-your-stuck/are-your-stuck.html'
            })
            .state('mindset.cashFlow', {
                url: '/cashFlow',
                params: {
                    prev: {
                        name: 'Are You Stuck?',
                        sref: 'mindset.areYourStuck'

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
                        name: 'Your SLAP Start Date',
                        sref: 'mindset.slapStartDate'
                    }
                },
                controller: 'StartSlapnController',
                templateUrl: 'pages/mindset/start-slapn/start-slapn.html'
            })
            .state('mindset.slapStartDate', {
                url: '/slapStartDate',
                params: {
                    prev: {
                        name: 'Start SLAP\'n!',
                        sref: 'mindset.startSlapn'

                    },
                    next: {
                        name: 'SLAPstatement Overview',
                        sref: 'statement.overview'
                    }
                },
                controller: 'SlapStartDateController',
                templateUrl: 'pages/mindset/slap-start-date/slap-start-date.html'
            });

    }
}());