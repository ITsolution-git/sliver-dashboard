(function () {
    'use strict';

    angular
        .module('app.pages.main')
        .controller('MainResetPasswordController', MainResetPasswordController);

    /* @ngInject */
    function MainResetPasswordController($scope, $stateParams, $auth, $state, toaster, pageService, userService) {

        // --- vars ---

        $scope.reset = {
            new_passw: ''
        };
        $scope.auth_key = $stateParams.auth_key;


        $scope.errors = {};

        // --- methods ---

        $scope.submit = function () {
            if($scope.reset.new_passw == ''){
                $scope.errors = {'new_passw':['New Password are empty!']};
            }else {
                userService.setPassword($scope.reset,$scope.auth_key).then(function (response) {
                    if(response.data[0].success && !response.data[0].errors){
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


        // --- init ---
        userService.check($scope.auth_key).then(function(response){
            if(!response.data[0].result){
                $state.go('login');
            }
        });
        if (!$scope.auth_key) {
            $state.go('login');
        }

        pageService.reset().addCrumb({name: 'Reset Password', path: 'reset_password'});

    }
})();