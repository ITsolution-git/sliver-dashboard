(function () {
    'use strict';

    angular
        .module('app.pages.mindset')
        .controller('StartSlapnController', StartSlapnController);

    /* @ngInject */
    function StartSlapnController($scope, pageService,activeStep, stepService,$state) {

        angular.extend($scope, activeStep.model, {
            forward: true,
            sendData: sendData,
            saved: false
        });

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Start SLAPn!');

        function sendData(direction) {
            stepService.updateActiveModel($scope);
            stepService.setFinishActiveStep();
            var nextprevStep = stepService.getNextAndPrevStep();
            if(direction == 'forward')  
				$state.go(nextprevStep.nextStep.sref); 
            else if(direction == 'backward')
				$state.go(nextprevStep.prevStep.sref);
            $scope.saved = true;
        }

        $scope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            if ($scope.saved != true) {
                sendData();
            }
        });
    }
}());