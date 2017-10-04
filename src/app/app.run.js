(function () {
    'use strict';

    angular
        .module('app')
        .run(runApp);

    function runApp($rootScope, $timeout, $window, $state, $auth, pageService, CONFIG, userService, adminUserService) {
        $rootScope.isReady = false;
        $rootScope.dateFormat = "MM/DD/YYYY";

        $rootScope.setDocumentTitle = function (title) {
            $window.document.title = title;
        };

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toStateParams) {
            // set title page
            $timeout(function () {
                var portion = 'SLAPcenter | ';
                if(toState.data && toState.data.isAdminPage)
                    portion = 'SLAPadmin | ';
                $rootScope.setDocumentTitle(portion + pageService.h1);
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

        if ($auth.isAuthenticated()) {
            userService.loadUser().then(function (data) {
                $rootScope.isReady = true;
                $rootScope.user = data;
                $state.go(
                    _.get($rootScope, 'toState.name', 'home'),
                    _.get($rootScope, 'toStateParams')
                );
            });
        } else {

            $rootScope.isReady = true;
        }

    }

})();