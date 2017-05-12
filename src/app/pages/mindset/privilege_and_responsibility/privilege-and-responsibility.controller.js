(function () {
    'use strict';

    angular
        .module('app.pages.mindset')
        .controller('PrivilegeAndResponsibilityController', PrivilegeAndResponsibilityController);

    /* @ngInject */
    function PrivilegeAndResponsibilityController($scope, $state, pageService, userService, stepService) {

        var answersList = [];

        angular.extend($scope, {
            model: {
                first: '',
                second: '',
                third: '',
                fourth: '',
                text: '',
                businessName: _.get(userService, 'user.businessName'),
                result: ''
            },
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
            showInfoBlock: false,
            showVideoBlock: false,
            showStaticTextBlock: false,
            showDropdownBlock: false,
            showNotice: false,
            forward: true
        });

        $scope.checkDropdownModels = checkDropdownModels;
        $scope.closeNotice = closeNotice;
        $scope.sendData = sendData;
        // --- vars ---

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Privilege and Responsibility');

        userService.getUser().then(function (user) {
            if (!_.isEmpty(user)) {
                $scope.model.businessName = user.businessName;
            }
        });

        function sendData() {
            var urls = $state.current.name.split('.');
            var data = angular.extend({}, {
                first: $scope.model.first,
                second: $scope.model.second,
                third: $scope.model.third,
                fourth: $scope.model.fourth,
                text: $scope.model.text
            });

            return stepService.sendApiData(urls[urls.length - 1], data)
                .then(function (response) {
                    console.log(response);
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

            if (!_.isEmpty($scope.model.first) && !_.isEmpty($scope.model.second) && !_.isEmpty($scope.model.third) && !_.isEmpty($scope.model.fourth)) {

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

                if ($scope.model.first === value.label) {
                    $scope.model.result = 'provide for my family';
                    return true;
                }

                if ($scope.model.second === value.label) {
                    $scope.model.result = 'create jobs';
                    return true;
                }

                if ($scope.model.third === value.label) {
                    $scope.model.result = 'give more to my community';
                    return true;
                }

                if ($scope.model.fourth === value.label) {
                    $scope.model.result = 'helping the economy';
                    return true;
                }
            });
        }

        function closeNotice() {
            $scope.showNotice = false;
        }

        // If user selected two or more identical values, return false
        function findDuplicate() {

            var modelsArray = [$scope.model.first, $scope.model.second, $scope.model.third, $scope.model.fourth];
            var filteringModelsArray = _.uniq(modelsArray);

            return filteringModelsArray.length === modelsArray.length;
        }
    }


})();
