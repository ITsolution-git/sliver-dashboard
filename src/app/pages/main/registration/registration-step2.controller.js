(function() {
    'use strict';

    angular
        .module('app.pages.main')
        .controller('RegistrationStep2Controller', RegistrationStep2Controller);

    /* @ngInject */
    function RegistrationStep2Controller(productsService,productStorage,$state) {

        if(!productStorage.getPlan()) {
            $state.go('step1');
        }

        var vm = this;
        vm.active = null;
        vm.build = productStorage.getBuild();

        productsService.getBuilds().then(function(response) {
            vm.builds = response.data;
        });

        vm.calculateFullCost = function(build) {
            return productStorage.calculateFullCostBuild(build);
        };

        vm.chooseBuild = function(build,event) {
            if(productStorage.getBuild() && productStorage.getBuild()._id == build._id) {
                $(event.target).closest('.rectangle').removeClass('rectangle-active');
                productStorage.setBuild(null);
                vm.active = null;
                return;
            }

            vm.build = null;
            productStorage.setBuild(build);

            if(vm.active) {
                vm.active.removeClass('rectangle-active');
            }

            vm.active = $(event.target).closest('.rectangle');
            vm.active.addClass('rectangle-active');
        }
    }
}());