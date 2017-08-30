(function () {
    'use strict';

    angular
        .module('app.pages.slapSchool')
        .config(moduleConfig);

    function moduleConfig($stateProvider) {
        $stateProvider
            .state('slapSchool', {
                data: {
                    access: '@'
                },
                parent: 'withNavbar',
                url: '/school',
                views: {
                    content: {
                        controller: 'SlapSchoolController',
                        templateUrl: 'pages/slapSchool/slapSchool.html'
                    }
                }
            })
    }
}());