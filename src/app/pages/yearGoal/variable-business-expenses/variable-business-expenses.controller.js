(function () {
    'use strict';

    angular
        .module('app.pages.yearGoal')
        .controller('VariableBusinessExpensesController', VariableBusinessExpensesController);

    function VariableBusinessExpensesController($scope, pageService, activeStep, stepService,$state) {
        $scope.videoUrl = activeStep.videoUrl;
        angular.extend($scope, activeStep.model,{
            forward: true,
            sendData:sendData,
            model: {
                first: 'Dropdown Label'
            }
        });

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('1 Year Goal');

        function sendData(direction) {
            stepService.updateActiveModel($scope);
            stepService.setFinishActiveStep();

            var nextprevStep = stepService.getNextAndPrevStep();

            if(direction == 'forward')  
				$state.go(nextprevStep.nextStep.sref); 
            else if(direction == 'backward')
				$state.go(nextprevStep.prevStep.sref);
        }
        $scope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            sendData();
        });
    }
}());