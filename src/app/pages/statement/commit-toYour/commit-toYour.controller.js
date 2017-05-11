(function() {
    'use strict';
    
    angular
        .module('app.pages.statement')
        .controller('CommitToYourController', CommitToYourController);
    
    function CommitToYourController($scope, pageService) {

        angular.extend($scope, {
            showVideoBlock: false,
            showStaticTextBlock: false
        });

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Statement');
    }
}());