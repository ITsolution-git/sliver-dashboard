(function () {
    'use strict';

    var slapNotifications = {
        bindings: {
            notifications: '='
        },
        templateUrl: 'components/slap-notifications/slap-notifications.html',
        controller: function($scope) {
            $scope.closeNotice = function(notification) {
                notification.show = false;
            }
        }

    };

    angular
        .module('app.components')
        .component('slapNotifications', slapNotifications);
}());

