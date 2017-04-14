(function() {
    'use strict';

    angular
        .module('app.services')
        .service('productsService', productsService);

    function productsService(apiService) {
        var self = this;

        self.all = function() {
            return apiService.rest.all('products');
        };

        self.getPlans = function() {
            return self.all().one('plans').getList();
        };

        self.getBuilds = function() {
            return self.all().one('builds').getList();
        }
    }
}());