(function() {
    'use strict';

    angular
        .module('app.pages.main')
        .controller('RegistrationStep3Controller', RegistrationStep3Controller);

    /* @ngInject */
    function RegistrationStep3Controller($state,productStorage,toaster,$auth,couponService) {
        if(!productStorage.getPlan()) {
            $state.go('step1');
            return;
        }

        var vm = this;
        vm.isRenew = false;
        
        vm.plan = productStorage.getPlan();
        vm.build = productStorage.getBuild();
        if (productStorage.isRenew()){
            vm.isRenew = true;
            vm.user = productStorage.getUser();
            vm.user.planId = vm.plan._id;
            vm.user.planDate = new Date();
            vm.user.buildId = vm.build ? vm.build._id : null;
            vm.user.build_date = vm.build ? new Date() : null;
            vm.user.code = null;
        } else
            vm.user = {
                planId: vm.plan._id,
                plan_date: new Date(),
                buildId:  vm.build ? vm.build._id : null,
                build_date: vm.build ? new Date() : null,
                code: null
            };
        
        vm.useCoupon = false;

        vm.calculateTodayPayment = productStorage.calculateTodayPayment();
        vm.calculateMonthlyPayment = productStorage.calculateMonthlyPayment();

        vm.signup = signup;
        vm.apply = apply;

        //////////////////

        function signup(event,form) {
            event.preventDefault();
            
            if(!vm.isRenew && form.$invalid) {
                toaster.pop({type: 'error', body: "Please check your details" });
                return;
            }
            vm.user.isRenew = vm.isRenew;
            vm.user.renewFrom = productStorage.getRenewFrom();
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

        function apply() {
            if(vm.useCoupon) {
                return;
            }

            couponService.validCoupon(vm.user.code,vm.plan._id)
                .then(function(response) {
                    productStorage.setCoupon(response.data);
                    vm.calculateTodayPayment = productStorage.calculateTodayPayment();
                    vm.calculateMonthlyPayment = productStorage.calculateMonthlyPayment();
                    vm.useCoupon = true;
                    toaster.pop({type:'success',body: 'Your promo code is valid and applied successfully'});
                })
                .catch(function(err) {
                    toaster.pop({type:'error',body: err.data.message});
                });
        }
    }
}());