(function () {
    'use strict';

    var slapFooter = {
        bindings: {
            send: '&',
            forward: '='
        },
        controller: function (stepService, $timeout, $rootScope, $state) {
            var vm = this;

            vm.state = stepService.getNextAndPrevStep();

            vm.next = function () {
                if (vm.forward) {
                    vm.send()('forward');  //TODO: forward true, validation absent sccroll top
                } else {
                    $('body').animate({
                        scrollTop: $("slap-notifications").offset().top
                    }, 400);
                }
            };

            vm.prev = function () {
                if (vm.forward) {
                    vm.send()('backward');
                } else {
                    $('body').animate({
                        scrollTop: $("slap-notifications").offset().top
                    }, 400);
                }
                // $timeout(scrollTop);
            };

        },
        templateUrl: 'components/slap-footer/slap-footer.html'
    };

    angular
        .module('app.components')
        .component('slapFooter', slapFooter);
}());