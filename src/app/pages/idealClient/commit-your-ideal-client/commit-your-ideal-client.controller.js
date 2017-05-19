(function () {
    'use strict';

    angular
        .module('app.pages.idealClient')
        .controller('CommitYourIdealClientController', CommitYourIdealClientController);

    function CommitYourIdealClientController($scope, activeStep, pageService,stepService, $state, userService) {

        angular.extend($scope, activeStep.model, {
            first: ['Does', 'Provides', 'Sells'],
            third: ['For', 'To'],
            fifth: ['Market size', 'Local', 'Regional', 'National', 'Global'],
            forward: true,
            sendData: sendData
        });

        getData();  // TODO: request api? data service no reload

        userService.getUser().then(function (user) {
            $scope.fullName = user.name + ' ' + user.lastName;
        });

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Ideal Client');


        function getData() {
            // var urls = _.get($state.current, 'params.prev.sref').split('.');
            var url = '/yourStatement';

            // return stepService.getApiData(urls[urls.length - 1])
            return stepService.getApiData(url) //TODO: Think over the dynamics url
                .then(function (response) {
                    console.log(response);
                    if (response && response.status === 200) {
                        $scope.data = _.get(response, 'data.yourStatement', []);
                    }
                });
        }

        function sendData() {
            stepService.updateActiveModel($scope);
            stepService.setFinishActiveStep();

            var nextStep = stepService.getNextAndPrevStep().nextStep;

            $state.go(nextStep.sref);
        }
    }
}());