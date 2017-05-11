(function() {
    'use strict';

    angular
        .module('app.pages.statement')
        .controller('YourStatementController', YourStatementController);

    /* @ngInject */
    function YourStatementController($scope, pageService, userService) {

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
            showFormBlock: false
        });


        // --- vars ---

        userService.getUser().then(function (user) {
            $scope.model.businessName = user.businessName;
        });

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('SLAP | Your SLAPstatement');

    }
}());