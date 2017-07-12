(function () {
    'use strict';

    angular
        .module('manage.products.module')
        .controller('ProductsItemController', ProductsItemController);

    /* @ngInject */
    function ProductsItemController($scope, BCService, productsService, toaster, $state, $stateParams) {
        $scope.product = {
            switchProduct: true,
            switchStatus: false,
            switchBuildType: true,
            // typeProduct: productsService.TYPE_PLAN,
            // status: productsService.ACTIVE,
            billingFrequency : 1,
            // buildType : productsService.BUILD_INSTALLMENTS
        };

        $scope.typeChange = function () {
            $scope.product.typeProduct = $scope.product.switchProduct ? productsService.TYPE_PLAN : productsService.TYPE_BUILD;
            $scope.product.amountFirstPayment = $scope.product.switchProduct ? null : $scope.product.amountFirstPayment;
            // $scope.product.buildType = $scope.product.switchProduct ? null : productsService.BUILD_INSTALLMENTS;
        };

        $scope.statusChange = function () {
            $scope.product.status = $scope.product.switchStatus ? productsService.ACTIVE : productsService.INACTIVE;
        };

        $scope.buildTypeChange = function () {
            $scope.product.buildType = $scope.product.switchBuildType ? productsService.BUILD_INSTALLMENTS : productsService.BUILD_ONETIME;
            $scope.product.billingFrequency = $scope.product.switchBuildType ?  $scope.product.billingFrequency : 1;
            $scope.product.amountFirstPayment = $scope.product.switchBuildType ? $scope.product.amountFirstPayment : null;

        };

        $scope.errors = {};

        $scope.productID = $stateParams.product_id;

        $scope.select_month = productsService.getSelectMonth();

        $scope.save = function () {
            $scope.apply().then(function () {
                $state.go('plans.list');
            });
        };
        $scope.apply = function () {
            return $scope.update().then(
                function (response) {
                    toaster.pop({type: 'success', body: 'Data success saved'});
                },
                function (err) {
                    err.data.forEach(function (item) {
                        $scope.errors[item.param] = item.msg;
                    });
                })
        };

        $scope.update = function () {
            return ($stateParams.product_id) ? productsService.update($scope.product) : productsService.add($scope.product);
        };


        BCService
            .reset()
            .setShowBC(true)
            .addCrumb({name: 'Plans', path: 'plans.list'});

        if (!$stateParams.product_id) {
            BCService
                .addCrumb({name: 'Add', path: 'plans.add'})
                .setPageTitle('New plans');
        } else {
            productsService.get($stateParams.product_id).then(function (response) {
                $scope.product = response.data;
                $scope.product.switchStatus = response.data.status ? true : false;
                $scope.product.switchProduct = response.data.typeProduct == productsService.TYPE_PLAN ? true : false;
                $scope.product.switchBuildType = response.data.buildType == productsService.BUILD_INSTALLMENTS ? true : false;

                BCService
                    .addCrumb({name: $scope.product.productName, path: 'plans.list'})
                    .setPageTitle('Edit "' + $scope.product.productName + '"');
            });
        }

    }
}());