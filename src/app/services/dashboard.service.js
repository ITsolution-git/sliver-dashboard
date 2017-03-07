(function () {
    'use strict';

    angular
        .module('app.services')
        .service('dashboardService', dashboardService);

    /* @ngInject */
    function dashboardService(apiService) {
        var me = this;

        me.count = function (range) {
            return me.all().getList(angular.extend({range: range}));
        };
        me.graph = function (range, currentData) {
            return me.all().one('graph').get(
                angular.extend(
                    {range: range, data: currentData}));
        };

        me.countapp = function (range) {
            return me.all().one('userapps').get(angular.extend({range: range}));
        };

        me.all = function () {
            return apiService.rest.all('dashboard')
        };
    }
})();