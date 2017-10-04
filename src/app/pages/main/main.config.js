(function () {
    'use strict';

    angular
        .module('app.pages.main')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider) {

        $stateProvider
            .state('unauthorized', {
                parent: 'blank',
                url: '/unauthorized',
                views: {
                    content: {
                        controller: 'MainUnauthorizedController',
                        templateUrl: 'pages/main/unauthorized/main-unauthorized.html'
                    }
                }
            })
            .state('404', {
                parent: 'blank',
                url: '/404',
                views: {
                    content: {
                        controller: 'Main404Controller',
                        templateUrl: 'pages/main/404/main-404.html'
                    }
                }
            })
            .state('500', {
                parent: 'blank',
                url: '/500',
                views: {
                    content: {
                        controller: 'Main500Controller',
                        templateUrl: 'pages/main/500/main-500.html'
                    }
                }
            })
            .state('home', {
                data: {
                    access: '@'
                },
                parent: 'default',
                url: '/?refer',
                resolve: {
                    activeStep: function (stepService, $state) {
                        return stepService.resolveActiveStep(this)
                            .then(function (active) {
                                if (active) {
                                    return active;
                                }
                                return stepService.getLastFinished(true)
                                .then(function (finishedStep) {
                                    if (finishedStep.sref == 'welcome')
                                        return true;
                                    else
                                        $state.go(finishedStep.sref);
                                });
                            });
                    }
                },
                views: {
                    content: {
                        controller: 'MainIndexController',
                        templateUrl: 'pages/main/index/main-index.html'
                    }
                }
            })
            .state('login', {
                data: {
                    access: '?'
                },
                url: '/login?email',
                parent: 'withNavbarWithoutLinks',
                views: {
                    content: {
                        controller: 'MainLoginController',
                        templateUrl: 'pages/main/login/main-login.html'
                    }
                }
            })
            .state('signup', {
                abstract: true,
                url: '/',
                parent: 'registration',
                views: {
                    content: {
                        // controller: 'MainRegistrationController',
                        // templateUrl: 'pages/main/registration/main-registration.html'
                        template: '<ui-view/>'
                    }
                }
            })
            .state('step1', {
                data: {
                    access: '?'
                },
                url: '',
                parent: 'signup',
                controller: 'RegistrationStep1Controller as vm',
                templateUrl: 'pages/main/registration/registration-step1.html'
            })
            .state('step2', {
                data: {
                    access: '?'
                },
                url: 'buy',
                parent: 'signup',
                controller: 'RegistrationStep2Controller as vm',
                templateUrl: 'pages/main/registration/registration-step2.html'
            })
            .state('step3', {
                data: {
                    access: '?'
                },
                url: 'confirm',
                parent: 'signup',
                controller: 'RegistrationStep3Controller as vm',
                templateUrl: 'pages/main/registration/registration-step3.html'
            })
            // .state('welcome', {
            //     data: {
            //         access: '@'
            //     },
            //     params: {
            //         param1: 'welcome'
            //     },
            //     parent: 'one',
            //     url: '/welcome',
            //     resolve: {
            //         activeStep: function (stepService, $state) {
            //             return stepService.resolveActiveStep(this)
            //                 .then(function (active) {
            //                     if (active) {
            //                         return active;
            //                     }
            //                     return stepService.getLastFinished(true)
            //                     .then(function (finishedStep) {
            //                         if (finishedStep.sref == 'welcome')
            //                             return true;
            //                         else
            //                             $state.go(finishedStep.sref);
            //                     });
            //                 });
            //         }
            //     },
            //     views: {
            //         content: {
            //             controller: 'WelcomeController',
            //             templateUrl: 'pages/main/welcome/welcome-index.html'
            //         }
            //     }
            // })
            .state('confirm', {
                data: {
                    access: '?'
                },
                url: '/confirm/{auth_key}',
                parent: 'blank',
                views: {
                    content: {
                        controller: 'MainConfirmController',
                        templateUrl: 'pages/main/confirm/main-confirm.html'
                    }
                }
            })
            .state('reset', {
                data: {
                    access: '?'
                },
                url: '/password',
                parent: 'withNavbarWithoutLinks',
                views: {
                    content: {
                        controller: 'MainResetController',
                        templateUrl: 'pages/main/reset/main-reset.html'
                    }
                }
            })
            .state('reset_password', {
                data: {
                    access: '?'
                },
                url: '/reset/{token}',
                parent: 'withNavbarWithoutLinks',
                views: {
                    content: {
                        controller: 'MainResetPasswordController',
                        templateUrl: 'pages/main/reset_password/main-reset-password.html'
                    }
                }
            })
            .state('logout', {
                url: '/logout',
                controller: 'MainLogoutController'
            });

    }
})();