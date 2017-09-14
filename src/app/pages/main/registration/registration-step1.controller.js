(function() {
    'use strict';

    angular
        .module('app.pages.main')
        .controller('RegistrationStep1Controller', RegistrationStep1Controller);

    /* @ngInject */
    function RegistrationStep1Controller(productsService,productStorage,toaster, pageService) {

        var vm = this;
        // TODO set pageservice for registration page1 2, 3
        vm.active = null;
        vm.plan= productStorage.getPlan();
        
        vm.timeList = ['1 group and 1 private sessions per month', '1 private session per month' ,'4 private session per month', '2 group  and 1 private session per month','teamSLAP - custom experience'];
        pageService.reset().setPageTitle(' Step1').addCrumb({name: 'Step1', path: 'signup/step1'});
        productsService.getPlans().then(function(response) {
            vm.plans = response.data;
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
                toaster.pop({type: 'error', body: 'Please select SLAP plan'});
                e.preventDefault();
            }

            return;
        }
    }
}());