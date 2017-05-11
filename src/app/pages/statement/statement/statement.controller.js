(function () {
    'use strict';

    angular
        .module('app.pages.statement')
        .controller('StatementController', StatementController);

    function StatementController($scope, pageService) {

        angular.extend($scope, {
            showVideoBlock: false,
            showStaticTextBlock: false
        });

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Statement');
    }
}());