(function () {
    'use strict';

    angular
        .module('app')
        .controller('LayoutBlankController', LayoutBlankController);

    /* @ngInject */
    function LayoutBlankController($scope) {

        $scope.$on('$stateChangeSuccess', 
        function(event, toState, toParams, fromState, fromParams){ 
            if(toState.name === "slapExcute.main"){
                $scope.height = true;
            }else {
                $scope.height = false;
            }
         });
    }
})();