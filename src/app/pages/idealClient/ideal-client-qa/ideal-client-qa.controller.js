(function() {
    'use strict';

    angular
        .module('app.pages.idealClient')
        .controller('IdealClientQAController', IdealClientQAController);

    /* @ngInject */
    function IdealClientQAController() {
        console.log('IdealClientQAController');
    }
}());