(function () {
    'use strict';

    angular
        .module('app.pages.idealClient')
        .controller('WhoAreYouIdealClientController', WhoAreYouIdealClientController);

    /* @ngInject */
    function WhoAreYouIdealClientController($scope, $q, $timeout, $state, pageService, stepService, activeStep, idealclientService) {

        angular.extend($scope, activeStep.model, {
            emptyClient: {
                name: '',
                gender: '0',
                age: '0',
                maritalStatus: '0',
                kids: '0',
                employment: '0',
                location: '0',
                home: '0',
                transit: '0',
                hobbies: '0',
                reads: '0',
                number: 0
            },
            forward: true,
            idealClientSelects: idealclientService.getClientSliders()
        });

        $scope.checkFormElements = checkFormElements;
        $scope.sendData = sendData;

        $timeout(addNewClient);

        function sendData(direction) {
            stepService.updateActiveModel($scope);
            stepService.setFinishActiveStep();

            var nextprevStep = stepService.getNextAndPrevStep();
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
                    if(direction == 'forward')  
                        $state.go(nextprevStep.nextStep.sref); 
                    else
                        $state.go(nextprevStep.prevStep.sref);
                });
        }

        function addNewClient(model) {

            var index;

            if (model) {
                index = _.findIndex($scope.data, model);
            }

            var force = false;
            if ($scope.data.length > 0) {
                var lastItem = $scope.data[$scope.data.length - 1];
                if (!angular.equals(lastItem, $scope.emptyClient)) {
                    force = true;
                }
            }
            if ($scope.data.length === 0 || $scope.data.length === index + 1 || force) {
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

