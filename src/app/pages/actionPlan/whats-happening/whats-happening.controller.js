(function () {
    'use strict';

    angular
        .module('app.pages.actionPlan')
        .controller('WhatsHappeningController', WhatsHappeningController);

    function WhatsHappeningController($scope, activeStep, pageService,stepService, $state, $timeout, actionplanService) {

        angular.extend($scope, activeStep.model, {
            forward: true,
            sendData: sendData,
            startDate: {},
            QMonths: [],
            monthNames: actionplanService.getMonthLongNames(),
            currentQut: 1,
            saved: false,
            showEventsBox: true,
            autoExpand: autoExpand,
        });

        $timeout(function(){
            $scope.autoExpand('impact-business');
            $scope.autoExpand('impact-client');
        },0);
        
        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle(stepService.getActiveStep().name);
        if ($scope.data.length == 0) {
            $scope.data = [
                {
                    "impactClient" : "",
                    "impactBusiness" : ""
                },
                {
                    "impactClient" : "",
                    "impactBusiness" : ""
                },
                {
                    "impactClient" : "",
                    "impactBusiness" : ""
                },
                {
                    "impactClient" : "",
                    "impactBusiness" : ""
                },
            ];
        }
        getData();
        function getData() {
            // var urls = _.get($state.current, 'params.prev.sref').split('.');
            var url = 'allMindsetUser';

            // return stepService.getApiData(urls[urls.length - 1])
            stepService.getApiData(url) //TODO: Think over the dynamics url
                .then(function (response) {
                    if (response && response.status === 200) {

                        $scope.startDate = response.data.slapStartDate;
                        $scope.QMonths.push( actionplanService.getNthQuaterMonths($scope.startDate.month, 1));
                        $scope.QMonths.push( actionplanService.getNthQuaterMonths($scope.startDate.month, 2));
                        $scope.QMonths.push( actionplanService.getNthQuaterMonths($scope.startDate.month, 3));
                        $scope.QMonths.push( actionplanService.getNthQuaterMonths($scope.startDate.month, 4));

                        $timeout(function(){
                            $scope.autoExpand('impact-business');
                            $scope.autoExpand('impact-client');
                        },0);
                    }
                });


            url = 'worldAroundYou';

            // return stepService.getApiData(urls[urls.length - 1])
            stepService.getApiData(url) //TODO: Think over the dynamics url
                .then(function (response) {
                    if (response && response.status === 200) {
                        $scope.eventsByMonth = response.data.worldAroundYou.eventsByMonth;
                    }
                });
        }

        function sendData(direction) {
            stepService.updateActiveModel($scope);
            stepService.setFinishActiveStep();

            var nextprevStep = stepService.getNextAndPrevStep();
            var urls = activeStep.sref.split('.');

            return stepService.sendApiData(urls[urls.length - 1], $scope.data)
                .then(function () {
                    $scope.saved = true;
                    stepService.setRequestApiFlag();
                    if(direction == 'forward')  
                        $state.go(nextprevStep.nextStep.sref); 
                    else if(direction == 'backward')
                        $state.go(nextprevStep.prevStep.sref);
                });
        }


        $scope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            if ($scope.saved != true) {
                sendData();
            }
        });


        function autoExpand(e) {
            var elements = typeof e === 'object' ? [e.target] : [].slice.call(document.getElementsByClassName(e));
            elements.forEach(function(element){
                var scrollHeight = element.scrollHeight; // replace 60 by the sum of padding-top and padding-bottom
                if (scrollHeight != 0) 
                    element.style.height =  scrollHeight + "px";    
            });
        }
    }
}());