(function () {
    'use strict';

    angular
        .module('app.pages.settingsUser')
        .controller('MyaccountsController', MyaccountsController);

    /* @ngInject */
    function MyaccountsController($scope, $rootScope, actionplanService, userAllData, $q, stepService, pageService, productStorage, $state, userService, $auth, toaster, permissionService, Upload, CONFIG) {
        $scope.renewAccount = renewAccount;
        $scope.Upload = Upload;
        $scope.user = {};
        $scope.userAllData = userAllData;
        $scope.notifications = [];
        $scope.notifications_card = [];
        $scope.quaters = [];
        $scope.saveBasic = saveBasic;
        $scope.changePassword = changePassword;
        $scope.changeCreditCard = changeCreditCard;
        $scope.getCreditCard = getCreditCard;
        $scope.stateData = $state.current.data;
        $scope.downloadFinished = true;
        $scope.canRenew = false;
        $scope.startDate = Date;
        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Account');

        activate();
        $scope.onFileSelect = function (file) {     
            $scope.downloadFinished = false;
            $scope.Upload.upload({
                url: CONFIG.api + '/v1/me/avatar',
                data: { avatar: file }
            }).then(function (resp) {
                $scope.avatarUrl = CONFIG.api + "/v1/user/avatar/" + resp.data;
                $scope.user.avatarId = resp.data;
                $rootScope.$emit('avatarUpdated', resp.data);
                $('#avatar').on('load', function () {
                    $scope.downloadFinished = true;
                    $scope.$applyAsync();
                });
            },  function (response) {
                $scope.downloadFinished = true;
                toaster.pop({ type: 'error', body: 'Size of the picture cannot exceed 5M.' });
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                }).then(function(){
                    userService.loadUser(true).then(function () { });
                });
        };
       
        function activate() {
            userService.loadUser().then(function(user){    
                $scope.user = angular.copy(user, {});
                $scope.avatarUrl = CONFIG.api + "/v1/user/avatar/" + user.avatarId;
                return permissionService.isAdmin();
            })
            .then(function(isAdmin){
                $scope.isAdmin = isAdmin;
            });
            if ($scope.userAllData && $scope.userAllData.slapMindset && $scope.userAllData.slapMindset.slapStartDate)
            {
                var startDate = $scope.userAllData.slapMindset.slapStartDate;
                var m = new Date(startDate.year+1,startDate.month-1,1);
                $scope.startDate = moment(m);
                // if (moment().isAfter(moment($scope.startDate)))
                    $scope.canRenew = true;
            }
        }



        function addNotification(notifications, newNotification) {
            var existing = _.find(notifications, {name: newNotification.name});
            if (_.isUndefined(existing)) {
                notifications.push(newNotification);
            } else {
                existing.show = true;
            }
            
        }

        function saveBasic() {
            userService.updateMe($scope.user).then(function(user){
                $scope.user = user;
                // toaster.pop({type: 'success', body: 'Info Saved!', timeout: 1000});
                userService.loadUser(true).then(function(){
                    toaster.pop({type: 'success', body: 'Info Saved!', timeout: 1000});
                })
            }).catch(function(err){
                addNotification($scope.notifications, {name: 'Server Error', type: 'error', message:"So sorry - something has gone wrong on our end.  Try again and if it still doesn't work email support@smallbizsilverlining.com", show: true});
                
            });     
        }
    

        
        function changePassword() {
            userService.updateMe($scope.user).then(function(user){
                $scope.user = user;
                toaster.pop({type: 'success', body: 'Password Changed.', timeout: 1000});
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
                toaster.pop({type: 'success', body: 'Credit Card Changed to ****-****-****-.' + $scope.user.last4, timeout: 2000});
            }).catch(function(err){
                addNotification($scope.notifications_card, {name: 'Server Error', type: 'error', message:"We were unable to process your credit card. Please try again or use a new card.", show: true});
            });     
        }
        
        function renewAccount() {
            //productStorage.resetStorage();
            productStorage.setRenew();
            
            
            var renewuser = {
                businessName: $scope.user.businessName,
                email: $scope.user.email,
                lastName: $scope.user.lastName,
                name: $scope.user.name,
                phone: $scope.user.phone,
                role: 4,
                planId: $scope.user.planId,
                status: 'active'
            };
            productStorage.setRenewFrom($scope.user._id);
            productStorage.setUser(renewuser);
            $auth.logout();
            $state.go('step1');
        
        }
    }
}());