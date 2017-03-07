(function () {
    'use strict';

    angular
        .module('app.pages.main')
        .controller('MainRegistrationController', MainRegistrationController);

    /* @ngInject */
    function MainRegistrationController($scope, $auth, $state, $stateParams, toaster, pageService, userService) {

        // --- vars ---

        $scope.signup = {
            password: '',
            repeat_passw: '',
            full_name: '',
            email: $stateParams.email,
            auth_key: '',
            coupon: $stateParams.coupon,
            company: $stateParams.company,
            refer: $stateParams.refer
        };
        $scope.errors = {};

        // --- methods ---
        $scope.submit = function () {
            if ($scope.signup.password == $scope.signup.repeat_passw) {
                if ($scope.signup.repeat_passw == '' || $scope.signup.password == '') {
                    $scope.errors = {
                        'repeat_passw': ['Repeat password is empty!'],
                        'password': ['Password is empty!']
                    };
                } else {
                    $auth.signup($scope.signup).then(
                        function (response) {
                            if (response.data.result) {
                                $scope.signup.auth_key = response.data.auth_key;
                                toaster.pop({type: 'success', body: "Confirmation email was sent! Run to your inbox to check it out"});
                                $scope.signHide = false;
                                $state.go('login');
                            }
                            $scope.errors = response.data.errors;
                        }
                    );
                }
            } else {
                $scope.errors = {
                    'repeat_passw': ['Repeat password is wrong!']
                };
            }
        };

        $scope.authenticate = function (social) {
            $auth.authenticate(social).then(function (response) {
                if (response.data.result) {
                    toaster.pop({type: 'success', body: "Welcome!"});
                    // update user data
                    userService.loadUser(true).then(function () {
                        $state.go('home');
                    });
                } else {
                    toaster.pop({type: 'error', body: "Authorization error"});
                }
            })
                .catch(function (response) {
                    toaster.pop({type: 'error', body: "Authorization error"});
                });
        };

        // --- init ---

        pageService.reset().setPageTitle(' Sign up').addCrumb({name: 'Sign up', path: 'signup'});

    }
})();