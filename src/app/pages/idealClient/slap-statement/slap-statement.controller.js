(function () {
    'use strict';

    angular
        .module('app.pages.idealClient')
        .controller('SlapStatementController', SlapStatementController);

    function SlapStatementController($scope, pageService) {

        angular.extend($scope, {
            model: {
                first: 'Dropdown Label'
            },
            showContent: false,
            showVideoBlock: false,
            showStaticTextBlock: false
        });

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('SLAPstatement');
    }
}());