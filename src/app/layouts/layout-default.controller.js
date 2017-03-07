(function () {
    'use strict';

    angular
        .module('app')
        .controller('LayoutDefaultController', LayoutDefaultController);

    /* @ngInject */
    function LayoutDefaultController($scope, CONFIG, $auth, $state, pageService, userService) {
        $scope.static_url = CONFIG.url.static;
        // $scope.logo = CONFIG.url.static + '/images/logo-white.png';
        $scope.auth = $auth;
        $scope.breadcrumbs = pageService;
        $scope.config = CONFIG;
        $scope.state = $state;
        $scope.user = userService;
        $scope.reach = {};
        $scope.message = '';
        $scope.sidebarHide = null;

        $scope.closeMenu = function () {
            $scope.sidebarHide = 'sidebar-hide-lpanel';
        };
        $scope.sidebarHideOff = function () {
            $scope.sidebarHide = null;
        };

        var windowHeight = window.innerHeight;
        if (windowHeight < 768) {
            $scope.slimHeight = windowHeight - 120;
        } else {
            $scope.slimHeight = windowHeight - 50;
        }

        $scope.stateGo = function (state) {
            $state.go(state);
        };

        // Enable Bootstrap's popover function
        $(document).ready(function () {
            $('[data-toggle="popover"]').popover({
                placement: 'top',
                trigger: 'hover',
                html: true
            });
        });

    }
})();