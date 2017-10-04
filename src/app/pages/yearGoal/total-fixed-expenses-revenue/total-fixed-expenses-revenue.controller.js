(function () {
    'use strict';

    angular
        .module('app.pages.yearGoal')
        .controller('TotalFixedExpensesRevenueController', TotalFixedExpensesRevenueController);

    function TotalFixedExpensesRevenueController($scope, pageService, activeStep, stepService,$state) {
        $scope.videoUrl = activeStep.videoUrl;
        angular.extend($scope, activeStep.model,{
            forward: true,
            sendData: sendData,
            total: 0,
            model: {
                first: 'Dropdown Label'
            }
        });

        getData();
        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Year Goal');

        function getData() {
            // var urls = _.get($state.current, 'params.prev.sref').split('.');
            var url = 'fixedBusinessExpenses';

            // return stepService.getApiData(urls[urls.length - 1])
            return stepService.getApiData(url) //TODO: Think over the dynamics url
                .then(function (response) {
                    if (response && response.status === 200) {
                        // data.personalExpenses.sum hold totla president salary
                        $scope.total = (response.data.fixedBusinessExpenses.expensesSum + response.data.fixedBusinessExpenses.incidentals * 0.01 * response.data.fixedBusinessExpenses.expensesSum) * 12  + (+response.data.fixedBusinessExpenses.profit);
                    }
                });
        }

        function sendData(direction) {
            stepService.updateActiveModel($scope);
            stepService.setFinishActiveStep();

            var nextprevStep = stepService.getNextAndPrevStep();

            if(direction == 'forward')  
				$state.go(nextprevStep.nextStep.sref); 
            else if(direction == 'backward')
				$state.go(nextprevStep.prevStep.sref);
        }
    }
}());