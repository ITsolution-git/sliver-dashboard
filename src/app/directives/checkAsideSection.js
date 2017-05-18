(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('checkAsideSection', checkAsideSection);

    function checkAsideSection(stepService) {
        return {
            restrict: 'A',
            scope: {
                stepsGroup: "=checkAsideSection",
                checkSection: "="
            },
            link: function (scope) {
                scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams, options) {
                    if (stepService.checkStepsIsFinishedSection(scope.stepsGroup, fromState.name)) {
                        scope.checkSection = true;
                    }
                });
            }
        }
    }
}());
