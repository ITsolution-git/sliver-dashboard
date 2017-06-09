(function () {
    'use strict';

    angular
        .module('app.pages.yearGoal')
        .controller('Step3SummaryController', Step3SummaryController);

    function Step3SummaryController($scope, activeStep, pageService,stepService, $state, userService, idealclientService) {

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
            forward: true,
            sendData: sendData,
            months: ['','January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
            totalFixedExpenses: '0.00',
            totalTarget: '0.00'
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
            else
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

                        $scope.slapStartDate = _.get(response, 'data.slapStartDate', []);
                    }
                });

            stepService.getApiData('whoAreYouIdealClient')  //TODO: request api? data service
                .then(function (response) {
                    if (response && response.status === 200) {
                        $scope.model.clients = _.get(response, 'data.whoAreYouIdealClient', []);
                        $scope.client = idealclientService.calcIdealClient($scope.model.clients);
                    }
                });

            stepService.getApiData('revenueStreams')  //TODO: request api? data service
                .then(function (response) {
                    if (response && response.status === 200) {
                        $scope.model.revenues = _.get(response, 'data.revenueStreams.revenues', []);
                    }
                });

            stepService.getApiData('revenueStreams')  //TODO: request api? data service
                .then(function (response) {
                    if (response && response.status === 200) {
                        $scope.model.revenues = _.get(response, 'data.revenueStreams.revenues', []);
                    }
                });

            stepService.getApiData('revenueStreams')  //TODO: request api? data service
                .then(function (response) {
                    if (response && response.status === 200) {
                        $scope.model.revenues = _.get(response, 'data.revenueStreams.revenues', []);
                        $scope.totalTarget = 0;
                        _.each($scope.model.revenues, function(revenue){
                             $scope.totalTarget += (+revenue.sellingPrice * +revenue.unit);
                        })

                    }
                });


            stepService.getApiData('fixedBusinessExpenses')  //TODO: request api? data service
                .then(function (response) {
                    if (response && response.status === 200) {
                        // $scope.totalFixedExpenses = (response.data.fixedBusinessExpenses.expensesSum + response.data.fixedBusinessExpenses.incidentals * 0.01 * response.data.fixedBusinessExpenses.expensesSum + (+response.data.fixedBusinessExpenses.profit)) * 12
                        $scope.profit = response.data.fixedBusinessExpenses.profit;
                    }
                });
        }
    }
}());