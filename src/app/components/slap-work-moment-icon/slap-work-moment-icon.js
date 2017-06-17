(function () {
    'use strict';

    var slapWorkMomentIcon = {
        bindings: {
            visible: '=',
            type: '=',
            title: '='
        },
        templateUrl: 'components/slap-work-moment-icon/slap-work-moment-icon.html',
        controller: function() {
        }

    };

    angular
        .module('app.components')
        .component('slapWorkMomentIcon', slapWorkMomentIcon);
}());