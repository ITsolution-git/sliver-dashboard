(function () {
    'use strict';

    angular
        .module('manage.partners.module')
        .controller('partnersManageController', partnersManageController);

    /* @ngInject */
    function partnersManageController($timeout, couponService, $scope, adminUserService, $state, pageService, partnerService, NgTableParams) {

        angular.extend($scope, {
            gridData: {
                gridOptions: { data: [] },
                gridActions: {}
            },
            // users: [],
            // searchKeyword: '',
            // dataloaded: false,
            // dataReady: false,
            // ROLES: adminUserService.ROLES,
            // STATUSES: adminUserService.STATUSES,
            // itemPerPage: 5,

            // buildGridData: buildGridData,
            // getItemPerPage: getItemPerPage,
            //deleteItem: deleteItem
        });
        $scope.cols = [
            {
                field: "name",
                title: "Name",
                show: true,
                format: 'raw',
                getValue: function (row) {
                    return '<a href="' + $state.href('partners.item', { partner_id: row['_id'] }) + '">' + row['name'] + '</a>';
                }
            }, {
                field: "lastName",
                title: "Last Name",
                show: true,
                format: 'raw',
                getValue: getValue
            },
            {
                field: "businessName",
                title: "Business Name",
                show: true,
                format: 'raw',
                getValue: getValue
            }, 
            {
                field: "email",
                title: "Email",
                show: true,
                getValue: getValue
            }, 
            {
                field: "additional_email",
                title: "Additional email",
                show: true,
                getValue: getValue
            },
             {
                field: "phone",
                title: "Phone",
                show: true,
                format: 'raw',
                getValue: getValue
            }, {
                field: "revenue_percent",
                title: "% Revenue Share owed to Partner",
                show: true,
                getValue: getValue
            }, {
                field: "partnership_overview",
                title: "Overview of Partnership",
                show: true,
                getValue: getValue
            }, {
                field: "snapshot",
                title: "Partner to receive SLAPsnapshot",
                show: true,
                getValue: getValue
            }, 
            {
                field: "action",
                title: "",
                format: 'compile',
                getValue: function (row) {
                    return '<button class="btn btn-danger btn-sm" ng-click="delete(row)"><span class="glyphicon glyphicon-trash"></span></button>';
                }
            }
        ];
        $scope.delete = function (row) {
            console.log(row);
            partnerService.delete(row).then(function () {
                $scope.list.reload();
            });
        };
        function getValue(row) {
            return row[this.field];
        }
        pageService
            .reset()
            .addCrumb({ name: 'Partners', path: 'patrners.list' })
            .setPageTitle('Manage Partners');
       // $timeout(activate);
        $scope.list = new NgTableParams({},
            {
                getData: function (params) {
                    return partnerService.list()
                        .then(function (response) {
                            // console.log(response.data);
                            console.log(response.data);
                            return response.data;
                        });
                }
            }
        );
        // function activate() {
        //     reloadData();
        // }
        // function getItemPerPage(value) {
        //     $scope.itemPerPage = value;
        // }
        // function reloadData() {
        //     $scope.dataloaded = false;
        //     adminUserService.list()
        //         .then(function (response) {
        //             $scope.partners = response.data.filter(function (user) {
        //                 return user.role == 5;
        //             });
        //             console.log($scope.partners);
        //             // var accounts = 
        //             // $scope.partners = _.groupBy(partners, function (user) { return user.businessName; });
        //             // console.log($scope.partners);

        //             $scope.dataloaded = true;
        //             $scope.dataReady = true;
        //             buildGridData();
        //         });
        // }
        // function buildGridData() {
        //     var data = {};

        //     $scope.dataReady = false;
        //     $timeout(function () {

        //         var filtered = $scope.partners.filter(function (user) {
        //             var valid = false;
        //             if (user.status === 'archived') return valid;
        //             if ($scope.searchKeyword.trim() != '') {
        //                 if (user.businessName.toLowerCase().indexOf($scope.searchKeyword) != -1)
        //                     valid = true;
        //                 if (user.name.toLowerCase().indexOf($scope.searchKeyword) != -1)
        //                     valid = true;
        //                 if (user.lastName.toLowerCase().indexOf($scope.searchKeyword) != -1)
        //                     valid = true;
        //                 if (user.email.toLowerCase().indexOf($scope.searchKeyword) != -1)
        //                     valid = true;
        //             } else { valid = true; }
        //             return valid;
        //         })

        //         data.data = filtered.map(function (user) {
        //             var role = _.find($scope.ROLES, { id: user.role });
        //             user.displayRole = role ? role.name : '';
        //             var status = _.find($scope.STATUSES, { id: user.status });
        //             user.displayStatus = status ? status.name : '';
        //             return user;
        //         });

        //         data.urlSync = false;
        //         $scope.gridData = {
        //             gridOptions: data,
        //             gridActions: {},
        //         };
        //         $scope.dataReady = true;
        //     })
        //     // $scope.$apply(function () {
        //     // });
        // }
        // function deleteItem(){

        // }
    }
}());