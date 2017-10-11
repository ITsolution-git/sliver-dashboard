(function () {
    'use strict';

    angular
        .module('manage.users.module')
        .controller('AdminSlapstersListController', AdminSlapstersListController);

    function AdminSlapstersListController($scope, $state, pageService, adminUserService, NgTableParams, $mdToast, $q, Restangular, $mdDialog, $timeout, $rootScope, commonDialogService, permissionService, $auth, userService, apiService) {
        angular.extend($scope,  {
            gridData: {
                gridOptions: {data:[]},
                gridActions: {}
            },
            slpasters: [],
            searchKeyword: '',
            dataloaded: false,
            dataReady: false,
            ROLES: adminUserService.ROLES,
            STATUSES: adminUserService.STATUSES,
            itemPerPage: 5,

            buildGridData: buildGridData,
            getItemPerPage: getItemPerPage,
            deleteItem: deleteItem,
            adminBuild: adminBuild
        });

        pageService
            .reset()
            .addCrumb({name: 'Slpasters', path: 'slapsters.list'})
            .setPageTitle('Slapsters');


        $timeout(activate);
        function activate() {
            reloadData();
            
        }
        function getItemPerPage(value) {
            $scope.itemPerPage = value;
        }
        function reloadData() {
            $scope.dataloaded = false;
            adminUserService.list()
            .then(function (response) {
                var slapsters = response.data.filter(function(user) {
                    return user.role == 4;
                });
                slapsters = permissionService.filterSlapstersByPermission(slapsters);

                var accounts = _.groupBy(slapsters, function(user) { return user.businessName; });
                $scope.slpasters = [];
                _.each(accounts, function(account){
                    $scope.slpasters.push({
                        current: account[0],  //TODO: select appropriate slapsters
                        accounts: account
                    });
                });
                
                $scope.dataloaded = true;
                buildGridData();
            });
        }

    
        function buildGridData() {
            var data = {}; 
            
            $scope.dataReady = false;
            $timeout(function(){

                var filtered = $scope.slpasters.filter(function(slapster){
                    var valid = false;
                    var user = slapster.current;
                    if ($scope.searchKeyword.trim() != ''){
                            if (user.businessName.toLowerCase().indexOf($scope.searchKeyword) != -1)
                            valid = true;
                            if (user.name.toLowerCase().indexOf($scope.searchKeyword) != -1)
                            valid = true;
                            if (user.lastName.toLowerCase().indexOf($scope.searchKeyword) != -1)
                            valid = true;
                            if (user.email.toLowerCase().indexOf($scope.searchKeyword) != -1)
                            valid = true;
                    } else { valid = true; }
                    return valid;
                })

                data.data =  [];
                _.each(filtered, function(slapster){
                    var user = slapster.current;
                    
                    var role = _.find($scope.ROLES, {id: user.role});
                    user.displayRole = role ? role.name : '';
                    var status = _.find($scope.STATUSES, {id: user.status});
                    user.displayStatus = status ? status.name : '';


                    user.countslapyear = slapster.accounts.length;
                    
                    data.data.push(user);
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
            var success = function(){

                item.remove().then(function() {
                    reloadData();
                })
                .catch(function(err) {
                    console.log(err);
                });
            }
            commonDialogService.openDeleteItemDialog(event, 'Do you really want to delete?', success);
        } 
        
        function adminBuild(item) {

            apiService.adminToken = $auth.getToken();

            adminUserService.getToken(item._id).then(function (res){
                
                $auth.setToken(res.data.token);
                $state.go('home');
                document.location.reload(true);
                
            });
        }
        

    }
}());