(function () {
    'use strict';

    angular
        .module('slapperm')
        .run(runApp);

    function runApp($rootScope, $timeout, $window, $state, $auth, pageService, CONFIG, userService, adminUserService, PermPermissionStore, PermRoleStore, permissionService) {
        // PermPermissionStore
        // .definePermission('canBuild', function(){
        //     return true;
        // });
        // PermPermissionStore
        // .definePermission('canAdmin', function(){
        //     return true;
        // });
        PermPermissionStore
        .defineManyPermissions(permissionService.allPerms(), permissionService.checkPerm);
        
        // var permissions = ['canBuild', 'seeMeeting', 'editMeeting', 'deleteMeeting']

        // PermPermissionStore.defineManyPermissions(permissions, /*@ngInject*/ function (permissionName) {
        // return _.contains(permissions, permissionName);
        // });


        // PermRoleStore    
        // // Or use your own function/service to validate role
        // .defineRole('USER', /*@ngInject*/ function (Session) {        
        //     return Session.checkSession();
        // });

        // PermRoleStore    
        // // Or use your own function/service to validate role
        // .defineManyRoles({
        //     // 'AUTHORIZED': /* @ngInject*/ function (Session) { return Session.checkSession(); },
        //     'USER': ['canReadInvoices'],
        //     'ADMIN': ['canReadInvoices','canEditInvoices','canUploadImages']
        // });



        $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            // запоминаем, куда пытаемся перейти и с какими параметрами
            $rootScope.toState = toState;
            $rootScope.toStateParams = toStateParams;

            if (!$rootScope.isReady) {
                event.preventDefault();
                return false;
            }

            if (toState.data && toState.data.access) {
                /*Cancel going to the authenticated state and go back to landing*/
                if (toState.data.access == '@' && !$auth.isAuthenticated()) {
                    event.preventDefault();
                    return $state.go('login');
                }

                if (toState.data.access == '?' && $auth.isAuthenticated()) {
                    event.preventDefault();
                    return $state.go('home');
                }

                // if (toState.data.access == 'admin' && !userService.isAdmin()) {
                //     event.preventDefault();
                //     return $state.go('home');
                // }

                // if (userService.isAdmin() && !toState.data.isAdminPage) {
                //     event.preventDefault();
                //     return $state.go('admin.home');
                // }
            }
        });


        // $rootScope.$on('$stateChangePermissionDenied', function(event, toState, toParams, options) { 
        //     toaster.pop({type: 'error', body: 'You do not have permission!'});
        // });

    }

})();