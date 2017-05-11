(function () {
    'use strict';

    angular
        .module('app.pages.idealClient')
        .controller('DefineYourIdealClientController', DefineYourIdealClientController);

    function DefineYourIdealClientController($scope, pageService) {

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