(function () {
    'use strict';

    angular
        .module('manage.products.module')
        .controller('ProductsManageController', ProductsManageController);

    // ProductsManageController.$inject = ['productsService'];

    function ProductsManageController($scope, $state, BCService, productsService, NgTableParams) {
        // var vm = this;

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
                    return '<a href="' + $state.href('plans.item', {product_id: row['_id']}) + '">' + row['productName'] + '</a>';
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
                    return productsService.list()
                        .then(function (response) {
                            return response.data;
                        });
                }
            }
        );

        $scope.delete = function(row) {
            productsService.delete(row).then(function() {
                $scope.list.reload();
            })
            .catch(function(err) {
                console.log(err);
            });
        };

        BCService
            .reset()
            .addCrumb({name: 'Plans', path: 'plans.list'})
            .setPageTitle('Manage Plans');
    }
}());