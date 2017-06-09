(function () {
    'use strict';

    angular
        .module('app.pages.mindset')
        .controller('SlapStartDateController', SlapStartDateController);

    /* @ngInject */
    function SlapStartDateController($scope, $state, pageService, stepService, activeStep) {

        $scope.visible = true;

        var date = new Date();
        var currentMonth = (date.getMonth()+1).toString();
        var currentYear = date.getFullYear();

        angular.extend($scope, activeStep.model, {
            forward: true,
            sendData: sendData
        });

        if ($scope.data.year === null) {
            $scope.data.year = currentYear
        }

        if ($scope.data.month === null) {
            $scope.data.month = currentMonth
        }

            $scope.$watch('data.month', function (value) {
                if (value !== undefined) {
                    if (+value < +currentMonth) {
                        $scope.data.year = currentYear + 1;
                    } else {
                        $scope.data.year = currentYear;
                    }
                }
            });

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Your SLAP Start Date');

        function sendData(direction) {
            stepService.updateActiveModel($scope);
            stepService.setFinishActiveStep();

            var nextprevStep = stepService.getNextAndPrevStep();
            var urls = activeStep.sref.split('.');

            return stepService.sendApiData(urls[urls.length - 1], $scope.data)
                .then(function () {
                    if(direction == 'forward')  
				$state.go(nextprevStep.nextStep.sref); 
            else
				$state.go(nextprevStep.prevStep.sref);
                });
        }
    }

}());