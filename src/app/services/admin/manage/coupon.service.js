(function() {
    'use strict';

    angular
        .module('app.services')
        .service('couponService', couponService);

    /* @ngInject */
    function couponService(adminApiService, apiService) {
        this.TYPE_PERCENTAGE = 1;
        this.TYPE_FIXED = 0;
        this.ONE_TIME = 1;
        this.FOREVER = 2;
        this.LIMITED = 3;

        /**
         * Generate random string
         * @returns {string}
         */
        this.generateCoupon = function() {
            var text = "";
            var string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for( var i=0; i < 10; i++ )
                text += string.charAt(Math.floor(Math.random() * string.length));

            return text;
        };

        this.add = function(coupon) {
            return adminApiService.rest.all('coupon').post(coupon);
        };

        this.list = function() {
            return adminApiService.rest.all('coupon').getList();
        };

        this.get = function(id) {
            return adminApiService.rest.all('coupon').one(id).get();
        };

        this.update = function(coupon) {
            return coupon.save();
        };

        this.delete = function(coupon) {
            return coupon.remove();
        }

        this.validCoupon = function(code,planId) {
            return apiService.rest.all('coupon').one(code).one(planId).get();
        }
    }
}());