(function() {
    'use strict';

    angular
        .module('app.services')
        .service('productStorage', productStorage);

    function productStorage() {
        var _plan = null;
        var _build = null;
        var _coupon = null;
        var _user = null;
        var _isRenew = false;
        var _renewFrom = null;

        this.getPlan = function() {
            return _plan;
        };

        this.setPlan = function(plan) {
            _plan = plan;
        };

        this.getBuild = function() {
            return _build;
        };

        this.getUser = function() {
            return _user;
        };

        this.getRenewFrom = function(id) {
            return _renewFrom;
        }
        
        this.isRenew = function() {
            return _isRenew;
        }

        this.setBuild = function(build) {
            _build = build;
        };
        this.resetCoupon = function(){
            _coupon = null;
        }
        this.setRenewFrom = function(id) {
            _renewFrom = id;
        }

        this.setRenew = function() {
            _isRenew = true;
        }

        this.setUser = function(user) {
            _user = user;
        };

        this.resetStorage = function() {
            _build = null;
            _plan = null;
            _coupon = null;
            _isRenew = false;
            _user = null;
        };

        this.setCoupon = function(coupon) {
            _coupon = coupon;
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
            if(_coupon) {
                this._calculateCoupon();
            }

            if(_build) {
                return _build.buildType == 2 ? _build.costProduct : _build.amountFirstPayment;
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
        };

        this.getAmountCoupon = function () {
            if (!_coupon.plan){
                if (_build){
                    return this.getAmountCouponPlanAll();
                }
                return this.getAmountCouponPlan();
                
            }
            if (_coupon.plan.typeProduct == 2 && _coupon.plan.buildType == 1) {
                return this.getAmountCouponBuild();
            }
            return this.getAmountCouponPlan();
            
        }
        this.getAmountCouponPlanAll = function(){
            return this.getAmountCouponPlan() + this.getAmountCouponBuild();
        }
        this.getAmountCouponPlan = function(){
            if (_coupon.typeCoupon) {
                _plan.amountCoupon = (_plan.costProduct * _coupon.amount) / 100;
                return _plan.amountCoupon;
            }
            return _plan.amountCoupon = _coupon.amount;
        }
        this.getAmountCouponBuild = function(){
            if (_coupon.typeCoupon) {
                _build.amountCoupon = (_build.costProduct * _coupon.amount) / 100;
                return _build.amountCoupon;
            }
            return _build.amountCoupon = _coupon.amount;
        }
        this._calculateCoupon = function() {
            
            // Coupon for ALL
            if (!_coupon.plan) {
                // User have Build PLAN
                if (_build) {
                    this._calculateCouponForBuild()
                }
                // User have PLAN + BUILD
                return this._calculateCouponForPlan();
                
            }
            // coupon only for BUILD
            if (_coupon.plan.typeProduct == 2 && _coupon.plan.buildType == 1) {
                return this._calculateCouponForBuild();
            }


            // coupin only for PLAN 
            return this._calculateCouponForPlan();
        }
        
        this._calculateCouponForBuildToday = function(){
            
            if (_coupon.typeCoupon) {
                _build.amountFirstPayment = _build.amountFirstPayment - (_build.amountFirstPayment * _coupon.amount) / 100;
                return _build.amountFirstPayment;
            }
            return _build.amountFirstPayment = _build.amountFirstPayment - _coupon.amount;
        }
        this._calculateCouponForBuild = function(){
            //this._calculateCouponForBuildToday();
            if (_coupon.typeCoupon){
                return _build.costProduct = _build.costProduct - (_build.costProduct * _coupon.amount) / 100;
            }
            return _build.costProduct = _build.costProduct - _coupon.amount;
        }
        this._calculateCouponForPlan = function () {
            if (_coupon.typeCoupon) {
                return _plan.costProduct = _plan.costProduct - (_plan.costProduct * _coupon.amount) / 100;
            }
            return _plan.costProduct = _plan.costProduct - _coupon.amount;
        }

    }
}());