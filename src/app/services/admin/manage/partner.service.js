(function () {
    'use strict';

    angular
        .module('app.services')
        .service('partnerService', partnerService);

    /* @ngInject */
    function partnerService(adminApiService, apiService) {
    

        this.add = function (partner) {
            return adminApiService.rest.all('partner').post(partner);
        };

        this.list = function () {
            return adminApiService.rest.all('partner').getList();
        };

        this.get = function (id) {
            return adminApiService.rest.all('partner').one(id).get();
        };

        this.update = function (partner) {
            return adminApiService.rest.all('partner').one(partner._id).customPUT(partner);
        };

        this.delete = function (partner) {
            return partner.remove();
        }

    }
}());