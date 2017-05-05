(function () {
    'use strict';

    angular
        .module('app.services')
        .service('asideService', asideService);

    /* @ngInject */
    function asideService() {
        var slapstatement = [
            {
                name: 'overview',
                sref: 'statement.overview'
            }, {
                name: 'your statement',
                sref: 'statement.yourStatement'
            }
        ];

        this.getSlapStatement = getSlapStatement;

        ////////////////////////
        function getSlapStatement() {
            return slapstatement;
        }
    }
}());