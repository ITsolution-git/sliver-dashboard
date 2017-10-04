(function () {
    'use strict';

    angular
        .module('app.pages.slapExcute')
        .config(moduleConfig);

    function moduleConfig($stateProvider) {
        $stateProvider
            .state('slapExcute', {
                data: {
                    access: '@'
                },
                abstract: true,
                url: '/execute',
                parent: 'withNavbar',
                views: {
                    content: {
                        template: '<ui-view />'
                    }
                }
            })
            .state('slapExcute.main', {
                url: '',
                resolve: {
                    excuteItems: function (excuteItemService) {
                        return excuteItemService.loadExcuteItems();
                    },
                    userAllData: function (stepService) {
                        return stepService.getAllUserData(this)
                    }
                },
                controller: 'SlapExcuteMainController',
                templateUrl: 'pages/slapExcute/main/slapExcuteMain.html'
            })
            .state('slapExcute.results', {
                url: '/results',
                resolve: {
                    excuteItems: function (excuteItemService) {
                        return excuteItemService.loadExcuteItems();
                    },
                    userAllData: function (stepService) {
                        return stepService.getAllUserData(this)
                    }
                },
                controller: 'SlapExcuteResultsController',
                templateUrl: 'pages/slapExcute/results/slapExcuteResults.html'
            });
    }
}());