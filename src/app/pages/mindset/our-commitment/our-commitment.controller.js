(function () {
    'use strict';

    angular
        .module('app.pages.mindset')
        .controller('OurCommitmentController', OurCommitmentController);

    /* @ngInject */
    function OurCommitmentController($scope, pageService, activeStep, stepService,$state) {
        angular.extend($scope, activeStep.model, {
            forward: true,
            sendData: sendData
        });

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Our Commitment To You');

        function sendData(direction) {
            stepService.updateActiveModel($scope);
            stepService.setFinishActiveStep();
            var nextprevStep = stepService.getNextAndPrevStep();
            if(direction == 'forward')  
				$state.go(nextprevStep.nextStep.sref); 
            else
				$state.go(nextprevStep.prevStep.sref);
        }
    }
}());