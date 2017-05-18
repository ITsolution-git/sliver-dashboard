(function () {
    'use strict';

    angular
        .module('app.services')
        .service('userService', userService);

    /* @ngInject */
    function userService($q, apiService, $rootScope) {
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

        me.loadUser = function (refresh) {
            var deferred = $q.defer();

            if (!refresh && me.user) {
                deferred.resolve(me.user);
            } else {
                me.rest().get().then(function (resp) {
                    // $rootScope.$broadcast('userEvent');
                    me.user = {
                        name: resp.data.name,
                        lastName: resp.data.lastName,
                        email: resp.data.email,
                        id: resp.data._id,
                        businessName: resp.data.businessName
                    };
                    console.log(me.user);
                    me.resolveUser(me.user);
                    deferred.resolve(me.user);
                });
                deferred.resolve(me.user);
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
            return (me.user && me.user.admin);
        };

        me.rest = function () {
            return apiService.rest.one('auth')
        };

    }
})();