(function () {
    'use strict';

    angular
        .module('manage.partners.module')
        .controller('partnersItemController', partnersItemController);

    /* @ngInject */
    function partnersItemController($scope, partnerService, coupons, pageService, productsService, couponService, toaster, $stateParams, $state) {

        angular.extend($scope, {
            partner: {},
            partnerId: $stateParams.partner_id,
            coupons: coupons,
            //deleteItem: deleteItem,
            createOrSave: createOrSave,

        });
        if (!$scope.partnerId) {
            pageService
                .addCrumb({ name: 'Add', path: 'partners.add' })
                .setPageTitle('Create Partner');
            $scope.partner = {};
        } else {
            partnerService.get($scope.partnerId).then(function (response) {
                $scope.partner = response.data;
                pageService
                    .addCrumb({ name: $scope.partner.name + ' ' + $scope.partner.lastName, path: 'partners.list' })
                    .setPageTitle('Edit Partner');
            });
        }
        function createOrSave(event) {
            update().then(function () {
                toaster.pop({ type: 'success', body: 'Partner Saved!', timeout: 1000 });
                $state.go('partners.list');
            }).catch(function (err) {
                toaster.pop({ type: 'error', body: err.data.message });
            });
        }

        function update() {
            if ($scope.partnerId) {
                return partnerService.update($scope.partner);
            } else {
                return partnerService.add($scope.partner);
            }
        }

    }
}());