(function () {
    'use strict';

    angular
        .module('app.pages.settingsUser')
        .controller('PaymentsController', PaymentsController);

    /* @ngInject */
    function PaymentsController($scope,paymentsService,NgTableParams) {
        // paymentsService.getAllPayments()
        //     .then(function(payments) {
        //         console.log(payments);
        //     })

        function getValue(row) {
            return row[this.field];
        }

        $scope.cols = [
            {
                field: "productName",
                title: "Name",
                show: true,
                format: 'raw',
                getValue: function (row) {
                    // return '<a href="' + $state.href('plans.item', {product_id: row['_id']}) + '">' + row['productName'] + '</a>';
                }
            }, {
                field: "productDescription",
                title: "Description",
                show: true,
                format: 'raw',
                getValue: getValue
            }, {
                field: "costProduct",
                title: "Cost Product",
                show: true,
                getValue: getValue
            }, {
                field: "billingFrequency",
                title: "# Billing Frequency",
                show: true,
                getValue: getValue
            }, {
                field: "expertHours",
                title: "Expert Hours",
                show: true,
                getValue: getValue
            }, {
                field: "amountFirstPayment",
                title: "Amount First Payment",
                show: true,
                getValue: getValue
            }, {
                field: "createdAt",
                title: "Date Created",
                show: true,
                getValue: getValue
            }, {
                field: "action",
                title: "",
                format: 'compile',
                getValue: function (row) {
                    return '<button class="btn btn-danger btn-sm" ng-click="delete(row)"><span class="glyphicon glyphicon-trash"></span></button>';
                }
            }
        ];

        $scope.list = new NgTableParams({},
            {
                getData: function (params) {
                    return paymentsService.getAllPayments()
                        .then(function (response) {
                            console.log(response.data)
                            // return response.data;
                        });
                }
            }
        );
    }
}());