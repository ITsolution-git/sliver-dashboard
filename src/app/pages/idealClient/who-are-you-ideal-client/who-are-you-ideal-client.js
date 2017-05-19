(function () {
    'use strict';

    angular
        .module('app.pages.idealClient')
        .controller('WhoAreYouIdealClientController', WhoAreYouIdealClientController);

    /* @ngInject */
    function WhoAreYouIdealClientController($scope, $q, $timeout, $state, pageService, stepService, activeStep) {

        angular.extend($scope, activeStep.model, {
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

            var clients = $scope.data;

            if ($scope.data.length > 1) {

                clients = [];

                _.forEach($scope.data, function (value) {

                    if (!angular.equals(value, $scope.emptyClient)) {
                        clients.push(value);
                    }

                });
            }

            return stepService.sendApiData(urls[urls.length - 1], clients)
                .then(function () {
                    $state.go(nextStep.sref);
                });
        }

        function addNewClient(model) {

            var index;

            if (model) {
                index = _.findIndex($scope.data, model);
            }

            if ($scope.data.length === 0 || $scope.data.length === index + 1) {
                var clientModel = _.cloneDeep($scope.emptyClient);
                $scope.data.push(clientModel);
            }
        }

        function checkFormElements(model) {

            findEmptyInputs(model).then(function (result) {
                if (result) {
                    addNewClient(model);
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

