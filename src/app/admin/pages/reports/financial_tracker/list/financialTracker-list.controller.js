(function () {
    'use strict';

    angular
        .module('reports.financialTracker.module')
        .controller('FinancialTrackerList', FinancialTrackerList);

    /* @ngInject */
    function FinancialTrackerList($scope, BCService, financialTrackerService, NgTableParams) {
        $scope.cols = [
            {
                field: "userId",
                title: "Client ID",
                show: true,
                format: 'raw',
                getValue: getValue
            }, {
                field: "userName",
                title: "Clien name",
                show: true,
                format: 'raw',
                getValue: getValue
            }, {
                field: "business",
                title: "Business name",
                show: true,
                getValue: getValue
            }, {
                field: "paymentDate",
                title: "Payment date",
                show: true,
                format: 'raw',
                getValue: function (row) {
                    return moment(row['paymentDate']).format('ll');
                }
            }, {
                field: "programName",
                title: "Price for SLAPplan/Build",
                show: true,
                getValue: getValue
            },
            {
                field: "discount",
                title: "Discount/Promo code",
                show: true,
                format: 'compile',
                getValue: function (row) {
                    return '<a uib-popover="NAME/CODE ' + row['coupon']['name'] + '/' + row['coupon']['code'] + '" popover-trigger="\'mouseenter\'" href="">' + row['discount'] + '</a>';
                }
            }, {
                field: "amountCharges",
                title: "Total amount charged",
                show: true,
                format: 'raw',
                getValue: getValue
            }, {
                field: "amountSaved",
                title: "Total amount saved",
                show: true,
                format: 'raw',
                getValue: getValue
            }
        ];

        function getValue(row) {
            return row[this.field];
        }

        $scope.list = new NgTableParams({},
            {
                getData: function (params) {
                    return financialTrackerService.list()
                        .then(function (response) {
                            return financialTrackerService.transformationData(response.data);
                        });
                }
            }
        );

        BCService
            .reset()
            .addCrumb({name: 'Financial Tracker', path: 'financialTracker.list'})
            .setPageTitle('Financial Tracker');
    }
}());