(function () {
    'use strict';

    angular
        .module('app.pages.idealClient')
        .controller('WhoAreYouIdealClientController', WhoAreYouIdealClientController);

    /* @ngInject */
    function WhoAreYouIdealClientController($scope, $q, $timeout, $state, pageService, stepService,activeStep) {

        angular.extend($scope, activeStep.model,{
            emptyClient: {
                name: '',
                gender: '0',
                age: '',
                maritalStatus: '0',
                kids: '0',
                employment: '0',
                location: '0',
                home: '0',
                transit: '0',
                hobbies: '',
                reads: '',
                number: 0
            },
            forward: true
        });

        $scope.checkFormElements = checkFormElements;
        $scope.sendData = sendData;

        $timeout(addNewClient);

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

        function addNewClient(currentClientNumber) {

            currentClientNumber = currentClientNumber || 0;

            if ($scope.data.length === currentClientNumber) {
                var clientModel = _.cloneDeep($scope.emptyClient);
                clientModel.number = currentClientNumber + 1;
                $scope.data.push(clientModel);
            }
        }

        function checkFormElements(model) {

            findEmptyInputs(model).then(function (result) {
                if (result) {
                    addNewClient(model.number);
                }
            });
        }

        function findEmptyInputs(model) {
            return $q(function (resolve) {

                var result = true;

                _.each(model, function (value, key) {

                    if (key !== 'number') {
                        if (value === '0' || _.isEmpty(value)) {
                            result = false;
                            return false;
                        }
                    }

                });

                resolve(result);
            });
        }

        // --- vars ---

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Who Are Your Ideal Clients');


    }


})();

