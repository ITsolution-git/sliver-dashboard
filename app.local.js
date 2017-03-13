(function () {
    'use strict';

    angular
        .module('app')
        .constant('CONFIG', {
            "title": "Slapcenter",
            "tokenParam": "access-token",
            "api": "http://localhost:8100",
            "url": {
                "static": ""
            }
        })
})();