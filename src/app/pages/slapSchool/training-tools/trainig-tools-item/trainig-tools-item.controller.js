(function () {
    'use strict';

    angular
        .module('app.pages.slapSchool')
        .controller('TrainingToolsItemController', TrainingToolsItemController);

    function TrainingToolsItemController($scope, $stateParams,  actionplanService) {
        angular.extend($scope, {
            defaultStrategies: actionplanService.getDefaultConnectingStrategies(),
            strategy_id: $stateParams.strategy_id
        });

        $scope.data = $scope.defaultStrategies[$scope.strategy_id];

        $scope.disabledRate = true;

        $scope.docUrl = $scope.data.trainig.documents;

        $scope.videoUrl = $scope.data.trainig.videos;


    }
}());