(function () {
    'use strict';

    var buttonSwitch = {
        bindings: {
            visible: '='
        },
        templateUrl: 'components/button-switch/button-switch.html',
        controller: function() {
        }

    };

    angular
        .module('app.components')
        .component('buttonSwitch', buttonSwitch);
}());