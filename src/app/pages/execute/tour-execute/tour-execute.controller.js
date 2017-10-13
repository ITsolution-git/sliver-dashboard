(function () {
    'use strict';

    angular
        .module('app.pages.execute')
        .controller('TourExecuteController', TourExecuteController);

    /* @ngInject */
    function TourExecuteController($scope, activeStep, pageService, stepService, $state) {
        $scope.videoUrl = activeStep.videoUrl;

        angular.extend($scope, activeStep.model, {
            forward: true,
            sendData: sendData,
            finishBuild: finishBuild
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

        function finishBuild() {
            stepService.updateActiveModel($scope);
            stepService.setFinishActiveStep();
            var urls = activeStep.sref.split('.');

            return stepService.sendApiData(urls[urls.length - 1], {})
                .then(function () {
                    $state.go('slapExcute.main');
                });
        }
    }
}());