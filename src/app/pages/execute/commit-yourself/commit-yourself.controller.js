(function () {
    'use strict';

    angular
        .module('app.pages.execute')
        .controller('CommitYourselfController', CommitYourselfController);

    function CommitYourselfController($scope, activeStep, pageService, stepService, $state) {

        angular.extend($scope, activeStep.model, {
            forward: true,
            sendData: sendData
        });


        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Execute Prep');

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