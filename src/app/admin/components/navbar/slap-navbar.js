(function() {
    'use strict';

    var slapNavbar = {
        bindings : {
        },
        controller : function($auth,$state,userService,$scope) {
            var vm = this;
            vm.logout = function() {
                $auth.logout();
                $state.go('login');
            };

            vm.userService = userService;
            vm.isAuthenticated = false;

            $scope.$watch($auth.isAuthenticated, function(newValue) {
                vm.isAuthenticated = newValue;
            });
        },
        templateUrl : 'admin/components/navbar/slap-navbar.html'
    };

    angular
        .module('adminapp.components')
        .component('slapNavbar', slapNavbar);
}());