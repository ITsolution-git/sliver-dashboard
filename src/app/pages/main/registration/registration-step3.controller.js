(function() {
    'use strict';

    angular
        .module('app.pages.main')
        .controller('RegistrationStep3Controller', RegistrationStep3Controller);

    /* @ngInject */
    function RegistrationStep3Controller($state, $window ,productStorage,toaster,$auth,couponService, pageService, userService) {
        pageService.reset().setPageTitle(' Step3').addCrumb({name: 'Step3', path: 'signup/step3'});
        if(!productStorage.getPlan()) {
            $state.go('step1');
            return;
        }

        var vm = this;
        vm.isRenew = false;

        vm.plan = productStorage.getPlan();
        vm.build = productStorage.getBuild();

        // For TEST Purpose
        // vm.plan = JSON.parse('{"_id":"58f4edb72fbe2a27060c8d9b","billingFrequency":12,"typeProduct":1,"buildType":1,"status":1,"productName":"seriousSLAP","productDescription":"seriousSLAP description","costProduct":400,"__v":0,"createdAt":"2017-04-17T16:17:21.556Z","amountFirstPayment":0,"expertHours":100,"reqParams":null,"restangularized":true,"fromServer":true,"parentResource":{"route":"plans","parentResource":{"route":"products","parentResource":null}},"restangularCollection":false,"$$hashKey":"object:11"}');
        // vm.build = JSON.parse('"{"_id":"58f4ee3c2fbe2a27060c8d9f","billingFrequency":12,"typeProduct":2,"buildType":1,"status":1,"productName":"Installments","productDescription":"installments description","costProduct":200,"__v":0,"createdAt":"2017-04-17T16:17:21.556Z","amountFirstPayment":500,"expertHours":200,"reqParams":null,"restangularized":true,"fromServer":true,"parentResource":{"route":"builds","parentResource":{"route":"products","parentResource":null}},"restangularCollection":false,"$$hashKey":"object:33"}"');
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
                            toaster.pop({type: 'success', body: "Registration completed successfully, Welcome!"});
                            //productStorage.resetStorage();
                            $auth.login({
                                email: vm.user.email,
                                password: vm.user.password
                            })
                            .then(
                                function (response) {
                                    userService.loadUser(true).then(function (user) {
                                            $state.go('home');
                                    });

                                }
                            )
                            
                        }
                        
                        if (response.data.token) {
                            $auth.setToken(response.data.token);
                            $state.go('home');
                            document.location.reload(true);
                            return;
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

        vm.openTOS = function (e) {
          e.preventDefault();
          var url = $state.href('tos')
          window.open(url, '_blank');
        }
    }
}());
