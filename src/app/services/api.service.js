(function () {
    'use strict';

    angular
        .module('app.services')
        .service('apiService', apiService);

    function apiService($rootScope, $auth, Restangular, toaster, CONFIG) {
        var me = this;

        // --- vars ---

        me.headers = {
            'Content-Type': 'application/json'
        };

        me.rest = Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer
                .setBaseUrl(CONFIG.api + '/v1')
                .setDefaultHeaders(me.headers)
                .setFullResponse(true)
                .setErrorInterceptor(function (response) {
                    switch (response.status) {
                        case 401:
                            $rootScope.$broadcast('authUnauthorized');
                            break;

                        case 403:
                            $rootScope.$broadcast('authForbidden');
                            break;

                        default:
                            console.log(response.statusText);
                    }
                })
                .addFullRequestInterceptor(function (element, operation, what, url, headers, params) {
                    var token = $auth.getToken();
                    if (token) {
                        params = params || {};
                        // console.log(element, operation, what, url, headers, params);
                        // params['access-token'] = $auth.getToken();
                        headers.Authorization = 'Bearer ' + token;
                    }
                });
        });

    }
})();