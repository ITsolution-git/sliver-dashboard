(function () {
    'use strict';

    angular
        .module('adminapp')
        .run(runApp);

    function runApp($rootScope, $timeout, $window, $state, $auth, BCService, CONFIG, userService) {
        $rootScope.isReady = false;

        $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            // запоминаем, куда пытаемся перейти и с какими параметрами
            $rootScope.toState = toState;
            $rootScope.toStateParams = toStateParams;

            if (!$rootScope.isReady) {
                event.preventDefault();
                return false;
            }

            if (toState.data && toState.data.access) {
                /*Cancel going to the authenticated state and go back to landing*/
                if (toState.data.access == '@' && !$auth.isAuthenticated()) {
                    event.preventDefault();
                    return $state.go('login');
                }

                if (toState.data.access == '?' && $auth.isAuthenticated()) {
                    event.preventDefault();
                    return $state.go('home');
                }

                if (toState.data.access == 'admin' && !userService.isAdmin()) {
                    event.preventDefault();
                    return $state.go('home');
                }
            }
        });

        $rootScope.setDocumentTitle = function (title) {
            $window.document.title = CONFIG.title + ' | ' + title;
        };

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toStateParams) {
            // set title page
            $timeout(function () {
                $rootScope.setDocumentTitle(BCService.h1);
            });
        });

        $rootScope.$on('authUnauthorized', function () {
            $rootScope.isReady = true;
            if ($rootScope.toState.name == 'confirm' || $rootScope.toState.name == 'reset_password') {
                $state.go(
                    $rootScope.toState,
                    $rootScope.toStateParams
                );
            } else {
                $state.go('login');
            }
        });

        $rootScope.$on('authForbidden', function () {
            $state.go('home');
        });

        userService.loadUser().then(function (data) {
            $rootScope.isReady = true;
            // $state.go(
            //     _.get($rootScope, 'toState.name', 'home'),
            //     _.get($rootScope, 'toStateParams')
            // );
        });

    }

})();