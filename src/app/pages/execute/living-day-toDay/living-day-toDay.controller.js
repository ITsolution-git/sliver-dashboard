(function () {
    'use strict';

    angular
        .module('app.pages.execute')
        .controller('LivingDayToDayController', LivingDayToDayController);

    function LivingDayToDayController($scope, activeStep, pageService, stepService, $state) {
        $scope.videoUrl = activeStep.videoUrl;

        angular.extend($scope, activeStep.model, {
            forward: true,
            sendData: sendData
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