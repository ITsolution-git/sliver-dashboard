(function () {
    'use strict';

    var popupDate = {
        require: {
            ngModel: '^ngModel'
        },
        bindings: {
            label: '@',
        },
        controller: function ($scope) {
            var vm = this;

            vm.options = {
                showWeeks: false,
                popupPlacement: 'bottom-left',
                closeText: 'Close'
            };

            vm.open = function () {
                vm.popup.opened = true;
            };

            vm.popup = {
                opened: false
            };

            vm.$onInit = function () {
                vm.ngModel.$render = function () {
                    vm.dt = vm.ngModel.$viewValue;
                };

                $scope.$watch(function () {
                    return vm.dt;
                }, function (value) {
                    if (vm.ngModel) {
                        vm.ngModel.$setViewValue(value);
                    }
                });
            };
        },
        templateUrl: 'admin/components/popupDate/popup-date.html'
    };

    angular
        .module('adminapp.components')
        .component('popupDate', popupDate);
}());