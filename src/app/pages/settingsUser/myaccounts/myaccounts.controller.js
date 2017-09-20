(function () {
    'use strict';

    angular
        .module('app.pages.settingsUser')
        .controller('MyaccountsController', MyaccountsController);

    /* @ngInject */
    function MyaccountsController($scope, $rootScope, pageService, productStorage, $state, userService, $auth, toaster, permissionService, Upload, CONFIG) {
        $scope.renewAccount = renewAccount;
        $scope.user = {};
        $scope.saveBasic = saveBasic;
        $scope.changePassword = changePassword;
        $scope.changeCreditCard = changeCreditCard;
        $scope.getCreditCard = getCreditCard;
        $scope.stateData = $state.current.data;
        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('My accounts');

        activate();
        $scope.onFileSelect = function (file) {
            Upload.upload({
                url: CONFIG.api + '/v1/me/avatar',
                data: { avatar: file }
            }).then(function (resp) {
                $scope.avatarUrl = CONFIG.api + "/v1/user/avatar/" + resp.data;
                $scope.user.avatarId = resp.data;
                $rootScope.$emit('avatarUpdated', resp.data);
            });
        };
        function activate() {
            userService.loadUser().then(function(user){    
                $scope.user = user;
                $scope.avatarUrl = CONFIG.api + "/v1/user/avatar/" + user.avatarId;
                return permissionService.isAdmin();
            })
            .then(function(isAdmin){
                $scope.isAdmin = isAdmin;
            });
        }

        function saveBasic() {
            userService.updateMe($scope.user).then(function(user){
                $scope.user = user;
                toaster.pop({type: 'success', body: 'Basic info saved.'});
            }).catch(function(err){
                toaster.pop({type: 'error', body: 'Error.'});
            });     
        }
    
       
        
        function changePassword() {
            userService.updateMe($scope.user).then(function(user){
                $scope.user = user;
                toaster.pop({type: 'success', body: 'Password Changed.'});
                $scope.passwordform.$setPristine();
                $scope.passwordform.$setUntouched();
                $scope.passwordform.password.$setUntouched()
                $scope.passwordform.confirm.$setUntouched()
            }).catch(function(err){
                
                toaster.pop({type: 'success', body: err.data.message ? err.data.message : 'Error.'});
            });     
        }

        function getCreditCard() {
            userService.getCreditCard().then(function(user){
                $scope.user = user;
            }).catch(function(err){
                toaster.pop({type: 'success', body: err.data.message ? err.data.message : 'Error.'});
            });     
        }
        function changeCreditCard() {
            userService.changeCreditCard($scope.user).then(function(user){
                $scope.user = user;
                $scope.user.card = null;
                
                // $scope.creditform.$setPristine();
                toaster.pop({type: 'success', body: 'Credit Card Changed to ****-****-****-.' + $scope.user.last4});
            }).catch(function(err){
                toaster.pop({type: 'success', body: err.data.message ? err.data.message : 'Error.'});
            });     
        }

        function renewAccount() {
            productStorage.resetStorage();
            productStorage.setRenew();
            
            
            var renewuser = {
                businessName: $scope.user.businessName,
                email: $scope.user.email,
                lastName: $scope.user.lastName,
                name: $scope.user.name,
                phone: $scope.user.phone,
                role: 4,
                status: 'active'
            };
            productStorage.setRenewFrom($scope.user._id);
            productStorage.setUser(renewuser);
            $auth.logout();
            $state.go('step1');
        
        }
    }
}());