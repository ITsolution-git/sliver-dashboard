(function() {
    'use strict';

    angular
        .module('app.pages.statement')
        .controller('YourStatementController', YourStatementController);

    /* @ngInject */
    function YourStatementController($scope, $state, pageService, userService, stepService) {

        angular.extend($scope, {
            model: {
                first: '0',
                second: '',
                third: '0',
                fourth: '',
                fifth: '0',
                businessName: ''
            },
            showVideoBlock: false,
            showStaticTextBlock: false,
            showFormBlock: false,
            forward: true
        });

        $scope.sendData = sendData;


        // --- vars ---

        userService.getUser().then(function (user) {
            $scope.model.businessName = user.name + ' ' + user.lastName;
        });

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('SLAP | Your SLAPstatement');

        function sendData() {
            var urls = $state.current.name.split('.');

            return stepService.sendApiData(urls[urls.length - 1], $scope.model)
                .then(function (response) {
                    console.log(response);
                });
        }
    }
}());