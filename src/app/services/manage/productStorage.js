(function() {
    'use strict';

    angular
        .module('app.services')
        .service('productStorage', productStorage);

    function productStorage() {
        var _plan = null;
        var _build = null;

        this.getPlan = function() {
            return _plan;
        };

        this.setPlan = function(plan) {
            _plan = plan;
        };

        this.getBuild = function() {
            return _build;
        };

        this.setBuild = function(build) {
            _build = build;
        };

        /**
         * Calculate the total cost build
         *
         * @param {object} build
         * @return {number}
         **/
        this.calculateFullCostBuild = function(build) {
            return build.amountFirstPayment + (build.costProduct * build.billingFrequency);
        };

        /**
         * Calculate the total cost build now
         *
         * @return {number}
         **/
        this.calculateTodayPayment = function() {
            if(_build) {
                return _plan.costProduct + (_build.buildType == 2 ? _build.costProduct : _build.amountFirstPayment);
            }
            return _plan.costProduct;
        };

        /**
         * Calculate the total cost monthly every month
         *
         * @return {number}
         **/
        this.calculateMonthlyPayment = function() {
            if(_build && _build.buildType != 2) {
                return _plan.costProduct + _build.costProduct;
            }

            return _plan.costProduct;
        }

    }
}());