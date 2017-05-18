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
                    vm.send();  //TODO: forward true, validation absent sccroll top
                }
            };

            vm.prev = function () {
                $state.go(vm.state.prevStep.sref);
                // $timeout(scrollTop);
            };

            // function scrollTop() {
            //     var body = $("body, html");
            //     body.animate({scrollTop: 0}, 400);
            // }
        },
        templateUrl: 'components/slap-footer/slap-footer.html'
    };

    angular
        .module('app.components')
        .component('slapFooter', slapFooter);
}());