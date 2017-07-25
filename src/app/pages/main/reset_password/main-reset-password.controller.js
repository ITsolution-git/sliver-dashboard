(function () {
    'use strict';

    angular
        .module('app.pages.main')
        .controller('MainResetPasswordController', MainResetPasswordController);

    /* @ngInject */
    function MainResetPasswordController($scope, $stateParams, $auth, $state, toaster, pageService, userService) {

        // --- vars ---

        $scope.reset = {
            new_password: ''
        };
        $scope.token = $stateParams.token;

        pageService.reset().setPageTitle('Reset Password').addCrumb({name: 'Reset Password', path: 'reset'});

        $scope.errors = {};

        // --- methods ---

        $scope.submit = function () {
            if($scope.reset.new_password == ''){
                $scope.errors = {'new_password':['New Password are empty!']};
            }else {
                userService.setPassword($scope.reset,$scope.token).then(function (response) {
                    if(response.data._id){
                        $state.go('login');
                        toaster.pop({type: 'success', body: "Password has been saved!"});
                    }else{
                        toaster.pop({type: 'error', body: "Server error!"});
                        $scope.errors = {};
                    }
                    $scope.errors.password = [response.data[0].error];
                });
            }
        };
    }
})();