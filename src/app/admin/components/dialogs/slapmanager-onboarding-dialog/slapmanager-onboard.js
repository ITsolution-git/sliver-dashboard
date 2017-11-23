(function () {
    'use strict';

    angular
        .module('adminapp.components')
        .controller('SlapManagerOnboardingDialogController', SlapManagerOnboardingDialogController);

    /* @ngInject */
    function SlapManagerOnboardingDialogController($scope, $state) {
        $scope.formData.journey = {name: 'Onboarding Call', section: 'onboard'}
    }
}());