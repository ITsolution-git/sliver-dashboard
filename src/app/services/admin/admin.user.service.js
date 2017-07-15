(function () {
    'use strict';

    angular
        .module('app.services')
        .service('adminUserService', adminUserService);

    /* @ngInject */
    function adminUserService($q, adminApiService, $rootScope) {
        
        self.ROLE_ADMIN = 1;
        self.ROLE_SLAPEXPERT = 2;
        self.ROLE_SLAPMANAGER = 3;
        self.ROLE_SLAPSTER = 4;
        self.ROLE_PARTNER = 5;

        self.STATUS_ACTIVE = 'active';
        self.STATUS_INACTIVE = 'inactive';
        self.STATUS_DELETED = 'deleted';

        self.ROLES = [
            {id: 1, name: "Admin"},
            {id: 2, name: "SLAPExpert"},
            {id: 3, name: "SLAPManager"},
            {id: 4, name: "SLAPster"},
            {id: 5, name: "Partner"}];

        self.STATUSES = [
            {id: 'active', name: "Active"},
            {id: 'inactive', name: "Inactive"},
            {id: 'deleted', name: "Deleted"}];

        self.get = function (id) {
            // console.log(user);
            return adminApiService.rest.all('users').one(id).get();
        };

        self.add = function (user) {
            return adminApiService.rest.all('users').post(user);
        };

        self.update = function (user) {
            return adminApiService.rest.all('users').one(user._id).put(user);
        };

        self.list = function () {
            return adminApiService.rest.all('users').getList();
        };

        self.delete = function(user) {
            return adminApiService.rest.all('users').one(user._id).remove();
        };
        return self;
    }
})();