(function () {
    'use strict';

    angular
        .module('app.pages.main')
        .controller('MainResetPasswordController', MainResetPasswordController);

    /* @ngInject */
    function MainResetPasswordController($scope, $stateParams, $auth, $state, toaster, pageService, userService) {

        // --- vars ---
        $scope.notifications = [];
        $scope.reset = {
            new_password: ''
        };
        $scope.token = $stateParams.token;

        pageService.reset().setPageTitle('Reset Password').addCrumb({name: 'Reset Password', path: 'reset'});

        $scope.errors = {};

        // --- methods ---

        function addNotification(notifications, newNotification) {
            var existing = _.find(notifications, {name: newNotification.name});
            if (_.isUndefined(existing)) {
                notifications.push(newNotification);
            } else {
                existing.show = true;
            }
            
        }

        $scope.submit = function () {
            if($scope.reset.new_password == ''){
                $scope.errors = {'new_password':['New Password are empty!']};
            }else {
                userService.setPassword($scope.reset,$scope.token).then(function (response) {
                    if(response.data._id){
                        $state.go('login');
                        toaster.pop({type: 'success', body: "Password has been saved!", timeout: 3000});
                    }else{
                        addNotification($scope.notifications, {name: 'Server error!', type: 'error', message:'This is not working. Please email support@smallbizsilverlining.com for VIP support.', show: true});
                        
                        $scope.errors = {};
                    }
                    $scope.errors.password = [response.data[0].error];

                }).catch( function (res) {
                    toaster.pop({type: 'error', body: res.data.message, timeout: 3000});
                })
            }
        };
    }
})();