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
            .state('statement.index', {
                url: '',
                controller: '',
                template: '<h1>Hello statement</h1>'
            })
    }
}());