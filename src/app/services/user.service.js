(function () {
    'use strict';

    angular
        .module('app.services')
        .service('userService', userService);

    /* @ngInject */
    function userService($q, apiService, $rootScope, adminUserService, $window) {
        var me = this;

        // --- vars ---
        me.user = null;
        me.resolveUser = null;

        me.userPromise = new Promise(function (resolve) {
            return me.resolveUser = resolve;
        });
        // --- methods ---

        me.getUser = function () {
            return me.userPromise;
        };
        
        me.getStoredUser = function() {
            var user = $window.localStorage.getItem('slapuser');
            if(user) {
                return JSON.parse(user);
            } else {
                $state.go('login');
            }
        }

        me.selectSLAPyear = function(userId) {
            return apiService.rest.all('auth').all('selectslapyear').one(userId).post();
        };

        me.loadUser = function (refresh) {
            var deferred = $q.defer();

            if (!refresh && me.user) {
                deferred.resolve(me.user);
            } else {
                me.rest().get().then(function (resp) {
                    // $rootScope.$broadcast('userEvent');
                    me.user = resp.data;
                    $window.localStorage.setItem('slapuser', JSON.stringify(me.user));
                    // For security

                    // me.user = {
                    //     name: resp.data.name,
                    //     lastName: resp.data.lastName,
                    //     email: resp.data.email,
                    //     id: resp.data._id,
                    //     businessName: resp.data.businessName,
                    //     role: resp.data.role,
                    //     status: resp.data.status
                    // };
                    // var accounts = resp.data.accounts.map(function(acc){
                    //     return {
                    //         name: acc.name,
                    //         lastName: acc.lastName,
                    //         email: acc.email,
                    //         id: acc._id,
                    //         businessName: acc.businessName,
                    //         role: acc.role,
                    //         status: acc.status
                    //     };
                    // });
                    // me.user.accounts = accounts;
                    
                    console.log(me.user);
                    me.resolveUser(me.user);
                    deferred.resolve(me.user);
                });
                // deferred.resolve(me.user);
            }

            return deferred.promise;
        };

        me.setPassword = function (confirm, token) {
            return apiService.rest.all('auth').all('check-password').post(
                angular.extend(
                    {
                        'access-token': token
                    },
                    confirm
                )
            );
        };

        me.check = function (token) {
            return apiService.rest.all('auth').all('check').getList({'access-token': token});
        };
        me.reset = function (email) {
            return apiService.rest.one('auth').one('reset').get({'email': email});
        };

        me.getData = function (field) {
            return field ? me.user[field] : me.user;
        };

        me.getUserByEmail = function (request) {
            return apiService.rest.all('auth').one('email').get(request);
        };

        me.rest = function () {
            return apiService.rest.one('auth');
        };

        me.updateMe = function(userData) {
            return apiService.rest.all('me').post(userData).then(function(user){
                console.log(user.data);
                $rootScope.$emit('SlapAccounUpdated', user.data);
                return me.user = user.data;

            });

        }

        me.changeCreditCard = function(card) {

            return apiService.rest.all('me').all('change-card').post(card).then(function(user){
                console.log(user.data);
                return me.user = user.data;
            });
        }

        me.changeMyPassword = function(password) {
            //TODO ;;change password;
        }

        me.getCreditCard = function() {
            
            return apiService.rest.all('me').one('current-card').get().then(function(last4){
                me.user.last4 = last4.data.last4;
                return me.user;
            });
        }
    }
})();