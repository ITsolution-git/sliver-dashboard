(function() {
    'use strict';

    angular
        .module('app.services')
        .service('activityService', activityService);

    /* @ngInject */
    function activityService(adminApiService, apiService) {
        this.TYPE_PERCENTAGE = 1;
        this.TYPE_FIXED = 0;
        this.ONE_TIME = 1;
        this.FOREVER = 2;
        this.LIMITED = 3;

        this.add = function(activity) {
            return apiService.rest.all('acitivites').all(activity.userId).post(activity);
        };

        this.list = function(userId) {
            return apiService.rest.all('acitivites').all(userId).getList();
        };

        this.get = function(id,userId) {
            return apiService.rest.all('acitivites').all(userId).one(id).get();
        };

        this.update = function(activity) {
            return activity.save();
        };

        this.delete = function(activity) {
            return activity.remove();
        }

    }
}());