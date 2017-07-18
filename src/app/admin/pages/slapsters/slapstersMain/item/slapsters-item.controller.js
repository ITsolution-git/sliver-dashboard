(function () {
    'use strict';

    angular
        .module('manage.users.module')
        .controller('AdminSlapstersItemController', AdminSlapstersItemController);

    /* @ngInject */
    function AdminSlapstersItemController($scope, $state, pageService, adminUserService, NgTableParams, $mdToast, $q, Restangular, $mdDialog, $timeout, $rootScope, commonDialogService, $stateParams, toaster) {
        angular.extend($scope,  {
            user: {},
            userID: $stateParams.user_id,
            ROLES: adminUserService.ROLES,
            STATUSES: adminUserService.STATUSES,
            accounts: [],
            deleteItem: deleteItem,
            createOrSave: createOrSave
        });
        

        pageService
            .reset()
            .setShowBC(true)
            .addCrumb({name: 'Slapster', path: 'slapsters.list'});

        $timeout(activate);
        function activate() {
            reloadData();
            
        }

        function reloadData() {
            $scope.dataloaded = false;
            adminUserService.list()
            .then(function (response) {
                $scope.accounts = [];
                $scope.user = _.find(response.data, {_id: $scope.userID});
                if (!$scope.user)
                    $state.go('slapsters.list');

                pageService
                    .addCrumb({name: $scope.user.businessName + ' / ' + ' Created on ' + moment($scope.user.createdAt).format('YYYY-MM-DD'), path: 'users.list'})
                    .setPageTitle($scope.user.businessName);

                
                $scope.dataloaded = true;
            });
        }

        adminUserService.get($scope.userID).then(function (response) {
            $scope.user = response.data;
            
        });
        

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