(function () {
    'use strict';

    angular
        .module('app.services')
        .service('productsService', productsService);

    /* @ngInject */
    function productsService(apiService) {
        var self = this;

        var SELECT_MONTH = [
            {
                id:1,
            },{
                id:2,
            },{
                id:3,
            },{
                id:4,
            },{
                id:5,
            },{
                id:6,
            },{
                id:7,
            },{
                id:8,
            },{
                id:9,
            },{
                id:10,
            },{
                id:11,
            },{
                id:12,
            }
        ];

        self.TYPE_PLAN = 1;
        self.TYPE_BUILD = 2;
        self.ACTIVE = 1;
        self.INACTIVE = 0;
        self.BUILD_INSTALLMENTS = 1;
        self.BUILD_ONETIME = 2;

        // self.baseProducts = apiService.rest.all('products');

        self.getSelectMonth = function () {
            return SELECT_MONTH;
        };

        self.get = function (id) {
            // console.log(product);
            return apiService.rest.all('products').one(id).get();
        };

        self.add = function (product) {
            return apiService.rest.all('products').post(product);
        };

        self.update = function (product) {
            return apiService.rest.all('products').one(product._id).put(product);
        };

        self.list = function () {
            return apiService.rest.all('products').getList();
        };

        self.delete = function(product) {
            return apiService.rest.all('products').one(product._id).post();
        };

        self.getActivePlans = function() {
            return apiService.rest.all('plans').getList();
        };
    }
}());