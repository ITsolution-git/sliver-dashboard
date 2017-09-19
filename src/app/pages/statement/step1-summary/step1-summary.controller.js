(function () {
    'use strict';

    angular
        .module('app.pages.statement')
        .controller('Step1SummaryController', Step1SummaryController);

    function Step1SummaryController($scope, $state, pageService, userService, stepService, activeStep, activityService) {

        angular.extend($scope, activeStep.model, {
            listFirst: ['does', 'provides', 'sells'],
            third: ['for', 'to'],
            fifth: ['Market size', 'Local', 'Regional', 'National', 'Global'],
            privilegesData: {
                second: ['providing', 'creating', 'giving', 'helping']
            },
            data: {},
            forward: true,
            sendData: sendData,
            saved: false
        });

        getData();


        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Statement')
            .setPageTitle('SLAP | Step 1 SLAPsummary');

        function sendData(direction) {
            stepService.updateActiveModel($scope);
            if(stepService.setFinishActiveStep())

                userService.loadUser().then(function(me){
                    activityService.add({
                        userId: me._id,
                        title: 'Step1 Done',
                        type: 'Milestone',  
                        notes: me.businessName + ' finished building Step1.',
                        journey: {section: 'build', name: 'Step1 Done'}})
                        .then(function(){});    
                });
            
            var nextprevStep = stepService.getNextAndPrevStep();
            var urls = activeStep.sref.split('.');

            return stepService.sendApiData(urls[urls.length - 1], $scope.data)
                .then(function () {
                    if(direction == 'forward')  
                        $state.go(nextprevStep.nextStep.sref); 
                    else if(direction == 'backward')
                        $state.go(nextprevStep.prevStep.sref);
                    $scope.saved = true;
                });
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

                        $scope.data = _.get(response, 'data.yourStatement', {});
                        userService.getUser().then(function (user) {
                            $scope.data.businessName = user.businessName;
                        });
                    }
                });

        }
        $scope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            if ($scope.saved != true) {
                sendData();
            }
        });
    }
}());