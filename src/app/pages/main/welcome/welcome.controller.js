(function () {
    'use strict';

    angular
        .module('app.pages.main')
        .controller('WelcomeController', WelcomeController);

    /* @ngInject */
    function WelcomeController($scope) {

        $scope.dt = new Date();
    }
})();