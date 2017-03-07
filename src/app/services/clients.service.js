(function () {
    'use strict';

    angular
        .module('app.services')
        .service('clientsService', clientsService);

    /* @ngInject */
    function clientsService(apiService) {
        var me = this;

        // --- vars ---

        // --- methods ---

        me.one = function (clientId) {
            // api/users/10
            return me.all().one('', clientId).get();
        };

        me.list = function (params) {
            // api/v1/users/?count=10&page=1
            return me.all().getList(params);
        };

        me.listByCompany = function (companyId, params) {
            return me.all().getList(params);
        };

        me.all = function () {
            return apiService.rest.all('users')
        };

    }
})();