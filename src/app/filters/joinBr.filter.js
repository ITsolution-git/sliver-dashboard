(function () {
    'use strict';

    angular
        .module('app.filters')
        .filter('joinBr', joinBr);

    function joinBr() {
        return function (array) {
            return angular.isArray(array) ? array.join('<br>') : '';
        }
    }
})();