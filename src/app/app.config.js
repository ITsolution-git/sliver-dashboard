(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    /* @ngInject */
    function config($stateProvider, $urlRouterProvider, $authProvider, cfpLoadingBarProvider, CONFIG,$compileProvider, $mdThemingProvider, RestangularProvider, $locationProvider) {
        RestangularProvider.setRestangularFields({
            id: "_id"
        });

        $stateProvider
        // app blank layout
            .state('blank', {
                abstract: true,
                controller: 'LayoutBlankController',
                templateUrl: 'layouts/layout-blank.html'
            })
            .state('registration', {
                abstract: true,
                controller: 'LayoutRegistrationController',
                templateUrl: 'layouts/layout-registration.html'
            })

            // app default layout
            .state('default', {
                data: {
                    permissions: {
                        only: 'canBuild',
                        redirectTo: 'admin.home'
                    }
                },
                abstract: true,
                parent: 'blank',
                views: {
                    content: {
                        controller: 'LayoutDefaultController',
                        templateUrl: 'layouts/layout-default.html'
                    }
                }

            })
            .state('one', {
                data: {
                    permissions: {
                        only: 'canBuild',
                        redirectTo: 'admin.home'
                    }
                },
                abstract:true,
                parent:'blank',
                views: {
                    content: {
                        controller: 'LayoutOneController',
                        template: '<div ui-view="content"></div>'
                    }
                }
            })
            .state('withNavbar', {
                data: {
                    permissions: {
                        only: 'canBuild',
                        redirectTo: 'home'
                    }
                },
                abstract:true,
                parent:'blank',
                views: {
                    content: {
                        controller: 'LayoutWithNavbarController',
                        template: '<slap-header></slap-header><div class="slap-container" ui-view="content"></div>'
                    }
                }
            })
            .state('withNavbarWithoutLinks', {
                parent:'blank',
                views: {
                    content: {
                        controller: 'LayoutNavbarWithoutLinksController',
                        template: '<slap-header-without-links></slap-header-without-links><div class="slap-container" ui-view="content"></div>'
                    }
                }
            })
            .state('admin', {
                data: {
                    access: 'admin',
                    permissions: {
                        only: 'canAdmin',
                        redirectTo: 'home'
                    }
                },
                abstract:true,
                url : '/admin',
                parent:'blank',
                views : {
                    content : {
                        controller : 'AdminLayoutDefaultController',
                        templateUrl : 'admin/layouts/layout-default.html'
                    }
                }
            });

        // set default routes when no path specified
        $urlRouterProvider.when('', '/');
        //$urlRouterProvider.when('/', '/main/index');

        // always goto 404 if route not found
        //$urlRouterProvider.otherwise('/');

        $urlRouterProvider.otherwise( function($injector) {
            var $state = $injector.get("$state");
            $state.go('/404');
        });

        

        // $urlRouterProvider.otherwise('/404');

        $compileProvider.debugInfoEnabled(true);  // in production false

        // loading bar config
        cfpLoadingBarProvider.includeSpinner = false;

        // auth config
        $authProvider.httpInterceptor = function () {
            return true;
        };
        // $authProvider.tokenPrefix = '_';
        $authProvider.loginUrl = CONFIG.api + '/v1/auth';
        $authProvider.signupUrl = CONFIG.api + '/v1/auth/signup';
        $authProvider.tokenRoot = 'data';//compensates success response macro
        $authProvider.withCredentials = false;
        $authProvider.baseUrl = '/';
        $authProvider.unlinkUrl = CONFIG.api + '/auth/unlink/';
        $authProvider.tokenName = 'token';
        $authProvider.tokenPrefix = 'satellizer';
        $authProvider.tokenHeader = 'Authorization';
        $authProvider.tokenType = 'Bearer';
        $authProvider.storageType = 'localStorage';


        // Extend the red theme with a different color and make the contrast color black instead of white.
        // For example: raised button text will be black instead of white.
        var slapTheme = $mdThemingProvider.extendPalette('light-blue', {
        });

        // Register the new color palette map with the name <code>neonRed</code>
        $mdThemingProvider.definePalette('slapTheme', slapTheme);

        // Use that theme for the primary intentions
        $mdThemingProvider.theme('default')
        .primaryPalette('slapTheme');

$locationProvider.hashPrefix('');
        $locationProvider.html5Mode({ enabled: true, requireBase: false });

    }
})();
