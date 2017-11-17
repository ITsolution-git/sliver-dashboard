(function () {
    'use strict';

    angular
        .module('app.services')
        .service('commonDialogService', commonDialogService);

    /* @ngInject */
    function commonDialogService($mdDialog) {
        var service = this;
        service.openDeleteItemDialog = openDeleteItemDialog;

        function openDeleteItemDialog($event, title, ok, success, fail) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title(title)
                .textContent(title)
                .ariaLabel(title)
                .targetEvent($event)
                .ok(ok)
                .cancel('No');

            $mdDialog.show(confirm).then(success, function() {
                
            });
        }

        return service;
    }
})();