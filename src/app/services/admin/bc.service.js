(function () {
    'use strict';

    angular
        .module('app.services')
        .service('BCService', BCService);

    /* @ngInject */
    function BCService() {
        var me = this;

        // --- vars ---
        
        me.showBC = true;
        me.crumbs = [];
        me.h1 = '';

        // --- methods ---

        me.addCrumb = function (item) {
            // item.opts = item.opts || {};
            me.crumbs.push(item);
            return me;
        };

        me.reset = function () {
            me.crumbs = [];
            me.h1 = '';
            me.showBC = true;
            return me;
        };

        me.setShowBC = function(status){
            me.showBC = status;
            return me;
        };

        me.setPageTitle = function (title) {
            me.h1 = title;
            // $rootScope.setDocumentTitle(title);
            return me;
        };
    }
})();