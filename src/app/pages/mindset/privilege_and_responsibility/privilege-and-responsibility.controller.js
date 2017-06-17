(function () {
    'use strict';

    angular
        .module('app.pages.mindset')
        .controller('PrivilegeAndResponsibilityController', PrivilegeAndResponsibilityController);

    /* @ngInject */
    function PrivilegeAndResponsibilityController($scope, $state, $timeout, pageService, userService, stepService, activeStep) {

        var answersList = [];

        angular.extend($scope, activeStep.model, {
            options: [
                {
                    code: 1,
                    label: 'My primary driver'
                },
                {
                    code: 2,
                    label: 'Very important to me'
                },
                {
                    code: 3,
                    label: 'Neutral'
                },
                {
                    code: 4,
                    label: 'Not important to me'
                }
            ],
            forward: false,
            sendData:sendData,
            saved: false
        });

        $scope.availableOptions = [
            {
                code: 2,
                label: 'Very important to me'
            },
            {
                code: 3,
                label: 'Neutral'
            },
            {
                code: 4,
                label: 'Not important to me'
        }];
        $scope.notifications = [];
        if ($scope.businessName === null) {
            $scope.businessName = _.get(userService, 'user.businessName');
        }

        $scope.checkDropdownModels = checkDropdownModels;

        $timeout(checkShowBlockStatus);

        // --- vars ---

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Privilege and Responsibility');

        userService.getUser().then(function (user) {
            if (!_.isEmpty(user)) {
                $scope.data.businessName = user.businessName;
            }
        });

        function checkShowBlockStatus(){
            if (!_.isEmpty($scope.data.first) && !_.isEmpty($scope.data.second) && !_.isEmpty($scope.data.third) && !_.isEmpty($scope.data.fourth)) 
            {
                $scope.showInfoBlock = true;
                $scope.notifications = [];
                findPrimaryLabel();
                $scope.forward = true;
            }
            if(($scope.data.first == 'My primary driver')
                || ($scope.data.second == 'My primary driver')
                || ($scope.data.third == 'My primary driver')
                || ($scope.data.fourth == 'My primary driver')){
                    
                $scope.showInfoBlock = true;
                $scope.forward = true;
            }
            else{
                $scope.notifications = [{name: 'Missing Primary Driver', type: 'error', message: 'Please select at least one Primary Driver', show: true}];
                $scope.showInfoBlock = false;
                $scope.forward = false;
            }
        }
        function sendData(direction) {

            if (_.isEmpty($scope.data.text)) {
                return false;
            }

            var urls = activeStep.sref.split('.');
            stepService.updateActiveModel($scope);
            stepService.setFinishActiveStep();

            var nextprevStep = stepService.getNextAndPrevStep();

            var data = angular.extend({}, {
                first: $scope.data.first,
                second: $scope.data.second,
                third: $scope.data.third,
                fourth: $scope.data.fourth,
                text: $scope.data.text,
                additionalText: $scope.data.additionalText,
                result: $scope.data.result,
                resultId: $scope.data.resultId
            });

            return stepService.sendApiData(urls[urls.length - 1], data)
                .then(function () {
                    $scope.saved = true;
                    if(direction == 'forward')  
                        $state.go(nextprevStep.nextStep.sref); 
                    else if(direction == 'backward')
                        $state.go(nextprevStep.prevStep.sref);
                });
        }


        function checkDropdownModels(model, result, changedItem) {
            checkShowBlockStatus();
        }

        function findPrimaryLabel() {
            var resultList = _.cloneDeep($scope.options);
            resultList = _.reverse(resultList);

            _.each(resultList, function (value) {

                if ($scope.data.first === value.label) {
                    $scope.data.result = 'provide for my family';
                    $scope.data.resultId = '0';
                    return true;
                }

                if ($scope.data.second === value.label) {
                    $scope.data.result = 'create jobs';
                    $scope.data.resultId = '1';
                    return true;
                }

                if ($scope.data.third === value.label) {
                    $scope.data.result = 'give more to my community';
                    $scope.data.resultId = '2';
                    return true;
                }

                if ($scope.data.fourth === value.label) {
                    $scope.data.result = 'helping the economy';
                    $scope.data.resultId = '3';
                    return true;
                }
            });
        }


        $scope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            if ($scope.saved != true) {
                sendData();
            }
        });
    }


})();
