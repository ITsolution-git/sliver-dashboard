(function () {
    'use strict';

    angular
        .module('app.services')
        .service('stepService', stepService);

    function stepService(apiService) {

        this.sendApiData = sendApiData;

        ///////////////////////////////

        function sendApiData(url, data) {
            return apiService.rest.all(url).post(data);
        }
    }
}());