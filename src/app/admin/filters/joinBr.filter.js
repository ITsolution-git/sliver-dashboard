(function() {
    'use strict';

    angular
        .module('adminapp.filters')
        .filter('joinBr', joinBr);

    function joinBr() {
        return function (array) {
            return angular.isArray(array) ? array.join('<br>') : '';
        }
    }
}());