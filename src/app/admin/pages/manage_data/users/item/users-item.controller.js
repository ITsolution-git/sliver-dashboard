(function () {
    'use strict';

    angular
        .module('manage.users.module')
        .controller('AdminUsersItemController', AdminUsersItemController);

    /* @ngInject */
    function AdminUsersItemController($scope, $state, pageService, adminUserService, NgTableParams, $mdToast, $q, Restangular, $mdDialog, $timeout, $rootScope, commonDialogService, $stateParams, toaster) {
        angular.extend($scope,  {
            user: {},
            userID: $stateParams.user_id,
            ROLES: adminUserService.ROLES,
            STATUSES: adminUserService.STATUSES,

            deleteItem: deleteItem,
            createOrSave: createOrSave
        });


        pageService
            .reset()
            .setShowBC(true)
            .addCrumb({name: 'Users', path: 'users.list'});

        if (!$scope.userID) {
            pageService
                .addCrumb({name: 'Add', path: 'users.add'})
                .setPageTitle('Create User');
            $scope.user = {};
            $scope.user.role = adminUserService.ROLE_ADMIN;
            $scope.user.status = adminUserService.STATUS_ACTIVE;
        } else {
            adminUserService.get($scope.userID).then(function (response) {
                $scope.user = response.data;
                
                pageService
                    .addCrumb({name: $scope.user.name + ' ' + $scope.user.lastName, path: 'users.list'})
                    .setPageTitle('Edit User');
            });
        }

        function createOrSave(event) {
            update().then(function(){
                toaster.pop({type: 'success', body: 'User saved.'});
                $state.go('users.list');
            }).catch(function(err){
                console.log(err);
            });
        }

        function update() {
            if($scope.userID){
                return adminUserService.update($scope.user);
            } else {
                return adminUserService.add($scope.user);
            }
        }
        function deleteItem(event) {
            var success = function(){

                adminUserService.delete($scope.user).then(function() {
                    toaster.pop({type: 'success', body: 'User deleted.'});
                    $state.go('users.list');
                })
                .catch(function(err) {
                    console.log(err);
                });
            }
            commonDialogService.openDeleteItemDialog(event, 'Do you really want to delete?', success);

        }

    }
}());