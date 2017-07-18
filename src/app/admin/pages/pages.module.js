(function() {
    'use strict';

    angular
        .module('adminapp.pages',
            [
                'adminapp.pages.main',
                'adminapp.pages.manage',
                'adminapp.pages.reports',
                'adminapp.pages.slapsters'
            ]);
}());