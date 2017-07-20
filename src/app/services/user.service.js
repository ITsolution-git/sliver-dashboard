(function () {
    'use strict';

    angular
        .module('app.services')
        .service('userService', userService);

    /* @ngInject */
    function userService($q, apiService, $rootScope, adminUserService) {
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

        me.isAdmin = function () {
            return (me.user && ((me.user.role == 1) || (me.user.role == 3) || (me.user.role == 2) || (me.user.role == 5)));
        };

        me.rest = function () {
            return apiService.rest.one('auth');
        };

        me.updateMe = function(userData) {
            return apiService.rest.one('me').put(userData).then(function(user){
                console.log(user.data);
                return me.user = user.data;
            });
        }

        me.changeMyPassword = function(password) {
            //TODO ;;change password;
        }

    }
})();