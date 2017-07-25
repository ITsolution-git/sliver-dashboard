(function () {
    'use strict';

    angular
        .module('app.pages.main')
        .controller('MainResetController', MainResetController);

    /* @ngInject */
    function MainResetController($scope, $window, $auth, $state, toaster, pageService, userService) {

        // --- vars ---

        $scope.email = '';

        $scope.errors = {};

        // --- methods ---
        pageService.reset().setPageTitle(' Request Password Reset Confirmation').addCrumb({name: 'Request Password Reset Confirmation', path: 'reset-password'});
        $scope.back = function () {
            $window.history.back();
        };

        $scope.submit = function () {
            userService.reset($scope.email)
                .then(
                    function (response) {
                        toaster.pop({type: 'success', body: response.data.message ? response.data.message : "Confirm email was sent!"});
                        $state.go('login');
                    }
                )
                .catch(function(err) {
                    toaster.pop({type: 'error', body: "User is not found or Failed to send email!"});
                });
        };

        // --- init ---


    }
})();