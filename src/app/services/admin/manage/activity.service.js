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

        this.activityTypes = [
            { id: "Milestone", name: "Milestone", show: false },
            { id: "ActionItem", name: "Action Item", show: false },
            { id: "Pause & Reflect", name: "Pause & Reflect", show: false },
            { id: "Sales", name: "Sales", show: false },
            { id: "Communication", name: "Communication", show: false },
            { id: "SLAPexpert", name: "SLAPexpert", show: false },
            { id: "SLAPassistant", name: "SLAPassistant", show: false, hidden: true, hideButton:true },
            { id: "SLAPworld", name: "SLAPworld", show: false },
            { id: "SLAPschool", name: "SLAPschool", show: false },
            { id: "SLAPmanager", name: "SLAPmanager", show: false }
        ];

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