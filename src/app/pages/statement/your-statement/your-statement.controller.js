(function () {
    'use strict';

    angular
        .module('app.pages.statement')
        .controller('YourStatementController', YourStatementController);

    /* @ngInject */
    function YourStatementController($scope, activeStep, $state, pageService, userService, stepService) {

        angular.extend($scope, activeStep.model, {
            privilegesData: {
                second: ['providing', 'creating', 'giving', 'helping']
            },
            forward: true,
            sendData: sendData
        });

        getData();

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('SLAP | Your SLAPstatement');

        function sendData(direction) {
            stepService.updateActiveModel($scope);
            stepService.setFinishActiveStep();

            var nextprevStep = stepService.getNextAndPrevStep();
            var urls = activeStep.sref.split('.');

            return stepService.sendApiData(urls[urls.length - 1], $scope.data)
                .then(function () {
                    if(direction == 'forward')  
				$state.go(nextprevStep.nextStep.sref); 
            else
				$state.go(nextprevStep.prevStep.sref);
                });
        }

        function getData() {
            // var urls = _.get($state.current, 'params.prev.sref').split('.');
            var url = 'allMindsetUser';

            userService.loadUser().then(function (user) {
                $scope.data.businessName = user.businessName;
            });

            // return stepService.getApiData(urls[urls.length - 1])
            return stepService.getApiData(url) //TODO: Think over the dynamics url
                .then(function (response) {
                    if (response && response.status === 200) {
                        angular.extend($scope.data, {
                            privilegeInfo: _.get(response, 'data.privilegeAndResponsibility', {})
                        });
                    }
                });
        }
    }
}());