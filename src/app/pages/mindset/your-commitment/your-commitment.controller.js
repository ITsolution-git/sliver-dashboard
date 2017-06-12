(function () {
    'use strict';

    angular
        .module('app.pages.mindset')
        .controller('YourCommitmentController', YourCommitmentController);

    /* @ngInject */
    function YourCommitmentController($scope, activeStep, pageService, stepService, mindsetService, $state) {

        angular.extend($scope, activeStep.model, {
            forward: true,
            sendData: sendData
        });

        if($scope.data === null) {
            $scope.data = mindsetService.getSliders();
        }

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Your Commitment To Us');

        function sendData(direction) {
            stepService.updateActiveModel($scope);
            stepService.setFinishActiveStep();

            var nextprevStep = stepService.getNextAndPrevStep();
            var urls = activeStep.sref.split('.');

            return stepService.sendApiData(urls[urls.length - 1], $scope.data)
                .then(function () {
                    if(direction == 'forward')  
				$state.go(nextprevStep.nextStep.sref); 
            else if(direction == 'backward')
				$state.go(nextprevStep.prevStep.sref);
                });
        }

        $scope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            sendData();
        });
    }
}());