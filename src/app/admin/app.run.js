(function () {
    'use strict';

    angular
        .module('adminapp')
        .run(runApp);

    function runApp($rootScope, $timeout, $window, $state, $auth, BCService, CONFIG, userService) {
        $rootScope.isReady = false;


        $rootScope.setDocumentTitle = function (title) {
            $window.document.title = CONFIG.title + ' | ' + title;
        };

        // $rootScope.$on('$stateChangeSuccess', function (event, toState, toStateParams) {
        //     // set title page
        //     $timeout(function () {
        //         $rootScope.setDocumentTitle(BCService.h1);
        //     });
        // });
    }

})();