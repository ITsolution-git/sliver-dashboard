(function () {
    'use strict';

    angular
        .module('app.pages.settingsUser')
        .controller('MyaccountsController', MyaccountsController);

    /* @ngInject */
    function MyaccountsController($scope, productStorage, $state, userService, $auth) {
        $scope.renewAccount = renewAccount;

        function renewAccount() {
            productStorage.resetStorage();
            productStorage.setRenew();
            
            userService.loadUser().then(function(user){
                var renewuser = {
                    businessName: user.businessName,
                    email: user.email,
                    lastName: user.lastName,
                    name: user.name,
                    phone: user.phone,
                    role: 4,
                    status: 'active'
                };
                productStorage.setRenewFrom(user._id);
                productStorage.setUser(renewuser);
                $auth.logout();
                $state.go('step1');
            })
        }
    }
}());