(function () {
    'use strict';

    angular
        .module('app.pages.idealClient')
        .controller('DefineYourIdealClientController', DefineYourIdealClientController);

    function DefineYourIdealClientController($scope, $state, pageService, stepService,activeStep) {

        angular.extend($scope, activeStep,{
            data: {
                clients: []
            },
            gender: ['Empty', 'Male', 'Female'],
            maritalStatus: ['Empty', 'Single', 'Married', 'Divorced', 'Widowed'], //TODO: service select data
            kids: ['Empty', 'None', 'Young', 'Teens',' Adults'],
            employment: ['Empty', 'Doesn’t Work Established Entrepreneur', 'Small Entrepreneur', 'Senior Employed', 'Mid Level Employed', 'Junior Employed'],
            location: ['Empty', 'City', 'Suburbs', 'Rural', 'Other'],
            home: ['Empty', 'Condo', 'Apartment', 'House', 'Farm', 'Other'],
            transit: ['Empty', 'Car', 'Bike', 'Train', 'Walking', 'Planes', 'Other'],
            forward: true,
            sendData: sendData
        });

        getData();

        function getData() {
            // var urls = _.get($state.current, 'params.prev.sref').split('.'); //TODO : request api? data service save!
            var url = '/whoAreYouIdealClient';
            // return stepService.getApiData(urls[urls.length - 1])
            return stepService.getApiData(url)
                .then(function (response) {
                    if (response && response.status === 200) {
                        $scope.data.clients = _.get(response, 'data.whoAreYouIdealClient', []);
                    }
                });
        }

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Ideal Client');

        function sendData() {
            stepService.updateActiveModel($scope);
            stepService.setFinishActiveStep();

            var nextStep = stepService.getNextAndPrevStep().nextStep;

            $state.go(nextStep.sref);
        }
    }
}());