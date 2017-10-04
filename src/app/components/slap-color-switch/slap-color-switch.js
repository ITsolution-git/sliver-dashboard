(function () {
    'use strict';

    var slapColorSwitch = {
        bindings: {
            value: '=',
            color: '@',
            name: '@',
            static: '=',
            quater: '='
        },
        templateUrl: 'components/slap-color-switch/slap-color-switch.html',
        controller: function($scope, $state) {
        	var $ctrl = this;
            $ctrl.$onInit = function () {
                if(_.isUndefined($ctrl.quater))
                    $ctrl.bgcolor = $ctrl.value || $ctrl.static ? $ctrl.color : '#fff';
                else
                    $ctrl.bgcolor = $ctrl.value == $ctrl.quater ? $ctrl.color : '#fff';
                
            };
            $ctrl.toggleValue = function(){
                if(_.isUndefined($ctrl.quater)) {
                    $ctrl.value = !$ctrl.value;
                    $ctrl.bgcolor = $ctrl.value || $ctrl.static ? $ctrl.color : '#fff';
                } else {
                    $ctrl.value = $ctrl.quater;
                    $ctrl.bgcolor = $ctrl.value == $ctrl.quater ? $ctrl.color : '#fff';
                }
            }
            
            $scope.$watch('$ctrl.value', function(){
                if(_.isUndefined($ctrl.quater)) {
                    $ctrl.bgcolor = $ctrl.value || $ctrl.static ? $ctrl.color : '#fff';
                } else {
                    $ctrl.bgcolor = $ctrl.value == $ctrl.quater ? $ctrl.color : '#fff';
                }
            })
        }

    };

    angular
        .module('app.components')
        .component('slapColorSwitch', slapColorSwitch);
}());
