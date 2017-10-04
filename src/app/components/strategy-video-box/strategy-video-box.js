
(function () {
    'use strict';

    var strategyVideoBox = {
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        templateUrl: 'components/strategy-video-box/strategy-video-box.html',
        controller: function($scope, $state, stepService) {

            var $ctrl = this;

            $ctrl.$onInit = function () {
                $ctrl.strategy = angular.copy($ctrl.resolve.strategy);

            };

            $ctrl.ok = function () {
                $ctrl.close({$value: {action:'save', strategy: $ctrl.strategy}});
            };

            $ctrl.cancel = function () {
                $ctrl.dismiss({$value: 'cancel'});
            };

            $ctrl.goNextStrategy = function () {
                $ctrl.close({$value: {action:'saveAndNext', strategy: $ctrl.strategy}});
            }

            $ctrl.goPrevStrategy = function () {
                $ctrl.close({$value: {action:'saveAndPrev', strategy: $ctrl.strategy}});
            }
        }

    };

    angular
        .module('app.components')
        .component('strategyVideoBox', strategyVideoBox);
}());

