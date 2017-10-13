(function () {
    'use strict';

    angular
        .module('reports.archivedAccounts.module')
        .config(moduleConfig);

    function moduleConfig($stateProvider) {
        $stateProvider
            .state('archive', {
                abstract: true,
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                url: '/archive',
                parent: 'admin',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                }

            })
            .state('archive.list', {
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                url: '',
                controller: 'AdminArchivedAccountsListController',
                templateUrl: 'admin/pages/reports/archived_accounts/list/archivedAccounts-list.html'
            })
            .state('archive.item', {
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                resolve: {
                    excuteItems: function (excuteItemService, $stateParams, $state) {
                        return excuteItemService.loadExcuteItemsByUser($stateParams.user_id)
                        .catch(function(err) { console.log(err); $state.go('archive'); });
                    },
                    buildData: function (stepService, $stateParams, $state) {
                        return stepService.getAllStepDataByUser($stateParams.user_id).then(function(response){
                            return response.data;
                        }).catch(function(err) { console.log(err); $state.go('archive'); });
                    },
                    productData: function (productsService, $state) {
                        return productsService.getAllProducts().then(function(response) {
                            return  response.data;
                        }).catch(function(err) { console.log(err); $state.go('archive'); });
                    },
                    promocodeData: function (couponService, $state) {
                        return couponService.list()
                        .then(function (response) {
                            return response.data;
                        }).catch(function(err) { console.log(err); $state.go('archive'); });
                    },
                    activityData: function (activityService, $stateParams, $state) {
                        return activityService.list($stateParams.user_id)
                        .then(function (response) {
                            return response.data;
                        }).catch(function(err) { console.log(err); $state.go('archive'); });
                    }
                },
                url: '/{user_id}',
                controller: 'AdminArchivedAccountsItemController',
                templateUrl: 'admin/pages/reports/archived_accounts/item/archivedAccounts-item.html'
            });
    }
}());