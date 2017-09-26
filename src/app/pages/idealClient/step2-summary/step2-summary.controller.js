(function () {
    'use strict';

    angular
        .module('app.pages.idealClient')
        .controller('Step2SummaryController', Step2SummaryController);
    
    function Step2SummaryController($scope, activeStep, pageService,stepService, $state, userService, idealclientService, activityService) {

        angular.extend($scope, activeStep.model,{
            model: {
                clients: []
            },
            first: ['does', 'provides', 'sells'],
            third: ['for', 'to'],
            fifth: ['Market size', 'Local', 'Regional', 'National', 'Global'],
            data: {},
            privilegesData: {
                second: ['providing', 'creating', 'giving', 'helping']
            },
            gender: ['Empty', 'Male', 'Female'],
            maritalStatus: ['Empty', 'Single', 'Married', 'Divorced', 'Widowed'],
            kids: ['Empty', 'None', 'Young', 'Teens',' Adults'],
            employment: ['Empty', 'Doesn’t Work','Established Entrepreneur', 'Small Entrepreneur', 'Senior Employed', 'Mid Level Employed', 'Junior Employed'],
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

        var originalData, originalPrivilagesData;

        getData();

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Ideal Client');

        function sendData(direction) {
            stepService.updateActiveModel($scope);
            if(stepService.setFinishActiveStep())
                userService.loadUser().then(function(me){
                    activityService.add({
                        userId: me._id,
                        title: 'Step2 Done',
                        type: 'Milestone',  
                        notes: me.businessName + ' finished building Step2.',
                        journey: {section: 'build', name: 'Step2 Done'}})
                        .then(function(){});    
                });
            var nextprevStep = stepService.getNextAndPrevStep();

            if(direction == 'forward')  
				$state.go(nextprevStep.nextStep.sref); 
            else if(direction == 'backward')
				$state.go(nextprevStep.prevStep.sref);
        }


        function getData() {

            stepService.getApiData('allMindsetUser') //TODO: Think over the dynamics url
                .then(function (response) {
                    if (response && response.status === 200) {
                        angular.extend($scope.data, {
                            privilegeInfo: _.get(response, 'data.privilegeAndResponsibility', {})
                        });
                    }
                });

            stepService.getApiData('yourStatement')  //TODO: request api? data service
                .then(function (response) {
                    if (response && response.status === 200) {

                        angular.extend($scope.model, {
                            stepOneSummary: _.get(response, 'data.yourStatement', {})
                        });
                        userService.getUser().then(function (user) {
                            $scope.data = _.get(response, 'data.yourStatement', []);
                            originalData = _.clone($scope.data);
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