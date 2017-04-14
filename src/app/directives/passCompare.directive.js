(function() {
    'use strict';

    angular
        .module('app.directives')
        .directive('passCompare', passCompare);

    function passCompare() {
        return {
            require: "ngModel",
            scope: {
                pass: "=passCompare"
            },
            link: function(scope,el,attr,ngModel) {
                ngModel.$validators.passCompare = function(modelValue) {
                    return modelValue == scope.pass;
                };

                scope.$watch("pass", function() {
                    ngModel.$validate();
                });
            }
        }
    }
}());