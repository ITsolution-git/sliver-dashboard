(function () {
    'use strict';

    angular
        .module('app.pages.mindset')
        .controller('PrivilegeAndResponsibilityController', PrivilegeAndResponsibilityController);

    /* @ngInject */
    function PrivilegeAndResponsibilityController($scope, $state, pageService, userService, stepService, activeStep) {

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
            forward: true,
            sendData:sendData
        });

        if ($scope.businessName === null) {
            $scope.businessName = _.get(userService, 'user.businessName');
        }

        $scope.checkDropdownModels = checkDropdownModels;
        $scope.closeNotice = closeNotice;
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

        function sendData() {
            var urls = activeStep.sref.split('.');
            stepService.updateActiveModel($scope);
            stepService.setFinishActiveStep();

            var nextStep = stepService.getNextAndPrevStep().nextStep;

            var data = angular.extend({}, {
                first: $scope.data.first,
                second: $scope.data.second,
                third: $scope.data.third,
                fourth: $scope.data.fourth,
                text: $scope.data.text
            });

            return stepService.sendApiData(urls[urls.length - 1], data)
                .then(function () {
                    $state.go(nextStep.sref);
                });
        }


        function checkDropdownModels(model) {

            if (_.indexOf(answersList, model) === -1) {
                answersList.push(model);
                $scope.showNotice = false;
            } else {
                $scope.showNotice = true;
                $scope.showInfoBlock = false;
            }

            if (!_.isEmpty($scope.data.first) && !_.isEmpty($scope.data.second) && !_.isEmpty($scope.data.third) && !_.isEmpty($scope.data.fourth)) {

                if (findDuplicate()) {
                    $scope.showInfoBlock = true;
                    $scope.showNotice = false;
                    findPrimaryLabel();
                }
            }
        }

        function findPrimaryLabel() {
            var resultList = _.cloneDeep($scope.options);
            resultList = _.reverse(resultList);

            _.each(resultList, function (value) {

                if ($scope.data.first === value.label) {
                    $scope.data.result = 'provide for my family';
                    return true;
                }

                if ($scope.data.second === value.label) {
                    $scope.data.result = 'create jobs';
                    return true;
                }

                if ($scope.data.third === value.label) {
                    $scope.data.result = 'give more to my community';
                    return true;
                }

                if ($scope.data.fourth === value.label) {
                    $scope.data.result = 'helping the economy';
                    return true;
                }
            });
        }

        function closeNotice() {
            $scope.showNotice = false;
        }

        // If user selected two or more identical values, return false
        function findDuplicate() {

            var modelsArray = [$scope.data.first, $scope.data.second, $scope.data.third, $scope.data.fourth];
            var filteringModelsArray = _.uniq(modelsArray);

            return filteringModelsArray.length === modelsArray.length;
        }
    }


})();
