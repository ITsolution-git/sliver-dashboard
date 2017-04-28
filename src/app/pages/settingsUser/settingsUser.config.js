(function() {
    'use strict';

    angular
        .module('app.pages.settingsUser')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider) {
        $stateProvider
            .state('payments', {
                data: {
                    access: '@'
                },
                parent: 'default',
                url: '/paymetns',
                views: {
                    content: {
                        controller: 'PaymentsController',
                        templateUrl: 'pages/settingsUser/payments/payments.html'
                    }
                }
            })
    }
}());