(function () {
    'use strict';

    angular
        .module('app.pages.slapWorld')
        .config(moduleConfig);

    function moduleConfig($stateProvider) {
        $stateProvider
            .state('slapWorld', {
                data: {
                    access: '@'
                },
                parent: 'withNavbar',
                url: '/world',
                views: {
                    content: {
                        controller: 'SlapWorldController',
                        templateUrl: 'pages/slapWorld/slapWorld.html'
                    }
                }
            })
    }
}());