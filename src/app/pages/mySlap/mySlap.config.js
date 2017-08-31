(function () {
    'use strict';

    angular
        .module('app.pages.mySlap')
        .config(moduleConfig);

    function moduleConfig($stateProvider) {
        $stateProvider
            .state('mySlap', {
                data: {
                    access: '@'
                },
                parent: 'withNavbar',
                url: '/myslap',
                views: {
                    content: {
                        controller: 'mySlapController',
                        templateUrl: 'pages/mySlap/mySlap.html'
                    }
                },
                
            })
    }
}());