(function() {
    'use strict';

    angular
        .module('app.pages.statement')
        .controller('Step1SummaryController', Step1SummaryController);

    function Step1SummaryController($scope, $state, pageService, userService, stepService) {

        angular.extend($scope, {
            model: {
                first: '0',
                second: '',
                third: '0',
                fourth: '',
                fifth: '0',
                sixth: '',
                businessName: ''
            },
            showVideoBlock: false,
            showStaticTextBlock: false,
            showFormBlock: false,
            forward: true
        });

        $scope.sendData = sendData;

        userService.getUser().then(function (user) {
            $scope.model.businessName = user.businessName;
        });

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('SLAP | Step 1 SLAPsummary');



        function sendData() {
            var urls = $state.current.name.split('.');

            return stepService.sendApiData(urls[urls.length - 1], $scope.model)
                .then(function (response) {
                    console.log(response);
                });
        }
    }
}());