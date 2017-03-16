(function () {
    'use strict';

    angular
        .module('app.pages.main')
        .controller('MainRegistrationController', MainRegistrationController);

    /* @ngInject */
    function MainRegistrationController($scope, $auth, $state, toaster, pageService, userService) {

        // --- vars ---

        $scope.signup = {
            password: '',
            confirmPassword: '',
            name: '',
            email: '',
            auth_key: '',
            card : {
                "number": '4242424242424242',
                "exp_month": 12,
                "exp_year": 2018,
                "cvc": '123'
            }
        };
        
        $scope.errors = {};
        $scope.signHide = true;
        $scope.showMessage = false;

        // --- methods ---
        $scope.submit = function () {
            if ($scope.signup.password == $scope.signup.confirmPassword) {
                if ($scope.signup.confirmPassword == '' || $scope.signup.password == '') {
                    $scope.errors = {
                        'confirmPassword': ['Repeat password is empty!'],
                        'password': ['Password is empty!']
                    };
                } else {
                    $auth.signup($scope.signup)
                        .then(
                            function (response) {
                                if (response.data._id) {
                                    $scope.signup.auth_key = response.data._id;
                                    // toaster.pop({type: 'success', body: "Confirmation email was sent! Run to your inbox to check it out"});
                                    toaster.pop({type: 'success', body: "Registered. Enter your login and password to enter the site"});
                                    $scope.signHide = false;
                                    $state.go('login');
                                }
                                // $scope.errors = response.data.errors;
                            }
                        )
                        .catch( function(err) {
                            toaster.pop({type: 'error', body: err.data.message ? err.data.message : err.data.errmsg });
                        });
                }
            } else {
                $scope.errors = {
                    'confirmPassword': ['Repeat password is wrong!']
                };
            }
        };

        pageService.reset().setPageTitle(' Sign up').addCrumb({name: 'Sign up', path: 'signup'});

    }
})();