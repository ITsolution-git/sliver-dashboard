(function () {
    'use strict';

    angular
        .module('app.services')
        .service('paymentsService', paymentsService);

    /* @ngInject */
    function paymentsService(apiService) {

        this.getAllPayments = getAllPayments;

        this.transformationData = transformationData;

        //////////////////////////////////

        function transformationData(data) {
            var dataTable = [];

            data.forEach(function (item) {
                var row = {};
                row.paymentDate = item.paymentDate;
                row.programName = item.products.map(function (prod) {
                    return prod.name;
                }).join('/');
                row.costProduct = null;

                item.products.forEach(function (prod) {
                    row.costProduct += prod.cost ? prod.cost : prod.amount;
                });
                var discount = row.costProduct - item.amountCharges;
                row.discount = discount ? '-' + discount : '-';
                row.amountCharges = item.amountCharges;
                row.status = item.status;
                dataTable.push(row);
            });

            return dataTable;
        }

        function getAllPayments() {
            return apiService.rest.all('payments').getList();
        }
    }
}());