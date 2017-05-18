(function () {
    'use strict';

    angular
        .module('app.pages.actionPlan')
        .controller('DoubleCheckStartDateController', DoubleCheckStartDateController);

    function DoubleCheckStartDateController($scope, activeStep, pageService,stepService, $state) {

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
            .setPageTitle('Action Plan Review');

        function sendData() {
            stepService.updateActiveModel($scope);
            stepService.setFinishActiveStep();

            var nextStep = stepService.getNextAndPrevStep().nextStep;

            $state.go(nextStep.sref);
        }
    }
}());