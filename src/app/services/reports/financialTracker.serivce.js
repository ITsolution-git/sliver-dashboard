(function() {
    'use strict';

    angular
        .module('app.services')
        .service('financialTrackerService', financialTrackerService);

    function financialTrackerService(apiService) {

        this.list = list;
        this.transformationData = transformationData;

        ////////////////

        function list() {
            return apiService.rest.all('financialTracker').getList();
        }

        function transformationData(data) {
            var dataTable = [];

            data.forEach(function(item) {
                var row = {coupon:{}};
                row.userId = item.user._id;
                row.userName = item.user.name + " " +  item.user.lastName;
                row.business = item.user.businessName;
                row.paymentDate = item.payment.paymentDate;
                row.programName = item.payment.products.map(function(item) {
                    return item.name;
                }).join('/');
                row.amountCharges = item.payment.amountCharges;
                row.amountSaved = item.payment.amountSaved;
                row.discount = null;
                item.payment.products.forEach(function(product) {
                    if(product.cost) row.discount = product.cost - product.amount;
                });
                row.status = item.payment.status;
                row.coupon.name = item.coupon ? item.coupon.name : '-';
                row.coupon.code = item.coupon ? item.coupon.code : '-';

                dataTable.push(row);
            });

            return dataTable;
        }
    }
}());