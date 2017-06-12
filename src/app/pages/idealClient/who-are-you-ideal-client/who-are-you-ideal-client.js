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
            shouldSelctIdeal: false,
            idealClientSelects: idealclientService.getClientSliders(),
            saved: false
        });

        var originalModel = activeStep.model;
        $scope.checkFormElements = checkFormElements;
        $scope.sendData = sendData;

        $timeout(addNewClient);

        function sendData(direction) {

            var nextprevStep = stepService.getNextAndPrevStep();
            var urls = activeStep.sref.split('.');

            var clients = $scope.data.clients;

            if ($scope.data.clients.length > 1) {

                clients = [];

                _.forEach($scope.data.clients, function (value) {

                    if (!angular.equals(value, $scope.emptyClient)) {
                        clients.push(value);
                    }

                });
            }

            // Get options for idealClient.
            var idealClient = idealclientService.calcIdealClient(clients);

            $scope.client = idealClient;

            // if should select
            if (!$scope.shouldSelctIdeal) {

                for ( var key in idealClient) {
                    //Check if the customer should select between preferable client type
                    if (idealClient[key].length >= 2) {
                        $scope.shouldSelctIdeal = true;
                    }
                }

                if ($scope.shouldSelctIdeal) {
                    // this means the option need to be selected 
                    

                    if (activeStep.model.data.clients.length == 0) {
                        // which means newly creating clients => 
                        // so fill with default

                        for ( var key in idealClient) {
                            //Fill Ideal client
                            $scope.data.idealClient[key] = idealClient[key][0];
                        }
                    }

                    // and go there to enter values
                    if ($("#idealclient-box").offset())
                        $('body').animate({
                            scrollTop: $("#idealclient-box").offset().top
                        }, 400);
                    return;
                } else {
                    // this means customer don't need to select preferable types and ok with defaults
                    // so fill with default

                    for ( var key in idealClient) {
                        //Fill Ideal client
                        $scope.data.idealClient[key] = idealClient[key][0];
                    }
                    //sendData

                    stepService.updateActiveModel($scope);
                    stepService.setFinishActiveStep();
                    
                    return stepService.sendApiData(urls[urls.length - 1], {clients: clients, idealClient: $scope.data.idealClient})
                        .then(function () {
                            if(direction == 'forward')  
                                $state.go(nextprevStep.nextStep.sref); 
                            else if(direction == 'backward')
                                $state.go(nextprevStep.prevStep.sref);
                        });
                }

            // already selected now or don't need to select. then save
            } else if ($scope.shouldSelctIdeal) {
                
                stepService.updateActiveModel($scope);
                stepService.setFinishActiveStep();
                
                return stepService.sendApiData(urls[urls.length - 1], {clients: clients, idealClient: $scope.data.idealClient})
                    .then(function () {
                        if(direction == 'forward')  
                            $state.go(nextprevStep.nextStep.sref); 
                        else if(direction == 'backward')
                            $state.go(nextprevStep.prevStep.sref);
                    });
            }
        }

        function addNewClient(model) {

            var index;

            if (model) {
                index = _.findIndex($scope.data.clients, model);
            }

            var force = false;
            if ($scope.data.clients.length > 0) {
                var lastItem = $scope.data.clients[$scope.data.clients.length - 1];
                if (!angular.equals(lastItem, $scope.emptyClient)) {
                    force = true;
                }
            }
            if ($scope.data.clients.length === 0 || $scope.data.clients.length === index + 1 || force) {
                var clientModel = _.cloneDeep($scope.emptyClient);
                $scope.data.clients.push(clientModel);
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


        $scope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            sendData();
        });
    }


})();

