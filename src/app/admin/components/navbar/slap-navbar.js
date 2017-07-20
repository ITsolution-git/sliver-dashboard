(function() {
    'use strict';

    var adminSlapNavbar = {
        bindings : {
        },
        controller : function($auth,$state,userService,$scope, $window) {
            var vm = this;
            vm.logout = function() {
                $auth.logout();
                $state.go('login');
            };

            vm.userService = userService;
            vm.isAuthenticated = false;

            userService.getUser().then(function (user) {
                 vm.user = user;
            });

            this.logout = function () {
                $auth.logout();
                $window.location.reload();
                $state.go('login');
            }
            $scope.$watch($auth.isAuthenticated, function(newValue) {
                vm.isAuthenticated = newValue;
            });
        },
        templateUrl : 'admin/components/navbar/slap-navbar.html'
    };

    angular
        .module('adminapp.components')
        .component('adminSlapNavbar', adminSlapNavbar);
}());