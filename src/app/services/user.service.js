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

        // --- methods ---

        me.loadUser = function (refresh) {
            var deferred = $q.defer();

            if (!refresh && me.user) {
                deferred.resolve(me.user);
            } else {
                // me.rest().get().then(function (resp) {
                //     $rootScope.$broadcast('userEvent');
                //     me.user = resp.data.identity;
                //     deferred.resolve(me.user);
                // });
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
            return apiService.rest.all('auth').all('check').getList({'access-token': token})
        };
        me.reset = function (email) {
            return apiService.rest.all('auth').all('reset').getList({'email': email})
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