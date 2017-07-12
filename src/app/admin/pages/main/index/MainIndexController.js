(function() {
    'use strict';

    angular
        .module('adminapp.pages.main')
        .controller('AdminMainIndexController', AdminMainIndexController);

    AdminMainIndexController.$inject = ['BCService'];

    function AdminMainIndexController(BCService) {
        BCService
            .reset()
            .setShowBC(true)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Dashboard');
    }
}());