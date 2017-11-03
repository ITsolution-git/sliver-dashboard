(function() {
    'use strict';

    angular
        .module('app.services')
        .service('expertReportService', expertReportService);

    function expertReportService(adminApiService) {

        this.post = function post(expertReport) {
            return adminApiService.rest.all('expert-report').post(expertReport);
        }

    }
}());
