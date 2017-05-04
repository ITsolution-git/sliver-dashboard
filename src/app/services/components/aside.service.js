(function () {
    'use strict';

    angular
        .module('app.services')
        .service('asideService', asideService);

    /* @ngInject */
    function asideService() {
        var vm = this;
        var data = [
            {
                name: 'slapstatement',
                subs: [
                    {
                        name: 'index',
                        sref: 'statement.index'
                    }
                ]
            }, {
                name: 'year goal',
                subs: [
                    {
                        name: 'index',
                        sref: 'yearGoal.index'
                    }
                ]
            }, {
                name: 'ideal client'
            }, {
                name: 'action plan'
            }, {
                name: 'execute'
            }
        ];

        this.getData = getData;

        ////////////////////////
        function getData() {
            return data;
        }
    }
}());