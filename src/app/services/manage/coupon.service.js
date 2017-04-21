(function() {
    'use strict';

    angular
        .module('app.services')
        .service('couponService',couponService);

    /* @ngInject */
    function couponService(apiService) {
        var self = this;

        self.validCoupon = function(code,planId) {
            return apiService.rest.all('coupon').one(code).one(planId).get();
        }
    }
}());