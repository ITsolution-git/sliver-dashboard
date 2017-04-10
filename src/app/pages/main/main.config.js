(function () {
    'use strict';

    angular
        .module('app.pages.main')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider) {

        $stateProvider
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
                parent: 'blank',
                views: {
                    content: {
                        controller: 'MainLoginController',
                        templateUrl: 'pages/main/login/main-login.html'
                    }
                }
            })
            .state('signup', {
                abstract: true,
                data: {
                    access: '?'
                },
                url: '/signup',
                parent: 'blank',
                views: {
                    content: {
                        // controller: 'MainRegistrationController',
                        // templateUrl: 'pages/main/registration/main-registration.html'
                        template: '<ui-view/>'
                    }
                }
            })
            .state('signup.step1', {
                url: '',
                templateUrl: 'pages/main/registration/main-registration.html'
            })
            .state('signup.step2', {
                url: '/step2',
                templateUrl: 'pages/main/registration/registration-step2.html'
            })
            .state('signup.step3', {
                url: '/step3',
                templateUrl: 'pages/main/registration/registration-step3.html'
            })
            .state('profile', {
                data: {
                    access: '@'
                },
                parent: 'default',
                url: '/profile',
                views: {
                    content: {
                        controller: 'ClientsEditController',
                        templateUrl: 'pages/clients/edit/client-edit.html'
                    }
                }
            })
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
                url: '/reset',
                parent: 'blank',
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
                parent: 'blank',
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