(function () {
    'use strict';

    angular
        .module('app.pages.mindset')
        .controller('PrivilegeAndResponsibilityController', PrivilegeAndResponsibilityController);

    /* @ngInject */
    function PrivilegeAndResponsibilityController($scope, pageService, userService) {

        angular.extend($scope, {
            model: {
                first: '',
                second: '',
                third: '',
                fourth: '',
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
            showDropdownBlock: false
        });

        $scope.checkDropdownModels = checkDropdownModels;
        // --- vars ---

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Dashboard');

        userService.getUser().then(function (user) {
            if (!_.isEmpty(user)) {
                $scope.model.businessName = user.businessName;
            }
        });

        function checkDropdownModels() {
            if (!_.isEmpty($scope.model.first) && !_.isEmpty($scope.model.second) && !_.isEmpty($scope.model.third) && !_.isEmpty($scope.model.fourth)) {
                $scope.showInfoBlock = true;

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
        }
    }


})();
