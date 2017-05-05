(function () {
    'use strict';

    angular
        .module('app.pages.statement')
        .config(moduleConfig);

    function moduleConfig($stateProvider) {
        $stateProvider
            .state('statement', {
                data: {
                    access: '@'
                },
                abstract: true,
                url: '/statement',
                parent: 'default',
                views: {
                    content: {
                        template: '<ui-view />'
                    }
                }
            })
            .state('statement.overview', {
                url: '/overview',
                controller: '',
                templateUrl: 'pages/statement/overview/overview.html'
            })
            .state('statement.yourStatement', {
                url: '/yourSlapStatement',
                controller: '',
                templateUrl: 'pages/statement/yourStatement/your-statement.html'
            })

    }
}());