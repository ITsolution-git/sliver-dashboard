(function() {
    'use strict';

    angular
        .module('manage.coupon.module')
        .controller('CouponItemController', CouponItemController);

    /* @ngInject */
    function CouponItemController($scope,BCService,productsService,couponService,toaster,$stateParams,$state) {

        $scope.coupon = {
            switchType: true,
            dateFrom: null,
            dateUntil: null,
            duration: couponService.ONE_TIME,
        };

        $scope.oneTime = couponService.ONE_TIME;
        $scope.forever = couponService.FOREVER;
        $scope.limited = couponService.LIMITED;

        $scope.typeChange = function() {
            $scope.coupon.typeCoupon = $scope.coupon.switchType ? couponService.TYPE_PERCENTAGE : couponService.TYPE_FIXED;
        };

        $scope.generate = function() {
            $scope.coupon.code = couponService.generateCoupon();
        };

        productsService.getActivePlans().then(function(response) {
            $scope.plans = response.data;
        });

        $scope.save = function() {
            if(!$scope.couponForm.$valid) {
                toaster.pop({type: 'error', body: 'Please fill all fields required'});
                return;
            }

            $scope.apply().then(function () {
                $state.go('coupon.list');
            });
        };

        $scope.apply = function() {
            return $scope.update().then(
                function () {
                    toaster.pop({type: 'success', body: 'Data has been successfully saved'});
                },
                function (err) {
                    // err.data.forEach(function (item) {
                    //     $scope.errors[item.param] = item.msg;
                    // });
                    console.log(err);
                })
        };

        $scope.update = function () {
            return ($stateParams.coupon_id) ? couponService.update($scope.coupon) : couponService.add($scope.coupon);
        };

        BCService
            .reset()
            .setShowBC(true)
            .addCrumb({name: 'Coupon', path: 'coupon.list'});

        if (!$stateParams.coupon_id) {
            BCService
                .addCrumb({name: 'Add', path: 'coupon.add'})
                .setPageTitle('New product');
        } else {
            couponService.get($stateParams.coupon_id).then(function (response) {
                $scope.coupon = response.data;
                if(response.data.dateFrom ) {
                    $scope.coupon.dateFrom = new Date(response.data.dateFrom );
                }
                if(response.data.dateUntil ) {
                    $scope.coupon.dateUntil = new Date(response.data.dateUntil );
                }

                $scope.coupon.switchType = response.data.typeCoupon ? true : false;
                // $scope.product.switchStatus = response.data.product.status ? true : false;
                // $scope.product.switchProduct = response.data.product.typeProduct == productsService.TYPE_PLAN ? true : false;
                // $scope.product.switchBuildType = response.data.product.buildType == productsService.BUILD_INSTALLMENTS ? true : false;

                BCService
                    .addCrumb({name: $scope.coupon.name, path: 'coupon.list'})
                    .setPageTitle('Edit "' + $scope.coupon.name + '"');
            });
        }
    }
}());