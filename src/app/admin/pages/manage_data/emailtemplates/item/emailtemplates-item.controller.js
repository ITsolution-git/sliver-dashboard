(function() {
    'use strict';

    angular
        .module('manage.emailtemplates.module')
        .controller('EmailtemplatesItemController', EmailtemplatesItemController);

    /* @ngInject */
    function EmailtemplatesItemController($scope, pageService ,toaster,$stateParams,$state, emailTemplateService) {

        $scope.emailTemplate = {
            
        };

        $scope.froalaOptions = {
            toolbarButtons : ["bold", "italic", "underline", "|", "align", "formatOL", "formatUL"]
        }
        pageService
            .reset()
            .setShowBC(true)
            .addCrumb({name: 'Email Template', path: 'emailtemplates.list'});

        if (!$stateParams.emailtemplate_name) {
            pageService
                .addCrumb({name: 'Add', path: 'emailtemplates.add'})
                .setPageTitle('New Email Temaplate');
        } else {
            emailTemplateService.get($stateParams.emailtemplate_name).then(function (response) {
                $scope.emailTemplate = response.data;

                pageService
                    .addCrumb({name: $stateParams.emailtemplate_name, path: 'emailtemplates.list'})
                    .setPageTitle('Edit "' + $stateParams.emailtemplate_name + '"');
            });
        }

        $scope.save = function() {
            // if(!$scope.emailTemplateForm.$valid) {
            //     toaster.pop({type: 'error', body: 'Please fill all fields required'});
            //     return;
            // }

            $scope.apply().then(function () {
                $state.go('emailtemplates.list');
            });
        };

        $scope.apply = function() {
            return $scope.update().then(
                function () {
                    toaster.pop({type: 'success', body: 'Success'});
                },
                function (err) {
                    // err.data.forEach(function (item) {
                    //     $scope.errors[item.param] = item.msg;
                    // });
                    console.log(err);
                })
        };

        $scope.update = function () {
            return ($stateParams.emailtemplate_name) ? emailTemplateService.update($scope.emailTemplate) : emailTemplateService.add($scope.emailTemplate);
        };

    }
}());