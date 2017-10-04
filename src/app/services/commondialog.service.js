(function () {
    'use strict';

    angular
        .module('app.services')
        .service('commonDialogService', commonDialogService);

    /* @ngInject */
    function commonDialogService($mdDialog) {
        var service = this;
        service.openDeleteItemDialog = openDeleteItemDialog;

        function openDeleteItemDialog($event, title, success, fail) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Confirm Delete')
                .textContent(title)
                .ariaLabel('Delete')
                .targetEvent($event)
                .ok('Delete')
                .cancel('No');

            $mdDialog.show(confirm).then(success, function() {
                
            });
        }

        return service;
    }
})();