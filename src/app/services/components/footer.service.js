(function () {
    'use strict';

    angular
        .module('app.services')
        .service('footerService', footerService);

    function footerService() {
        var self = this;
        self._state = {};

        self.setParams = setParams;

        //////////////////////////

        function setParams(params) {
            self._state.prev = params.prev;
            self._state.next = params.next;
        }
    }
}());