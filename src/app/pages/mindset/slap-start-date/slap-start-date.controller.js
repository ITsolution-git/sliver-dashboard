(function () {
    'use strict';

    angular
        .module('app.pages.mindset')
        .controller('SlapStartDateController', SlapStartDateController);

    /* @ngInject */
    function SlapStartDateController($scope) {

        $scope.visible = true;

        var date = new Date();
        var currentMonth = date.getMonth().toString();
        var currentYear = date.getFullYear();

        angular.extend($scope, {
            model: {
                year: currentYear,
                month: currentMonth
            },
            showVideoBlock: false,
            showStaticTextBlock: false,
            showStartDate: false
        });

        $scope.$watch('model.month', function (value) {
            if (value !== undefined) {
                if (+value < +currentMonth) {
                    $scope.model.year += 1;
                } else {
                    $scope.model.year = currentYear;
                }
            }
        });
    }

}());