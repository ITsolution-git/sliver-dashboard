(function () {
    'use strict';

    angular
        .module('app.pages.idealClient')
        .controller('NameYourIdealClientController', NameYourIdealClientController);

    function NameYourIdealClientController($scope, pageService, activeStep,stepService,$state) {
        $scope.videoUrl = activeStep.videoUrl;
        angular.extend($scope, activeStep.model, {
            forward: true,
            sendData: sendData,
            model: {
                fourth: null
            },
            showVideoBlock: false,
            showStaticTextBlock: false,
            showIdealClientNameBlock: false,
            saved: false
        });

        getData();  // TODO: request api? data service no reload

        function getData() {

            stepService.getApiData('nameYourIdealClient') //TODO: Think over the dynamics url
                .then(function (response) {
                    if (response && response.status === 200) {
                        $scope.model.fourth = response.data;
                    }
                });

        }

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Name Your Ideal Client');

        function sendData(direction) {
            stepService.updateActiveModel($scope);
            stepService.setFinishActiveStep();
            stepService.setRequestApiFlag();
            
            var nextprevStep = stepService.getNextAndPrevStep();
            var urls = activeStep.sref.split('.');

            return stepService.sendApiData(urls[urls.length - 1], $scope.model)
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