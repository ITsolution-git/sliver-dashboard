(function () {
    'use strict';

    angular
        .module('app.pages.main')
        .controller('MainResetController', MainResetController);

    /* @ngInject */
    function MainResetController($scope, $window, $auth, $state, toaster, pageService, userService) {

        // --- vars ---
        $scope.notifications = [];
        $scope.email = '';

        $scope.errors = {};

        // --- methods ---
        pageService.reset().setPageTitle(' Request Password Reset Confirmation').addCrumb({name: 'Request Password Reset Confirmation', path: 'reset-password'});
        $scope.back = function () {
            $window.history.back();
        };

        function addNotification(notifications, newNotification) {
            var existing = _.find(notifications, {name: newNotification.name});
            if (_.isUndefined(existing)) {
                notifications.push(newNotification);
            } else {
                existing.show = true;
            }
            
        }

        $scope.submit = function () {
            userService.reset($scope.email)
                .then(
                    function (response) {
                        toaster.pop({type: 'success', body: response.data.message ? response.data.message : "Check your email to set up your new Password.", timeout: 3000});
                        $state.go('login');
                    }
                )
                .catch(function(err) {
                    addNotification($scope.notifications, {name: 'Server error!', type: 'error', message:'This is not working. Please email support@smallbizsilverlining.com for VIP support.', show: true});
                });
        };

        // --- init ---


    }
})();
