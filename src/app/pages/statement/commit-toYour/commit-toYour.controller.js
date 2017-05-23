(function () {
    'use strict';

    angular
        .module('app.pages.statement')
        .controller('CommitToYourController', CommitToYourController);

    function CommitToYourController($scope, $state, pageService, stepService, userService, activeStep) {

        angular.extend($scope, activeStep.model, {
            first: ['does', 'provides', 'sells'],
            third: ['for', 'to'],
            fifth: ['Market size', 'Local', 'Regional', 'National', 'Global'],
            showWhatInput: false,
            forward: true,
            sendData: sendData
        });

        var originalData;

        userService.getUser().then(function (user) {
            $scope.businessName = user.businessName;
        });

        getData();  // TODO: request api? data service no reload

        function getData() {

            stepService.getApiData('allMindsetUser') //TODO: Think over the dynamics url
                .then(function (response) {
                    if (response && response.status === 200) {
                        angular.extend($scope, {
                            privilegeInfo: _.get(response, 'data.privilegeAndResponsibility', {})
                        });
                    }
                });

            return stepService.getApiData('yourStatement') //TODO: Think over the dynamics url
                .then(function (response) {
                    if (response && response.status === 200) {
                        $scope.data = _.get(response, 'data.yourStatement', []);
                        originalData = _.clone($scope.data);
                    }
                });
        }

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Statement');

        function sendData() {

            console.log($scope.data);

            // stepService.updateActiveModel($scope);
            // stepService.setFinishActiveStep();
            //
            // var nextStep = stepService.getNextAndPrevStep().nextStep;
            //
            // if (angular.equals($scope.data, originalData)) {
            //     $state.go(nextStep.sref);
            // } else {
            //     stepService.sendApiData('yourStatement', $scope.data)
            //         .then(function () {
            //             $state.go(nextStep.sref);
            //         });
            // }
        }
    }
}());