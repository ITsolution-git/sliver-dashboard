(function() {
    'use strict';

    angular
        .module('app.pages.main')
        .controller('RegistrationStep1Controller', RegistrationStep1Controller);

    /* @ngInject */
    function RegistrationStep1Controller($scope, productsService,productStorage,toaster, pageService) {

        var vm = this;
        // TODO set pageservice for registration page1 2, 3
        vm.active = null;
        
        vm.timeList = ['1 group session per month', '1 private session per month' ,'4 private sessions per month', '2 group  and 1 private sessions per month','custom experience'];
        pageService.reset().setPageTitle(' Step1').addCrumb({name: 'Step1', path: 'signup/step1'});
        productsService.getPlans().then(function(response) {

            vm.plans = response.data;

            function deletePlan(dataPlans) {
                dataPlans.shift();
            }

            deletePlan(vm.plans);

            vm.plansBasic = vm.plans.slice(0,3);
            vm.plansTop = vm.plans.slice(3);


            if (productStorage.isRenew()) {
                vm.isRenew = true;

                vm.user = productStorage.getUser();
                vm.plan = vm.plans.filter(function (o) {
                    return o._id === vm.user.planId;
                })[0];
                productStorage.setPlan(vm.plan);
                vm.user.planDate = new Date();

            }
            
        });   
        
        vm.choosePlan = function(plan,event) {
            vm.plan = null;
            productStorage.setPlan(plan);

            if(vm.active) {
                vm.active.removeClass('rectangle-active');
            }

            vm.active = $(event.target).closest('.rectangle');
            vm.active.addClass('rectangle-active');
        };

        vm.nextStep = function(e) {
            if(!productStorage.getPlan()) {
                toaster.pop({type: 'error', body: 'You cannot move forward until you select your monthly plan.', timeout: 2000});
                e.preventDefault();
            }

            return;
        };

        vm.showPlans = true;
        vm.togglePlans = function () {
            vm.showPlans = !vm.showPlans;
            $scope.$emit("togglePlans")
        };

        vm.getPlans = function () {
            if(vm.showPlans){
                vm.titlePlans = 'Top plans';
                vm.iconPlan = '+';
                return vm.plansBasic;
            } else {
                vm.titlePlans = 'Basic plans';
                vm.iconPlan = '←';
                return vm.plansTop;
            }
        }

    }
}());