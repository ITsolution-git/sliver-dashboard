(function() {
    'use strict';

    angular
        .module('adminapp.pages.main')
        .controller('AdminMainLoginController', AdminMainLoginController);

    AdminMainLoginController.$inject = ['$auth','toaster','userService', 'adminUserService', '$state'];

    function AdminMainLoginController($auth,toaster, userService, adminUserService,$state) {
        var vm = this;
        vm.login = {
            email : '',
            password : ''
        };

        vm.errors = {};

        vm.submit = function() {
            $auth.login(vm.login)
                .then(
                    function(response) {
                        toaster.pop({type: 'success', body: 'Welcome!', timeout: 1000});

                        // update user data
                        userService.loadUser(true)
                            .then(function () {
                                $state.go('admin.home');
                            });
                    }
                )
                .catch(function(err) {
                    toaster.pop({type: 'error', body: err.data ? err.data.message : 'Whoops, your password or email are incorrect'});
                });
        }
    }
}());
