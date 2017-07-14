(function () {
    'use strict';

    angular
        .module('app.services')
        .service('productsService', productsService);

    /* @ngInject */
    function productsService(adminApiService) {
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

        // self.baseProducts = adminApiService.rest.all('products');

        self.getSelectMonth = function () {
            return SELECT_MONTH;
        };

        self.get = function (id) {
            // console.log(product);
            return adminApiService.rest.all('products').one(id).get();
        };

        self.add = function (product) {
            return adminApiService.rest.all('products').post(product);
        };

        self.update = function (product) {
            return adminApiService.rest.all('products').one(product._id).put(product);
        };

        self.list = function () {
            return adminApiService.rest.all('products').getList();
        };

        self.delete = function(product) {
            return adminApiService.rest.all('products').one(product._id).post();
        };

        self.getActivePlans = function() {
            return adminApiService.rest.all('plans').getList();
        };
    }
}());