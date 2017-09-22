(function () {
    'use strict';

    angular
        .module('app.pages.mindset')
        .controller('OurCommitmentController', OurCommitmentController);

    /* @ngInject */
    function OurCommitmentController($scope, pageService, activeStep, stepService,$state, $rootScope) {

        angular.extend($scope, activeStep.model, {
            forward: true,
            sendData: sendData,
            saved: false
        });
        $scope.videoUrl = "https://drive.google.com/file/d/0B4Bqg_mz6NwAc1FnZFRfMTRoZVk/preview";
        
        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Our Commitment To You');

        function sendData(direction) {
            stepService.updateActiveModel($scope);
            stepService.setFinishActiveStep();
            var nextprevStep = stepService.getNextAndPrevStep();
            if(direction == 'forward')  
				$state.go(nextprevStep.nextStep.sref); 
            else if(direction == 'backward')
				$state.go(nextprevStep.prevStep.sref);
            $scope.saved = true;
            
        }
        $scope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            if ($scope.saved != true) {
                sendData();
            }
        });

        stepService.mySlapStateForButton = 'Excute';

    }
}());