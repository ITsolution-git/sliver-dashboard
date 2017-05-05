(function() {
    'use strict';

    var slapLeftPanel = {
        binding: {

        },
        controller: function($scope,asideService) {
            $scope.statements = asideService.getSlapStatement();
        },
        templateUrl: 'components/slap-left-panel/leftPanel.html'
    };

    angular
        .module('app.components')
        .component('slapLeftPanel', slapLeftPanel);
}());