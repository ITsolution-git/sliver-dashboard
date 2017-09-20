(function () {
    'use strict';

    var slapHeader = {
        binding: {},
        controller: function ($auth, $state, userService, $window, $rootScope, CONFIG) {
            var vm = this;
            
            $rootScope.$on('SlapAccounUpdated', function (event, user) {
                vm.user = user;
                vm.avatarUrl = CONFIG.api + "/v1/user/avatar/" + user.avatarId;
            });
            $rootScope.$on('avatarUpdated', function (event, id) {
                vm.avatarUrl = CONFIG.api + "/v1/user/avatar/" + id;
            });
            userService.getUser().then(function (user) {
                 vm.user = user;
                 vm.avatarUrl = CONFIG.api+"/v1/user/avatar/"+user.avatarId;
            });

            this.logout = function () {
                $auth.logout();
                $window.location.reload();
                $state.go('login');
            }
            
            this.selectSLAPyear = function(user) {
                if(user._id == vm.user._id)
                    return;

                userService.selectSLAPyear(user._id)
                .then(function(req){
                    $auth.setToken(req.data.token);
                    // userService.getUser(true).then(function (user) {
                    //     vm.user = user;
                    //     // $state.go('home');
                    // });
                    $window.location.reload();
                    $state.go('home');

                })

            }
        },
        templateUrl: 'components/slap-header/slap-header.html'
    };

    angular
        .module('app.components')
        .component('slapHeader', slapHeader);
}());