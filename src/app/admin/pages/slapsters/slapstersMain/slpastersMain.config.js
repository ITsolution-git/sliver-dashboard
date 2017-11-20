(function () {
    'use strict';

    angular
        .module('slapsters.main.module')
        .config(moduleConfig);

    function moduleConfig($stateProvider) {
        $stateProvider
            .state('slapsters', {
                abstract: true,
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                url: '/slapsters',
                parent: 'admin',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                }

            })
            .state('slapsters.list', {
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                url: '',
                controller: 'AdminSlapstersListController',
                templateUrl: 'admin/pages/slapsters/slapstersMain/list/slapsters-list.html'
            })
            .state('slapsters.item', {
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                resolve: {
                    excuteItems: function (excuteItemService, $stateParams, $state) {
                        return excuteItemService.loadExcuteItemsByUser($stateParams.user_id)
                        .catch(function(err) { console.log(err); $state.go('slapsters'); });
                    },
                    buildData: function (stepService, $stateParams, $state) {
                        return stepService.getAllStepDataByUser($stateParams.user_id).then(function(response){
                            return response.data;
                        }).catch(function(err) { console.log(err); $state.go('slapsters'); });
                    },
                    productData: function (productsService, $state) {
                        return productsService.getAllProducts().then(function(response) {
                            return  response.data;
                        }).catch(function(err) { console.log(err); $state.go('slapsters'); });
                    },
                    promocodeData: function (couponService, $state) {
                        return couponService.list()
                        .then(function (response) {
                            return response.data;
                        }).catch(function(err) { console.log(err); $state.go('slapsters'); });
                    },
                    partners: function (partnerService, $state) {
                        return partnerService.list().then(function(response){
                            return response.data;
                        }).catch(function (err) { console.log(err); $state.go('slapsters'); });
                    }
                },
                url: '/{user_id}',
                controller: 'AdminSlapstersItemController',
                templateUrl: 'admin/pages/slapsters/slapstersMain/item/slapsters-item.html'
            });
    }
}());