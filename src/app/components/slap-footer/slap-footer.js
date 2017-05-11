(function () {
    'use strict';

    var slapFooter = {
        bindings: {
            send: '&',
            forward: '='
        },
        controller: function (footerService, $timeout, $rootScope, $state) {
            var vm = this;

            $timeout(function () {
                vm.state = footerService._state;
            });

            vm.next = function () {
                if (vm.forward) {
                    vm.send().then(function (response) {
                        $state.go(vm.state.next.sref);
                        $timeout(scrollTop);
                    });
                    return;
                }

                $state.go(vm.state.next.sref);
                $timeout(scrollTop);
            };

            vm.prev = function () {
                $state.go(vm.state.prev.sref);
                $timeout(scrollTop);
            };

            function scrollTop() {
                var body = $("body, html");
                body.animate({scrollTop: 0}, 400);
            }
        },
        templateUrl: 'components/slap-footer/slap-footer.html'
    };

    angular
        .module('app.components')
        .component('slapFooter', slapFooter);
}());