(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('selectpicker', select);

    /* @ngInject */
    function select($timeout,$window) {
        // Usage:
        //
        // ```html
        // <select selectpicker></select>
        // or
        // <select selectpicker="{option:value}"></select>
        // ```
        // Creates:
        //
        return {
            restrict: 'AE',
            link: link
        };
        //return directive;

        function link($scope, $element, attrs) {
            var
                options = {
                    // noneSelectedText:'select a item',
                    mobile: /mobile/i.test($window.navigator.userAgent)
                },
                attOptions = attrs.selectpicker ? angular.fromJson(attrs.selectpicker) : {};

            function refresh(newVal) {
                $scope.$applyAsync(function () {
                    if (attrs.ngOptions && /track by/.test(attrs.ngOptions)) {
                        $element.val(newVal);
                    }
                    $element.selectpicker('refresh');
                });
            }

            if (attrs.ngModel) {
                $scope.$watch(attrs.ngModel, refresh, true);
            }

            if (attrs.ngDisabled) {
                $scope.$watch(attrs.ngDisabled, refresh, true);
            }

            $scope.$on('$destroy', function () {
                $timeout(function () {
                    $element.selectpicker('destroy');
                });
            });

            $scope.$watch(function() {
                $element.selectpicker('refresh');
            });

            $timeout(function () {

                $element.selectpicker(angular.extend(options, attOptions, $scope.selectpicker));
                $element.selectpicker('refresh');
            });
        }
    }

})();