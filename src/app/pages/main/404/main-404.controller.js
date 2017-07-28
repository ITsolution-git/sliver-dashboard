(function () {
    'use strict';

    angular
        .module('app.pages.main')
        .controller('Main404Controller', Main404Controller);

    /* @ngInject */
    function Main404Controller($scope, pageService, permissionService) {

        // --- init ---

        pageService.reset().addCrumb({name:'404',path:'404'})
        .setPageTitle('Not Found');

        $scope.link = 'home';
        if(permissionService.isAdmin())
            $scope.link = 'admin.home';
    }
})();