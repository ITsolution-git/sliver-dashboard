(function () {
    'use strict';

    angular
        .module('app.pages.getHelp')
        .config(moduleConfig);

    function moduleConfig($stateProvider) {
        $stateProvider
            .state('get-help', {
                parent: 'withNavbar',
                url: '/help',
                data: {
                    access: '@'
                },
                views: {
                    content: {
                        controller: 'GetHelpController',
                        templateUrl: 'pages/getHelp/getHelp.html'
                    }
                }
            })
    }
}());