(function () {
    'use strict';

    angular
        .module('app.pages.main')
        .controller('GetHelpController', GetHelpController);

    /* @ngInject */
    function GetHelpController($scope, $auth, $state, toaster, pageService, userService, adminUserService) {

        $scope.sendMessage = function () {
            var sendObject = {
                user_email: userService.user.email,
                message: $scope.message
            };
            userService.getHelp(sendObject).then(function (res) {
                console.log(res);
                toaster.pop({ type: 'success', body: "Email Sent successful!" });
            });
        }
    }
})(); 