(function () {
    'use strict';

    angular
        .module('app.pages.mindset')
        .controller('YourCommitmentController', YourCommitmentController);

    /* @ngInject */
    function YourCommitmentController($scope, mindsetService, pageService, stepService, $state) {

        angular.extend($scope, {
            showInfoBlock: false,
            showVideoBlock: false,
            showStaticTextBlock: false,
            sliders: mindsetService.getSliders()
        });

        $scope.forward = true;

        $scope.sendData = sendData;

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Your Commitment To Us');

        function sendData() {
            var urls = $state.current.name.split('.');

            return stepService.sendApiData(urls[urls.length - 1], $scope.sliders)
                .then(function (response) {
                    console.log(response);
                });
        }
    }
}());