(function () {
    'use strict';

    angular
        .module('app.services')
        .service('paymentsService', paymentsService);

    /* @ngInject */
    function paymentsService(apiService) {

        this.getAllPayments = getAllPayments;

        //////////////////////////////////

        function getAllPayments() {
            return apiService.rest.all('payments').getList();
        }
    }
}());