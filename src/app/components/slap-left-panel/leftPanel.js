(function() {
    'use strict';

    var slapLeftPanel = {
        binding: {

        },
        controller: function(asideService) {
            var vm = this;
            // vm.collapse = function (event) {
            //     var prevActive = $('.left-panel-item-active');
            //     $('.in').removeClass('in');
            //     if (prevActive.length > 0) {
            //         prevActive.removeClass('left-panel-item-active');
            //         $('.item-circle-active').removeClass('item-circle-active');
            //     }
            //
            //     var parent = $(event.target).closest('.left-panel-item');
            //     var circle = $(event.target).prevAll('.item-circle');
            //
            //     parent.addClass('left-panel-item-active');
            //     circle.addClass('item-circle-active');
            // };

            vm.data = asideService.getData();
        },
        templateUrl: 'components/slap-left-panel/leftPanel.html'
    };

    angular
        .module('app.components')
        .component('slapLeftPanel', slapLeftPanel);
}());