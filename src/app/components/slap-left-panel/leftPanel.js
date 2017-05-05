(function() {
    'use strict';

    var slapLeftPanel = {
        binding: {

        },
        controller: function($scope,asideService) {
            $scope.subList = asideService.getAll();
        },
        templateUrl: 'components/slap-left-panel/leftPanel.html'
    };

    angular
        .module('app.components')
        .component('slapLeftPanel', slapLeftPanel);
}());