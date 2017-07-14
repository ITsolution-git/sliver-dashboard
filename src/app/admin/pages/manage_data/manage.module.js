(function() {
    'use strict';

    angular
        .module('adminapp.pages.manage', [
            'manage.products.module',
            'manage.coupon.module',
            'manage.users.module'
        ]);
}());