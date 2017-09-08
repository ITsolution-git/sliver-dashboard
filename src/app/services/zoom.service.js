(function () {
    'use strict';

    angular
        .module('app.services')
        .service('zoomService', zoomService);

    /* @ngInject */
    function zoomService($q, apiService, $rootScope, $window) {
        var me = this;

        me.meetingsList = function () {
            return apiService.rest.all('zoom').one('meetings').get().then(function (meetings) {
                return meetings.data;
            });
        };
    }
})();