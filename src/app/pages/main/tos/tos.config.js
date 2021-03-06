(function () {
    'use strict';

    angular
        .module('app.pages.tos')
        .config(moduleConfig);

    function moduleConfig($stateProvider) {
        $stateProvider
            .state('tos', {
                data: {
                    access: '#'
                },
                parent: 'withNavbarWithoutLinks',
                url: '/tc',
                views: {
                    content: {
                        controller: 'tosController',
                        templateUrl: 'pages/main/tos/tos.html'
                    }
                }
            })
    }
}());
