(function () {
    'use strict';

    angular
        .module('app.pages.mindset')
        .controller('SlapMindsetController', SlapMindsetController);

    /* @ngInject */
    function SlapMindsetController() {
        var vm = this;
        this.visible = true;
    }

}());