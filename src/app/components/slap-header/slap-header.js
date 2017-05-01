(function () {
    'use strict';

    var slapHeader = {
        binding: {},
        controller: function ($auth, $state, userService) {
            var vm = this;

            userService.getUser().then(function (user) {
                 vm.user = user;
            });

            this.logout = function () {
                $auth.logout();
                $state.go('login');
            }
        },
        templateUrl: 'components/slap-header/slap-header.html'
    };

    angular
        .module('app.components')
        .component('slapHeader', slapHeader);
}());