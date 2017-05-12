(function () {
    'use strict';

    angular
        .module('app.pages.idealClient')
        .controller('DefineYourIdealClientController', DefineYourIdealClientController);

    function DefineYourIdealClientController($scope, $state, pageService, stepService) {

        angular.extend($scope, {
            model: {
                clients: []
            },
            gender: ['Empty', 'Male', 'Female'],
            maritalStatus: ['Empty', 'Single', 'Married', 'Divorced', 'Widowed'],
            kids: ['Empty', 'None', 'Young', 'Teens',' Adults'],
            employment: ['Empty', 'Doesn’t Work Established Entrepreneur', 'Small Entrepreneur', 'Senior Employed', 'Mid Level Employed', 'Junior Employed'],
            location: ['Empty', 'City', 'Suburbs', 'Rural', 'Other'],
            home: ['Empty', 'Condo', 'Apartment', 'House', 'Farm', 'Other'],
            transit: ['Empty', 'Car', 'Bike', 'Train', 'Walking', 'Planes', 'Other'],
            showVideoBlock: false,
            showStaticTextBlock: false,
            showContent: false
        });

        getData();

        function getData() {
            var urls = _.get($state.current, 'params.prev.sref').split('.');

            return stepService.getApiData(urls[urls.length - 1])
                .then(function (response) {
                    if (response && response.status === 200) {
                        $scope.model.clients = _.get(response, 'data.whoAreYouIdealClient', []);
                    }
                });
        }

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Ideal Client');
    }
}());