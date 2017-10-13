(function () {
    'use strict';

    angular
        .module('app.services')
        .service('paymentsService', paymentsService);

    /* @ngInject */
    function paymentsService(apiService, adminApiService) {

        this.getAllPayments = getAllPayments;

        this.transformationData = transformationData;
        this.getAllPaymentsByUser = getAllPaymentsByUser;
        this.chargeUser = chargeUser;
        this.toggleSubscription = toggleSubscription;
        this.getStripePayments = getStripePayments;
        //////////////////////////////////

        function transformationData(data) {
            var dataTable = [];

            data.forEach(function (item) {
                // var row = {};
                // row.paymentDate = item.paymentDate;
                // row.programName = item.products.map(function (prod) {
                //     return prod.name;
                // }).join('/');
                // row.costProduct = null;
                //
                // item.products.forEach(function (prod) {
                //     row.costProduct += prod.cost ? prod.cost : prod.amount;
                // });
                // // var discount = row.costProduct - item.amountCharges;
                // // row.discount = discount ? '-' + discount : '-';
                // row.discount = row.costProduct - item.amountCharges;
                // row.amountCharges = item.amountCharges;
                // row.status = item.status;
                // row.couponId = item.couponId;
                dataTable.push(item);
            });

            return dataTable;
        }

        function getAllPayments() {
            return apiService.rest.all('payments').getList();
        }

        function getStripePayments(userId) {
            return apiService.rest.all('stripe-payments').getList();
        }

        function getAllPaymentsByUser(userId) {
            return adminApiService.rest.all('payments').all('paymentsByUser').all(userId).getList();
        }

        function chargeUser(product, userId) {
            return adminApiService.rest.all('payments').all('charge').all(userId).post(product);
        }

        function toggleSubscription(user) {
            let userId = user._id;
            let enable = !user.pausingPayment;
            return adminApiService.rest.all('payments').all('subscription').all('toggle').all(userId).post({
                "enable": enable
            });
        }
        
    }
}());