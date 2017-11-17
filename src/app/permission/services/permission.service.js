(function () {
    'use strict';

    angular
        .module('slapperm.services')
        .service('permissionService', permissionService);

    /* @ngInject */
    function permissionService($q, apiService, $rootScope, adminUserService, userService, $timeout, $auth) {
        var me = this;

        me.user = null;
        me.rolePermModel = [
            {role: self.ROLE_ADMIN, perms: ['canAdmin', 'canSlpasters', 'canPartners', 'canBuildReports', 'canPartnerReports', 'canSLAPexpertReports', 'canPlans', 'canPromocodes', 'canEmailTemplates', 'canUsers', 'canDelete','canTestUsers']},
            {role: self.ROLE_SLAPEXPERT, perms: ['canAdmin', 'canSlpasters']},
            {role: self.ROLE_SLAPMANAGER, perms: ['canAdmin', 'canSlpasters', 'canBuildReports', 'canPartnerReports', 'canPlans', 'canPromocodes', 'canEmailTemplates', 'canUsers', 'canDelete','canTestUsers']},
            {role: self.ROLE_SLAPSTER, perms: ['canBuild']},
            { role: self.ROLE_TEST, perms: ['canBuild'] },
            {role: self.ROLE_PARTNER, perms:['canAdmin', 'canSlpasters', 'canBuildReports']},
        ];

        me.permModel = [
            {permName: 'canSlapsters', 'sref': 'slapsters.list', 'name': 'Slapsters'},
            {permName: 'canBuildReports', 'sref': 'reports.list', 'name': 'Build Reports'},
            {permName: 'canPartnerReports', 'sref': 'reports.partner.item', 'name': 'Partner Reports'},
            {permName: 'canSLAPexpertReports', 'sref': 'reports.slapexpert.item', 'name': 'SLAPexpert Reports'},
            {permName: 'canPlans', 'sref': 'plans.list', 'name': 'Plans'},
            {permName: 'canPromocodes', 'sref': 'coupon.list', 'name': 'Promo Codes'},
            {permName: 'canPartners', 'sref': 'partners.list', 'name': 'Partners' },
            {permName: 'canEmailTemplates', 'sref': 'emailtemplates.list', 'name': 'Email Templates'},
            {permName: 'canUsers', 'sref': 'users.list', 'name': 'Users'},
            {permName: 'canTestUsers', 'sref': 'testusers.list', 'name': 'Test Users' },
            {permName: 'canAdmin', 'sref': 'admin.home', 'name': 'Admin'},
            {permName: 'canDelete', 'sref': 'archive.list', 'name': 'Archived Accounts'},
            {permName: 'canBuild', 'sref': 'home', 'name': 'Build'},
            
        ];

        me.menuModel = [
            {
                menuName: 'Reports', 
                children: [
                    {menuName: 'Build Reports', needPerm: 'canBuildReports'},
                    {menuName: 'Partner Reports', needPerm: 'canPartnerReports'},
                    {menuName: 'SLAPexpert Reports', needPerm: 'canSLAPexpertReports'},
                    {menuName: 'Archived Accounts', needPerm: 'canDelete'},
                ]
            },
            {
                menuName: 'Admin', 
                children: [
                    {menuName: 'Plans', needPerm: 'canPlans'},
                    {menuName: 'Partners', needPerm: 'canPartners'},
                    {menuName: 'Promo Codes', needPerm: 'canPromocodes'},
                    {menuName: 'Email Templates', needPerm: 'canEmailTemplates'},
                    {menuName: 'Users', needPerm: 'canUsers'},
                    {menuName: 'Test Users', needPerm: 'canTestUsers'}
                ]
            },
        ]

        $timeout(function(){
            if ($auth.isAuthenticated()) {
                userService.loadUser().then(function (user) {
                    me.user = user;
                });
            }
        });


        // me.myPermissions = function()
        // me.

        // self.ROLE_ADMIN = 1;
        // self.ROLE_SLAPEXPERT = 2;
        // self.ROLE_SLAPMANAGER = 3;
        // self.ROLE_SLAPSTER = 4;
        // self.ROLE_PARTNER = 5;
        // self.ROL_TEST = 6

        me.filterSlapstersByPermission = function(slapsters) {
            var user = userService.getStoredUser();
            if(user.role == adminUserService.ROLE_PARTNER) {
                return _.orderBy(slapsters.filter(function(slapster){
                    return slapster.partnerId == user._id;
                }), ['createdAt']);
            } else if(user.role == adminUserService.ROLE_SLAPEXPERT) {
                return _.orderBy(slapsters.filter(function(slapster){
                    return slapster.expertId == user._id;
                }), ['createdAt']); 
            } else {
                return _.orderBy(slapsters, ['createdAt']);
            }
            
        }

        me.allPerms = function() {
            return me.permModel.map(function(perm){return perm.permName});
        }

        me.checkPerm = function(permName) {
            return me.getMyPerms().then(function(perms){
                if( perms.perms.indexOf(permName) == -1)
                    throw new Error('No Permission');
                else
                    return true;
            })    
        };

        me.getMyPerms = function() {
            
            return userService.loadUser().then(function (user) {
                var perms = _.find(me.rolePermModel, {role: user.role});
                return perms;
            });
        }
        me.getMyAdminMenu = function () {
            return me.getMyPerms().then(function(perms){
                if(!perms){ // If cannot find the perms corresponding the role.
                    return [];
                }
                var menus = angular.copy(me.menuModel); // Copy the value

                return me.menuModel.map(function(menu){  
                    var mymenu = angular.copy(menu);
                    var children = menu.children.filter(function(child){  
                        return perms.perms.indexOf(child.needPerm) != -1; //Decide if my perms include the permission to read the menu
                    }).map(function(child){ //load ui-sref from permmodel
                        var mychild = angular.copy(child);
                        var perm = _.find(me.permModel, {permName: child.needPerm});

                        mychild.sref = perm.sref;
                        return mychild;
                    });
                    mymenu.children = children; //Set with my children
                    return mymenu;
                })
                .filter(function(menu){
                    return menu.children.length != 0;   //IF you have 0 chidren menu, do not include it in menu list.
                });
                
            });
        }
        
        me.isAdmin = function () {
            return userService.loadUser().then(function (user) {
                me.user = user;
                return (me.user && 
                    ((me.user.role == adminUserService.ROLE_ADMIN) || 
                     (me.user.role == adminUserService.ROLE_SLAPEXPERT) || 
                     (me.user.role == adminUserService.ROLE_SLAPMANAGER) || 
                     (me.user.role == adminUserService.ROLE_PARTNER)));
            });
        };

        me.isSlapster = function () {
            return userService.loadUser().then(function (user) {
                me.user = user;
                return (me.user && 
                    ((me.user.role == adminUserService.ROLE_ADMIN) || 
                     (me.user.role == adminUserService.ROLE_SLAPEXPERT) || 
                     (me.user.role == adminUserService.ROLE_SLAPMANAGER) || 
                     (me.user.role == adminUserService.ROLE_PARTNER))||
                    (me.user.role ==  adminUserService.ROLE_TEST) 
                    );
            });
        };

    }
})();