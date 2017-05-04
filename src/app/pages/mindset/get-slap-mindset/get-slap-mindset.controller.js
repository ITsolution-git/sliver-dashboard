(function () {
    'use strict';

    angular
        .module('app.pages.mindset')
        .controller('SlapMindsetController', SlapMindsetController);


    function SlapMindsetController() {
        var vm = this;
        this.visible = true;
    }

}());