(function() {
    'use strict';

    angular
        .module('app.pages.main')
        .controller('RegistrationStep1Controller', RegistrationStep1Controller);

    /* @ngInject */
    function RegistrationStep1Controller(productsService,productStorage,toaster) {
        var vm = this;

        vm.active = null;
        vm.plan= productStorage.getPlan();
        
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