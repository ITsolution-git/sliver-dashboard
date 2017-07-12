(function() {
    'use strict';

    var slapBreadcrumb = {
        bindings : {

        },
        controller : function(BCService) {
            this.breadcrumbs = BCService;
        },
        templateUrl : 'admin/components/breadcrumb/slap-breadcrumb.html'
    };

    slapBreadcrumb.$inject = ['BCService'];

    angular
        .module('adminapp.components')
        .component('slapBreadcrumb', slapBreadcrumb);
}());