(function() {
    'use strict';

    angular
        .module('app.pages.statement')
        .controller('Step1SummaryController', Step1SummaryController);

    function Step1SummaryController($scope, pageService) {

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