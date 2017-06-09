(function () {
    'use strict';

    angular
        .module('app.pages.idealClient')
        .controller('DefineYourIdealClientController', DefineYourIdealClientController);

    function DefineYourIdealClientController($scope, $state, pageService, stepService,activeStep, idealclientService) {

        angular.extend($scope, activeStep,{
            model: {
                clients: []
            },
            forward: true,
            sendData: sendData,
            idealClientSelects: idealclientService.getClientSliders(),
            client: {}
        });

        getData();

        function getData() {
            // var urls = _.get($state.current, 'params.prev.sref').split('.'); //TODO : request api? data service save!
            var url = '/whoAreYouIdealClient';
            // return stepService.getApiData(urls[urls.length - 1])
            return stepService.getApiData(url)
                .then(function (response) {
                    if (response && response.status === 200) {
                        $scope.model.clients = _.get(response, 'data.whoAreYouIdealClient', []);
                    }

                    $scope.client = idealclientService.calcIdealClient($scope.model.clients);
                });
        }

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Ideal Client');
        

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