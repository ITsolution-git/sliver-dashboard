(function() {
    'use strict';

    angular
        .module('manage.coupon.module')
        .controller('CouponManageController', CouponManageController);

    /* @ngInject */
    function CouponManageController($scope, $state, BCService, couponService, NgTableParams) {

        $scope.cols = [
            {
                field: "name",
                title: "Name",
                show: true,
                format: 'raw',
                getValue: function (row) {
                    return '<a href="' + $state.href('coupon.item', {coupon_id: row['_id']}) + '">' + row['name'] + '</a>';
                }
            },{
                field: "typeCoupon",
                title: "Type",
                show: true,
                format: 'raw',
                getValue: function(row) {
                    return row['typeCoupon'] == 1 ? '<p>Percentage</p>' : '<p>Fixed Amount</p>';
                }
            }, {
                field: "amount",
                title: "Amount",
                show: true,
                getValue: getValue
            }, {
                field: "plan",
                title: "Applied on",
                show: true,
                format: 'raw',
                getValue: function(row) {
                    return row['plan'] ? row['plan'].productName : 'all';
                }
            }, {
                field: "redemption",
                title: "Maximum Redemption",
                show: true,
                getValue: getValue
            }, {
                field: "dateFrom",
                title: "Valid From",
                show: true,
                format: 'raw',
                getValue: function(row) {
                    return row['dateFrom'] ? moment(row['dateFrom']).format('ll') : '-';
                }
            },{
                field: "dateUntil",
                title: "Valid Until",
                show: true,
                format: 'raw',
                getValue: function(row) {
                    return row['dateUntil'] ? moment(row['dateUntil']).format('ll') : '-';
                }
            },{
                field: "duration",
                title: "Duration",
                show: true,
                format: 'raw',
                getValue: function(row) {
                    switch(row['duration']) {
                        case 1 : return '1';break;
                        case 2 : return '&#8734;';break;
                        case 3 : return row['durationLimited'];break;
                    }
                }
            },{
                field: "action",
                title: "",
                format: 'compile',
                getValue: function (row) {
                    return '<button class="btn btn-danger btn-sm" ng-click="delete(row)"><span class="glyphicon glyphicon-trash"></span></button>';
                }
            }
        ];

        function getValue(row) {
            return row[this.field];
        }

        $scope.list = new NgTableParams({},
            {
                getData: function (params) {
                    return couponService.list()
                        .then(function (response) {
                            // console.log(response.data);
                            return response.data;
                        });
                }
            }
        );

        $scope.delete = function(row) {
            couponService.delete(row).then(function() {
                $scope.list.reload();
            });
        };

        BCService
            .reset()
            .addCrumb({name: 'Coupon', path: 'coupon.list'})
            .setPageTitle('Manage Coupon');
    }
}());