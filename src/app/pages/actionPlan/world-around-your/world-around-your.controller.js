(function () {
    'use strict';

    angular
        .module('app.pages.actionPlan')
        .controller('WorldAroundYouController', WorldAroundYouController);

    function WorldAroundYouController($scope, activeStep, pageService,stepService, $state) {

        angular.extend($scope, activeStep.model, {
            forward: true,
            sendData: sendData,
            model: {
                first: 'Dropdown Label'
            }
        });

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Action Plan');

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