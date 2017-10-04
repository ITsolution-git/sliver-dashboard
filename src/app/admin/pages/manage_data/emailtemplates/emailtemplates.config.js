(function() {
    'use strict';

    angular
        .module('manage.emailtemplates.module')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider) {
        $stateProvider
            .state('emailtemplates', {
                abstract: true,
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                url: '/emailtemplates',
                parent: 'admin',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                }

            })
            .state('emailtemplates.list', {
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                url: '',
                controller: 'EmailtemplatesManageController',
                templateUrl: 'admin/pages/manage_data/emailtemplates/list/emailtemplates-manage.html'
            })
            // .state('emailtemplates.add', {
            //     data: {
            //         access: 'admin',
            //         isAdminPage: true
            //     },
            //     url: '/add',
            //     controller: 'EmailtemplatesItemController',
            //     templateUrl: 'admin/pages/manage_data/emailtemplates/item/emailtemplates-item.html'
            // })
            .state('emailtemplates.item', {
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                url: '/{emailtemplate_name}',
                controller: 'EmailtemplatesItemController',
                templateUrl: 'admin/pages/manage_data/emailtemplates/item/emailtemplates-item.html'
            });
    }
}());