(function () {
    'use strict';

    angular
        .module('app.services')
        .service('adminStatisticService', adminStatisticService);

    /* @ngInject */
    function adminStatisticService($q, adminApiService, $rootScope) {
                
        self.get = function () {
            return adminApiService.rest.all('statistic').getList();
        };

        return self;
    }
})();