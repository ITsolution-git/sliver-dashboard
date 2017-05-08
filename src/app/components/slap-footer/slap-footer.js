(function () {
    'use strict';

    var slapFooter = {
        bindings: {},
        controller: function ($scope, footerService, $timeout, $rootScope, $state) {
            $timeout(function () {
                $scope.state = footerService._state;
            });

            $scope.next = function () {
                $state.go($scope.state.next.sref);
                $timeout(scrollTop);
            };

            $scope.prev = function () {
                $state.go($scope.state.prev.sref);
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