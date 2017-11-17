(function () {
    'use strict';

    angular
        .module('manage.testusers.module')
        .controller('AdminTestUsersManageController', AdminTestUsersManageController);

    /* @ngInject */
    function AdminTestUsersManageController($scope, $state, pageService, adminUserService, NgTableParams, $mdToast, $q, Restangular, $mdDialog, $timeout, $rootScope, commonDialogService, $stateParams, toaster) {
        angular.extend($scope, {
            gridData: {
                gridOptions: { data: [] },
                gridActions: {}
            },
            users: [],
            searchKeyword: '',
            dataloaded: false,
            dataReady: false,
            ROLES: adminUserService.ROLES,
            STATUSES: adminUserService.STATUSES,
            itemPerPage: 5,

            buildGridData: buildGridData,
            getItemPerPage: getItemPerPage,
            deleteItem: deleteItem
        });

        pageService
            .reset()
            .addCrumb({ name: 'Test Users', path: 'testusers.list' })
            .setPageTitle('Manage Test Users');


        $timeout(activate);
        function activate() {
            reloadData();
        }

        function getItemPerPage(value) {
            $scope.itemPerPage = value;
        }

        function reloadData() {
            $scope.dataloaded = false;
            adminUserService.listTestUsers()
                .then(function (response) {
                    $scope.users = response.data;
                    $scope.dataloaded = true;
                    buildGridData();
                });
        }


        function buildGridData() {
            var data = {};

            $scope.dataReady = false;
            $timeout(function () {

                var filtered = $scope.users.filter(function (user) {
                    var valid = false;
                    if (user.status === 'archived') return valid;
                    if (user.role === 4 || user.role === 5) return valid;
                    if ($scope.searchKeyword.trim() != '') {
                        if (user.businessName.toLowerCase().indexOf($scope.searchKeyword.toLowerCase()) != -1)
                            valid = true;
                        if (user.name.toLowerCase().indexOf($scope.searchKeyword.toLowerCase()) != -1)
                            valid = true;
                        if (user.lastName.toLowerCase().indexOf($scope.searchKeyword.toLowerCase()) != -1)
                            valid = true;
                        if (user.email.toLowerCase().indexOf($scope.searchKeyword.toLowerCase()) != -1)
                            valid = true;
                    } else { valid = true; }
                    return valid;
                })

                data.data = filtered.map(function (user) {
                    var role = _.find($scope.ROLES, { id: user.role });
                    user.displayRole = role ? role.name : '';
                    var status = _.find($scope.STATUSES, { id: user.status });
                    user.displayStatus = status ? status.name : '';
                    return user;
                });

                data.urlSync = false;
                $scope.gridData = {
                    gridOptions: data,
                    gridActions: {},
                };
                $scope.dataReady = true;
            })
            // $scope.$apply(function () {
            // });

        }

        function deleteItem(event, item) {
            var success = function () {

                item.remove().then(function () {
                    reloadData();
                })
                    .catch(function (err) {
                        console.log(err);
                    });
            }
            commonDialogService.openDeleteItemDialog(event, 'Are you sure you want to remove this account?', 'Archive', success);
        }
    }
}());