(function () {
    'use strict';

    angular
        .module('app.pages.idealClient')
        .controller('Step3SummaryController', Step3SummaryController);
    
    function Step3SummaryController($scope, pageService) {

        angular.extend($scope, {
            showVideoBlock: false,
            showStaticTextBlock: false
        });

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Ideal Client');
    }
}());