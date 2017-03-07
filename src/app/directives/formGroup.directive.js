(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('formGroup', formGroup);

    /* @ngInject */
    function formGroup($rootScope, $timeout, $filter) {
        return {
            restrict: 'AE',
            require: '^form',
            transclude: true,
            replace: true,
            link: link,
            template: template,
            scope: {
                validate: '='
            }
        };

        function link($scope, element, attrs, ctrl) {
            var input = attrs.field;

            $scope.input = input;
            $scope.label = attrs.label;

            $scope.error = $filter('value')($scope,'validate.'+input);//$scope.errors[input];
            $scope.$watch('validate', function (value) {
                $scope.error = $filter('value')($scope,'validate.'+input);//$scope.errors[input]
            });
        }

        function template($element, attrs) {
            if ((attrs.horizontal && angular.fromJson(attrs.horizontal) == true) || (attrs.horizontal === undefined && $element.closest('form').hasClass('form-horizontal'))) {
                return '<div class="form-group" ng-class="{\'has-error\':error}">' +
                    '<label class="control-label col-sm-3" for="{{input}}">{{label}}</label>' +
                    '<div class="col-sm-7">' +
                    '<div ng-transclude></div>' +
                    '<div class="help-block help-block-error" ng-show="error" ng-bind-html="error | joinBr"></div>' +
                    '</div>' +
                    '</div>';
            } else {
                return '<div class="form-group" ng-class="{\'has-error\':error}">' +
                    '<label class="control-label" for="{{input}}">{{label}}</label>' +
                    '<div ng-transclude></div>' +
                    '<div class="help-block help-block-error" ng-show="error" ng-bind-html="error | joinBr"></div>' +
                    '</div>';
            }
        }
    }

})();