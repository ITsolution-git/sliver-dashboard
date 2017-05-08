(function () {
    'use strict';

    angular
        .module('app.pages.idealClient')
        .controller('WhoAreYouIdealClientController', WhoAreYouIdealClientController);

    /* @ngInject */
    function WhoAreYouIdealClientController($scope, $timeout, pageService) {

        angular.extend($scope, {
            clients: [],
            emptyClient: {
                name: '',
                gender: 'Gender',
                age: '',
                maritalStatus: '0',
                kids: 'Kids',
                employment: '0',
                location: '0',
                home: '0',
                transit: '0',
                hobbies: '',
                reads: ''
            },
            showVideoBlock: false,
            showStaticTextBlock: false,
            showIdealClientTextBlock: false
        });

        $timeout(init);

        function init() {
            var clientModel = _.cloneDeep($scope.emptyClient);
            $scope.clients.push(clientModel);
        }

        // --- vars ---

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Who Are Your Ideal Clients');


    }


})();

