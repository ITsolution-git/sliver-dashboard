(function() {
    'use strict';

    var slapLeftPanel = {
        controller: function($scope,stepService) {
            $scope.subList = {
                slapMindset: [],
                slapStatement: [],
                yearGoals: [],
                idealClients: [],
                actionPlans: [],
                execute: []

            };

            stepService.getAllSteps().forEach(function(item) {
                switch(item.sref.split(".")[0]) {
                    case 'mindset':   $scope.subList.slapMindset.push(item);break;
                    case 'statement':   $scope.subList.slapStatement.push(item);break;
                    case 'yearGoal':   $scope.subList.yearGoals.push(item);break;
                    case 'idealClient':   $scope.subList.idealClients.push(item);break;
                    case 'actionPlan':   $scope.subList.actionPlans.push(item);break;
                    case 'execute':   $scope.subList.execute.push(item);break;
                }
            });
        },
        templateUrl: 'components/slap-left-panel/leftPanel.html'
    };

    angular
        .module('app.components')
        .component('slapLeftPanel', slapLeftPanel);
}());