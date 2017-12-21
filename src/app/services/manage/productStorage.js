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
            //monthly payment for slapbuild
            if(_build && _build.buildType == 1) {
                return _plan.costProduct + _build.costProduct;
            }

            return _plan.costProduct;
        };

        this.getAmountCoupon = function () {
            return this.getAmountCouponForAll();
            // if (!_coupon.plan){
            //     if (_build){
            //         return this.getAmountCouponPlanAll();
            //     }
            //     return this.getAmountCouponPlan();
                
            // }
            // if (_coupon.plan.typeProduct == 2 && _coupon.plan.buildType == 1) {
            //     return this.getAmountCouponBuild();
            // }
            // return this.getAmountCouponPlan();
            
        }

        this.getAmountCouponForAll = function() {
            return this.getAmountCouponPlan() + this.getAmountCouponBuild();
        }

        this.getAmountCouponPlan = function(){
            if ((_coupon.typeCoupon && !_coupon.plan) || (_coupon.plan && _coupon.plan._id == _plan._id)) {
                if (_coupon.typeCoupon) {
                    _plan.amountCoupon = (_plan.costProduct * _coupon.amount) / 100;
                    return _plan.amountCoupon;
                }
                return _plan.amountCoupon = _coupon.amount;
            }            
            return _plan.amountCoupon = 0;
        }
        
        this.getAmountCouponBuild = function(){
            if (_build) {
                if (_coupon.slapBuild.plan) {
                    if (_coupon.slapBuild.typeCoupon) {
                        _build.amountCoupon = (_build.costProduct * _coupon.slapBuild.amount) / 100;
                        return _build.amountCoupon;
                    }
                    return _build.amountCoupon = _coupon.slapBuild.amount;                    
                }
                return _build.amountCoupon = 0;                
            }
            else {
                return 0;
            }
        }

        this._calculateCoupon = function() {
            
            if ((_coupon.typeCoupon && !_coupon.plan) || (_coupon.plan && _coupon.plan._id == _plan._id)) {
                this._calculateCouponForPlan();
                
            }
            if (_coupon.slapBuild.plan) {
                this._calculateCouponForBuild();
            }

        }
        
        this._calculateCouponForBuildToday = function(){
            if (_build) {
                if (_coupon.typeCoupon) {
                    _build.amountFirstPayment = _build.amountFirstPayment - (_build.amountFirstPayment * _coupon.amount) / 100;
                    return _build.amountFirstPayment = _build.amountFirstPayment > 0? _build.amountFirstPayment:0;
                }
                 _build.amountFirstPayment = _build.amountFirstPayment - _coupon.amount;
                return _build.amountFirstPayment = _build.amountFirstPayment > 0 ? _build.amountFirstPayment : 0;                
            }
            else {
                return 0;
            }
        }

        this._calculateCouponForBuild = function(){
            if (_build) {
                if (_coupon.slapBuild.typeCoupon){
                     _build.costProduct = _build.costProduct - (_build.costProduct * _coupon.slapBuild.amount) / 100;
                    return _build.costProduct = _build.costProduct > 0 ? _build.costProduct: 0;
                }
                _build.costProduct = _build.costProduct - _coupon.slapBuild.amount;
                return _build.costProduct = _build.costProduct > 0 ? _build.costProduct : 0;                                
            }
            else {
                return 0;
            }
        }

        this._calculateCouponForPlan = function () {
            if (_coupon.typeCoupon) {
                 _plan.costProduct = _plan.costProduct - (_plan.costProduct * _coupon.amount) / 100;
                return _plan.costProduct = _plan.costProduct > 0 ? _plan.costProduct: 0;
            }
            _plan.costProduct = _plan.costProduct - _coupon.amount;
            return _plan.costProduct = _plan.costProduct > 0 ? _plan.costProduct : 0;
        }



    }
}());