(function() {
    'use strict';

    angular
        .module('app.pages.main')
        .controller('RegistrationStep3Controller', RegistrationStep3Controller);

    /* @ngInject */
    function RegistrationStep3Controller($state,productStorage,toaster,$auth) {
        if(!productStorage.getPlan()) {
            $state.go('step1');
            return;
        }

        var vm = this;

        vm.plan = productStorage.getPlan();
        vm.build = productStorage.getBuild();

        vm.user = {
            planId: vm.plan._id,
            buildId:  vm.build ? vm.build._id : null
        };

        vm.calculateTodayPayment = productStorage.calculateTodayPayment();
        vm.calculateMonthlyPayment = productStorage.calculateMonthlyPayment();

        vm.signup = function(event,form) {
            event.preventDefault();

            if(form.$invalid) {
                toaster.pop({type: 'error', body: "Please check your details" });
                return;
            }

            $auth.signup(vm.user)
                .then(
                    function (response) {
                        if (response.data._id) {
                            vm.user.auth_key = response.data._id;
                            // toaster.pop({type: 'success', body: "Confirmation email was sent! Run to your inbox to check it out"});
                            toaster.pop({type: 'success', body: "Registered. Enter your login and password to enter the site"});
                            productStorage.resetStorage();
                            $state.go('login');
                        }
                        // $scope.errors = response.data.errors;
                    }
                )
                .catch( function(err) {
                    toaster.pop({type: 'error', body: err.data.message ? err.data.message : err.data.errmsg });
                });
        }
    }
}());