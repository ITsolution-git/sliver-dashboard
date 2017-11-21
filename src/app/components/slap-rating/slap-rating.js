(function () {
    'use strict';

    var slapRating = {
        bindings: {
            rate: '='
        },
        templateUrl: 'components/slap-rating/slap-rating.html',
        controller: function($scope, $state, stepService) {

            //$scope.title = stepService.getActiveStep().name;
            // console.log(stepService.getActiveStep());

        }

    };

    angular
        .module('app.components')
        .component('slapRating', slapRating);
}());
