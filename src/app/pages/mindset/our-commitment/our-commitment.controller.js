(function () {
    'use strict';

    angular
        .module('app.pages.mindset')
        .controller('OurCommitmentController', OurCommitmentController);

    function OurCommitmentController() {
        var vm = this;
        this.visible = true;
    }
}());