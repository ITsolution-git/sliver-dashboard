(function() {
    'use strict';

    angular
        .module('app.services')
        .service('emailTemplateService', emailTemplateService);

    /* @ngInject */
    function emailTemplateService(adminApiService, apiService) {
       

        this.list = function() {
            return adminApiService.rest.all('emailtemplates').getList();
        };

        this.get = function(id) {
            return adminApiService.rest.all('emailtemplates').one(id).get();
        };

        this.update = function(emailtemplate) {
            return emailtemplate.save();
        };

        this.delete = function(emailtemplate) {
            return emailtemplate.remove();
        }

    }
}());