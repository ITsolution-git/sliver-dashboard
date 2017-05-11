(function () {
    'use strict';

    angular
        .module('app.pages.idealClient')
        .controller('NameYourIdealClientController', NameYourIdealClientController);

    function NameYourIdealClientController($scope, pageService) {

        angular.extend($scope, {
            model: {
                firstName: ''
            },
            showVideoBlock: false,
            showStaticTextBlock: false,
            showIdealClientNameBlock: false
        });


        // --- vars ---

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Who Are Your Ideal Clients');

    }
}());