(function () {
    'use strict';

    angular
        .module('app.services')
        .service('adminApiService', adminApiService);

    function adminApiService($rootScope, $auth, Restangular, toaster, CONFIG, apiService) {
        var me = this;
        
        // --- vars ---

        me.headers = {
            'Content-Type': 'application/json'
        };


        me.rest = Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer
                .setBaseUrl(CONFIG.api + '/admin')
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
                            toaster.pop({type: 'error', body: response.statusText || 'Server error'});
                    }
                    if (response.status === 401) {
                        $rootScope.$broadcast('authUnauthorized');
                    } 
                })
                .addFullRequestInterceptor(function (element, operation, what, url, headers, params) {
                    var token = $auth.getToken();
                    if (token) {
                        params = params || {};
                        //console.log(element, operation, what, url, headers, params);
                        // params['access-token'] = $auth.getToken();
                        if (apiService.adminToken != undefined) 
                            headers.AdminToken = apiService.adminToken;
                        
                        headers.Authorization = 'Bearer ' + token;
                    }
                });
        });

    }
})();