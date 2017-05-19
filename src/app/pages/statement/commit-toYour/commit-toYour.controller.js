(function () {
    'use strict';

    angular
        .module('app.pages.statement')
        .controller('CommitToYourController', CommitToYourController);

    function CommitToYourController($scope, $state, pageService, stepService, userService, activeStep) {

        angular.extend($scope, activeStep.model,{
            first: ['Does', 'Provides', 'Sells'],
            third: ['For', 'To'],
            fifth: ['Market size', 'Local', 'Regional', 'National', 'Global'],
            forward: true,
            sendData: sendData
        });

        userService.getUser().then(function (user) {
            $scope.fullName = user.name + ' ' + user.lastName;
        });

        getData();  // TODO: request api? data service no reload

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

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Statement');

        function sendData() {
            stepService.updateActiveModel($scope);
            stepService.setFinishActiveStep();

            var nextStep = stepService.getNextAndPrevStep().nextStep;

            $state.go(nextStep.sref);
        }
    }
}());