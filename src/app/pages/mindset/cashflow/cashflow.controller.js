(function () {
    'use strict';

    angular
        .module('app.pages.mindset')
        .controller('CashFlowController', CashFlowController);

    /* @ngInject */
    function CashFlowController($scope, pageService, activeStep, stepService,$state) {

        angular.extend($scope, activeStep.model, {
            forward: true,
            sendData: sendData
        });

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Cashflow Capacity Catch 22');

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