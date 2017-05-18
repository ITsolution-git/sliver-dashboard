(function () {
    'use strict';

    angular
        .module('app.pages.mindset')
        .controller('AreYourStuckController', AreYourStuckController);

    /* @ngInject */
    function AreYourStuckController($scope,mindsetService,pageService,stepService,$state) {

        angular.extend($scope, {
            showInfoBlock: false,
            showVideoBlock: false,
            showStaticTextBlock: false,
            sliders: mindsetService.getSliders(),
            forward: true
        });

        $scope.sendData = sendData;

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Are You Stuck?');

        function sendData() {
            var urls = $state.current.name.split('.');
            var data = angular.extend({}, {
                sliders: $scope.sliders
            });

            return stepService.sendApiData(urls[urls.length - 1], data.sliders)
                .then(function (response) {
                    console.log(response);
                });
        }
    }
}());