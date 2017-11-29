(function () {
    'use strict';

    var slapRating = {
        bindings: {
            rate: '=',
            disabledRate: '='
        },

        templateUrl: 'components/slap-rating/slap-rating.html',
        controller: function($scope, $state, stepService) {

        }

    };

    angular
        .module('app.components')
        .component('slapRating', slapRating);
}());
