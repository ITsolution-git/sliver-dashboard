(function () {
    'use strict';

    angular
        .module('app.pages.idealClient')
        .controller('NameYourIdealClientController', NameYourIdealClientController);

    function NameYourIdealClientController($scope, pageService, activeStep,stepService,$state) {

        angular.extend($scope, activeStep.model, {
            forward: true,
            sendData: sendData,
            model: {
                firstName: ''
            },
            showVideoBlock: false,
            showStaticTextBlock: false,
            showIdealClientNameBlock: false
        });

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Name Your Ideal Client');

        function sendData() {
            stepService.updateActiveModel($scope);
            stepService.setFinishActiveStep();

            var nextStep = stepService.getNextAndPrevStep().nextStep;
            var urls = activeStep.sref.split('.');

            return stepService.sendApiData(urls[urls.length - 1], $scope.data)
                .then(function () {
                    $state.go(nextStep.sref);
                });
        }

    }
}());