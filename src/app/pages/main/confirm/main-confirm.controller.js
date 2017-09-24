(function () {
    'use strict';

    angular
        .module('app.pages.main')
        .controller('MainConfirmController', MainConfirmController);

    /* @ngInject */
    function MainConfirmController($scope, $stateParams, $auth, $state, toaster, pageService, userService) {

        // --- vars ---
        $scope.notifications = [];
        $scope.confirm = {
            password: '',
            repeat_passw: ''
        };
        $scope.auth_key = $stateParams.auth_key;

        $scope.stateGo = function () {
            $state.go('login');
        };

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
            if($scope.confirm.password == $scope.confirm.repeat_passw){
                if($scope.confirm.repeat_passw == '' || $scope.confirm.password == ''){
                    $scope.errors = {'repeat_passw':['Repeat Password are empty!'],'password':['Password are empty!']};
                }else {
                    userService.setPassword($scope.confirm, $scope.auth_key).then(function (response) {
                        if(response.data[0].result){
                            $state.go('login');
                            toaster.pop({type: 'success', body: "Successfully registered!"});
                        }else{
                            addNotification($scope.notifications, {name: 'Server Error!', type: 'error', message:'So sorry - something has gone wrong on our end.  Email support@smallbizsilverlining.com to finalize your Sign Up!', show: true});
                        }
                    });
                }
            }else{
                $scope.errors = {};
                toaster.pop({type: 'error', body: "Passwords do not match!"});
            }
        };

        // --- init ---
        // userService.check($scope.auth_key).then(function(response){
        //     if(!response.data.result){
        //         $state.go('login');
        //     }
        // });
        // if (!$scope.auth_key) {
        //     $state.go('login');
        // }
        pageService.reset().addCrumb({name: 'Create Password', path: 'confirm'});

    }
})();