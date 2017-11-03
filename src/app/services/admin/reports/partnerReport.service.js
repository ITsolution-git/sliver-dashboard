(function() {
    'use strict';

    angular
        .module('app.services')
        .service('partnerReportService', partnerReportService);

    function partnerReportService(adminApiService) {

        this.post = function post(partnerReport) {
            return adminApiService.rest.all('partner-report').post(partnerReport);
        }

    }
}());
