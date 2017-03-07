(function () {
    'use strict';

    angular
        .module('app.pages.main')
        .controller('MainLoginController', MainLoginController);

    /* @ngInject */
    function MainLoginController($stateParams, $scope, $auth, $state, toaster, pageService, userService) {

        // --- vars ---
        $scope.login = {
            email: $stateParams.email ? $stateParams.email : '',
            password: ''
        };
        // cartService.onLogin();
        $scope.errors = {};

        // --- methods ---

        $scope.submit = function () {
            $auth.login($scope.login).then(
                function (response) {
                    if (response.data.result) {
                        toaster.pop({type: 'success', body: "Welcome!"});

                        // update user data
                        userService.loadUser(true).then(function () {
                            $state.go('home');
                        });
                    } else {
                        toaster.pop({type: 'error', body: response.data.errors ? response.data.errors : 'Whoops, your password or email are incorrect'});
                    }
                    $scope.errors = response.data.errors;
                }
            );
        };

        $scope.authenticate = function(provider) {
            $auth.authenticate(provider)
                .then(function(response) {
                    console.log(response);
                    toastr.success('You have successfully signed in with ' + provider + '!');
                    userService.loadUser(true).then(function () {
                        $state.go('home');
                    });
                })
                .catch(function(error) {
                    if (error.error) {
                        // Popup error - invalid redirect_uri, pressed cancel button, etc.
                        toastr.error(error.error);
                    } else if (error.data) {
                        // HTTP response error from server
                        toastr.error(error.data.message, error.status);
                    } else {
                        toastr.error(error);
                    }
                });
        };

        // --- init ---

        pageService.reset().setPageTitle(' Login').addCrumb({name: 'Login', path: 'login'});

    }
})();