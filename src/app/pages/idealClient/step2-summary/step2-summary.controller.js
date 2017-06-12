(function () {
    'use strict';

    angular
        .module('app.pages.idealClient')
        .controller('Step2SummaryController', Step2SummaryController);
    
    function Step2SummaryController($scope, activeStep, pageService,stepService, $state, userService, idealclientService) {

        angular.extend($scope, activeStep.model,{
            model: {
                clients: []
            },
            data: {},
            privilegesData: {
                second: ['providing', 'creating', 'giving', 'helping']
            },
            fifth: ['Market size', 'Local', 'Regional', 'National', 'Global'],
            gender: ['Empty', 'Male', 'Female'],
            maritalStatus: ['Empty', 'Single', 'Married', 'Divorced', 'Widowed'],
            kids: ['Empty', 'None', 'Young', 'Teens',' Adults'],
            employment: ['Empty', 'Doesn’t Work Established Entrepreneur', 'Small Entrepreneur', 'Senior Employed', 'Mid Level Employed', 'Junior Employed'],
            location: ['Empty', 'City', 'Suburbs', 'Rural', 'Other'],
            home: ['Empty', 'Condo', 'Apartment', 'House', 'Farm', 'Other'],
            transit: ['Empty', 'Car', 'Bike', 'Train', 'Walking', 'Planes', 'Other'],
            age: ['Age','11-20','21-30','31-40','41-50','51-60','61-70','71-80','81-90'],
            hobbies: ['Hobbies', 'Volunteering',  'Working Out', 'Shopping',  'Traveling',   'Sports',  'Reading',  'Arts & Culture'],
            reads: ['Reads', 'Business Book', 'Self Help Book', 'Magazine', 'Novel', 'Blog Posts',  'Newspaper'],
            forward: true,
            sendData: sendData,
            saved: false
        });

        getData();

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
            else if(direction == 'backward')
				$state.go(nextprevStep.prevStep.sref);
        }


        function getData() {

            stepService.getApiData('yourStatement')  //TODO: request api? data service
                .then(function (response) {
                    if (response && response.status === 200) {

                        angular.extend($scope.model, {
                            stepOneSummary: _.get(response, 'data.yourStatement', {})
                        });
                        userService.getUser().then(function (user) {
                            $scope.data.businessName = user.businessName;
                        });
                    }
                });

            stepService.getApiData('allMindsetUser') //TODO: Think over the dynamics url
                .then(function (response) {
                    if (response && response.status === 200) {
                        angular.extend($scope.data, {
                            privilegeInfo: _.get(response, 'data.privilegeAndResponsibility', {})
                        });
                    }
                });

            stepService.getApiData('whoAreYouIdealClient')  //TODO: request api? data service
                .then(function (response) {
                    if (response && response.status === 200) {
                        $scope.model.clients = _.get(response, 'data.whoAreYouIdealClient', []);
                        $scope.client = idealclientService.calcIdealClient($scope.model.clients);
                    }
                });
                
        }
        
        $scope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            sendData();
        });
    }
}());