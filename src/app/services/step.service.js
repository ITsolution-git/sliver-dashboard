(function () {
    'use strict';

    angular
        .module('app.services')
        .service('stepService', stepService);

    function stepService(apiService) {

        this.sendApiData = sendApiData;
        this.getApiData = getApiData;

        ///////////////////////////////

        function sendApiData(url, data) {
            return apiService.rest.all(url).post(data);
        }

        function getApiData(url) {
            return apiService
                .rest
                .one(url)
                .get();
        }

    }
}());