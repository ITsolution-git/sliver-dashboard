(function() {
    'use strict';
    
    angular
        .module('app.pages.statement')
        .controller('CommitToYourController', CommitToYourController);
    
    function CommitToYourController($scope, $state, pageService, stepService, userService) {

        angular.extend($scope, {
            model: {},
            user: {
                businessName: ''
            },
            first: ['Does', 'Provides', 'Sells'],
            third: ['For', 'To'],
            fifth: ['Market size', 'Local', 'Regional', 'National', 'Global'],
            showVideoBlock: false,
            showStaticTextBlock: false,
            showContent: false
        });

        getData();

        function getData() {
            var urls = _.get($state.current, 'params.prev.sref').split('.');

            return stepService.getApiData(urls[urls.length - 1])
                .then(function (response) {
                    console.log(response);
                    if (response && response.status === 200) {
                        $scope.model = _.get(response, 'data.yourStatement', []);
                    }
                });
        }

        userService.getUser().then(function (user) {
            $scope.user.businessName = user.businessName;
        });

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Statement');
    }
}());