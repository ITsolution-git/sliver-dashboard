(function () {
    'use strict';

    var slapFooter = {
        bindings: {},
        controller: function ($scope, footerService,$timeout,$rootScope,$state) {
            $timeout(function() {
                $scope.state = footerService._state;
            });

            $scope.next = function() {
                $state.go($scope.state.next.sref);
            };

            $scope.prev = function() {
                $state.go($scope.state.prev.sref);
            }
        },
        templateUrl: 'components/slap-footer/slap-footer.html'
    };

    angular
        .module('app.components')
        .component('slapFooter', slapFooter);
}());