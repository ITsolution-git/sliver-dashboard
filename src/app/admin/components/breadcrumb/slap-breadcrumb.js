(function() {
    'use strict';

    var slapBreadcrumb = {
        bindings : {

        },
        controller : function(pageService) {
            this.breadcrumbs = pageService;
        },
        templateUrl : 'admin/components/breadcrumb/slap-breadcrumb.html'
    };

    slapBreadcrumb.$inject = ['pageService'];

    angular
        .module('adminapp.components')
        .component('slapBreadcrumb', slapBreadcrumb);
}());