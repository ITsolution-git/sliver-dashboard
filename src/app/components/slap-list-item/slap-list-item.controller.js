(function () {
    'use strict';

    var slapListItem = {
        bindings: {
            item: '=',
            title: '@',
            openItemDialog: '&',
            openDeleteItemDialog: '&',
        },
        controller: function ($scope) {
            var vm = this;
        },
        templateUrl: 'components/slap-list-item/slap-list-item.html'
    };

    angular
        .module('app.components')
        .component('slapListItem', slapListItem);
}());