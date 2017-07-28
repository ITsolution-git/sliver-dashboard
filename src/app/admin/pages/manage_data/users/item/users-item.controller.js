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
            createOrSave: createOrSave,

            showSetPasswordDialog: showSetPasswordDialog,
            password: {
                password: '',
                confirm_password: ''
            },
            setPassword: setPassword
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
                toaster.pop({type: 'error', body: err.data.message});
            });
        }

        function update() {
            if($scope.userID){
                return $scope.user.save();
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

        function showSetPasswordDialog($event) {
            $scope.password.password = '';
            $scope.password.confirm_password = '';
            
            $mdDialog.show({
                clickOutsideToClose: true,
                targetEvent: $event,
                scope: $scope, 
                preserveScope: true,
                templateUrl: 'admin/components/dialogs/password-dialog/password-dialog.html',
                controller: 'PasswordDialogController',
                autoWrap: true
            });
        }

        function setPassword($event) {
            $scope.user.password = $scope.password.password;
            createOrSave();
            $mdDialog.hide($event);
        }

        function showToast(message) {
            var toast = $mdToast.simple()
            .textContent(message)
            .action('OK')
            .hideDelay(3000)
            .position("bottom right");

            $mdToast.show(toast).then(function(response) {
                if ( response == 'ok' ) {
                    $mdToast.hide();
                }
            });
        }
    }
}());