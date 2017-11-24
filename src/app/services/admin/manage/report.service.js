(function() {
    'use strict';

    angular
        .module('app.services')
        .service('reportService', reportService);

    /* @ngInject */
    function reportService(adminApiService, apiService) {

        this.add = function(report) {
            return adminApiService.rest.all('report').post(report);
        };

        this.list = function() {
            return adminApiService.rest.all('report').getList();
        };

        this.get = function(id) {
            return adminApiService.rest.all('report').one(id).get();
        };

        this.update = function(report) {
            return adminApiService.rest.all('report').one(report._id).customPUT(report);
        };

        this.delete = function(report) {
            return report.remove();
        }

        this.run = function(id) { 
            return adminApiService.rest.all('report-run').one(id).get();
        }

    }
}());