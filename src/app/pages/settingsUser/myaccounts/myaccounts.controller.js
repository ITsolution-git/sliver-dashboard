(function () {
    'use strict';

    angular
        .module('app.pages.settingsUser')
        .controller('MyaccountsController', MyaccountsController);

    /* @ngInject */
    function MyaccountsController($scope, pageService, productStorage, $state, userService, $auth, toaster) {
        $scope.renewAccount = renewAccount;
        $scope.user = {};
        $scope.saveBasic = saveBasic;
        $scope.changePassword = changePassword;
        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('My accounts');

        activate();
        function activate() {
            userService.loadUser().then(function(user){    
                $scope.user = user;
            });
        }

        function saveBasic() {
            userService.updateMe($scope.user).then(function(user){
                $scope.user = user;
                toaster.pop({type: 'success', body: 'Basic info saved.'});
            }).catch(function(err){
                toaster.pop({type: 'success', body: 'Error.'});
            });     
        }


        function changePassword() {
            userService.updateMe($scope.user).then(function(user){
                $scope.user = user;
                toaster.pop({type: 'success', body: 'Password Changed.'});
            }).catch(function(err){
                toaster.pop({type: 'success', body: 'Error.'});
            });     
        }


        function renewAccount() {
            productStorage.resetStorage();
            productStorage.setRenew();
            
            
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
        
        }
    }
}());