(function () {
    'use strict';

    angular
        .module('app.pages.yearGoal')
        .controller('Step3SummaryController', Step3SummaryController);

    function Step3SummaryController($scope, activeStep, pageService,stepService, $state, userService, idealclientService, activityService) {

        angular.extend($scope, activeStep.model,{
            model: {
                clients: []
            },
            first: ['does', 'provides', 'sells'],
            third: ['for', 'to'],
            data: {},
            privilegesData: {
                second: ['providing', 'creating', 'giving', 'helping']
            },
            fifth: ['Market size', 'Local', 'Regional', 'National', 'Global'],
            gender: ['Empty', 'Male', 'Female'],
            maritalStatus: ['Empty', 'Single', 'Married', 'Divorced', 'Widowed'],
            // kids: ['Empty', 'None', 'Young', 'Teens',' Adults'],
            kids: ['Empty', 'No Children', 'Young Kids', 'Teen Kids', ' Grown Children'],
            //employment: ['Empty', 'Doesn’t Work', 'Established Entrepreneur', 'Small Entrepreneur', 'Senior Employed', 'Mid Level Employed', 'Junior Employed'],
            employment: ['Empty', 'Doesn’t Work', 'owns a big business', 'owns a small business', 'works a senior level job', 'works a mid level job', 'works a junior level job'],
            // location: ['Empty', 'City', 'Suburbs', 'Rural', 'Other'],
            location: ['Empty', ' a City', ' the suburbs', 'somewhere Rural'],
            home: ['Empty', 'Condo', 'Apartment', 'House', 'Farm', 'Other'],
            // transit: ['Empty', 'Car', 'Bike', 'Train', 'Walking', 'Planes', 'Other'],
            transit: ['Empty', 'Car', 'Biking', 'Train', 'Walking', 'Flying', 'Subway'],
            forward: true,
            sendData: sendData,

            age: ['Age', '11-20', '21-30', '31-40', '41-50', '51-60', '61-70', '71-80', '81-90'],
            //hobbies: ['Hobbies', 'Volunteering',  'Working Out', 'Shopping',  'Traveling',   'Sports',  'Reading',  'Arts & Culture'],
            //reads: ['Reads', 'Business Book', 'Self Help Book', 'Magazine', 'Novel', 'Blog Posts',  'Newspaper'],
            hobbies: ['Hobbies', 'Volunteer', 'Work Out', 'Shop', 'Travel', 'Play Sports', 'Read', 'See Film/Theater/Art', 'Watch Sports'],
            reads: ['Reads', 'Business Books', 'Self Help Books', ' Magazines', 'Novels', 'Blogs', 'the News'],
            months: ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            totalFixedExpenses: '0.00',
            totalTarget: '0.00',
        });
        var originalData, originalPrivilagesData;

        getData();

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('1 Year Goal');

        function sendData(direction) {
            stepService.updateActiveModel($scope);
            if(stepService.setFinishActiveStep())
                userService.loadUser().then(function(me){
                    activityService.add({
                        userId: me._id,
                        title: 'Step3 Done',
                        type: 'Milestone',  
                        notes: me.businessName + ' finished building Step3.',
                        journey: {section: 'build', name: 'Step3 Done'}})
                        .then(function(){});    
                });
            

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
                            $scope.data = _.get(response, 'data.yourStatement', []);
                            originalData = _.clone($scope.data);
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
                        $scope.totalTarget = 0;
                        _.each($scope.model.revenues, function(revenue){
                            if(!revenue.deleted){
                                $scope.totalTarget += (+revenue.sellingPrice * +revenue.unit);
                            }  
                        })

                    }
                });


            stepService.getApiData('fixedBusinessExpenses')  //TODO: request api? data service
                .then(function (response) {
                    if (response && response.status === 200) {
                        $scope.totalFixedExpenses = (response.data.fixedBusinessExpenses.expensesSum + response.data.fixedBusinessExpenses.incidentals * 0.01 * response.data.fixedBusinessExpenses.expensesSum) * 12  + (+response.data.fixedBusinessExpenses.profit);

                        $scope.profit = response.data.fixedBusinessExpenses.profit;
                    }
                });
        }
        $scope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            sendData();
        });
    }
}());