(function () {
    'use strict';

    angular
        .module('app.pages.idealClient')
        .controller('NameYourIdealClientController', NameYourIdealClientController);

    function NameYourIdealClientController($scope, $state, pageService, stepService) {

        angular.extend($scope, {
            model: {
                firstName: ''
            },
            showVideoBlock: false,
            showStaticTextBlock: false,
            showIdealClientNameBlock: false,
            forward: true
        });

        $scope.sendData = sendData;


        // --- vars ---

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Name Your Ideal Client');



        function sendData() {
            var urls = $state.current.name.split('.');

            return stepService.sendApiData(urls[urls.length - 1], $scope.model)
                .then(function (response) {
                    console.log(response);
                });
        }

    }
}());