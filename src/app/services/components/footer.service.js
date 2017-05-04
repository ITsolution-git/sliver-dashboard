(function () {
    'use strict';

    angular
        .module('app.services')
        .service('footerService', footerService);

    function footerService() {
        var _statePrev = null;
        var _stateNext = null;

        this.setParams = setParams;
        this.getPrev = getPrev;
        this.getNext = getNext;
        this.getAll = getAll;

        //////////////////////////

        function setParams(params) {
            _statePrev = params.statePrev;
            _stateNext = params.stateNext;
        }

        function getPrev() {
            return _statePrev;
        }

        function getNext() {
            return _stateNext;
        }

        function getAll() {
            return {
                prev: _statePrev,
                next: _stateNext
            }
        }
    }
}());