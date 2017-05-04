(function () {
    'use strict';

    angular
        .module('app.pages.main')
        .controller('PrivilegeAndResponsibilityController', PrivilegeAndResponsibilityController);

    /* @ngInject */
    function PrivilegeAndResponsibilityController($scope, pageService, userService) {

        angular.extend($scope, {
            model: {
                first: '',
                second: '',
                third: '',
                fourth: '',
                businessName: _.get(userService, 'user.businessName')
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
            showInfoBlock: false
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
            }
        }
    }


})();
