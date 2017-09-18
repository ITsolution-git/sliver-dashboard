(function() {
    'use strict';

    angular
        .module('app.pages.slapSchool')
        .controller('SlapSchoolController', SlapSchoolController);

    /* @ngInject */
    function SlapSchoolController($scope, $state, data, toaster) {

        $scope.data = data; 
        $scope.start_ = 0;
        $scope.duration_ = 0;

        $scope.isStart = function(start, duration, e, url) {
            var now = new Date();
            e.preventDefault();
            if (!((now >= start) && (now <= start + (duration * 60) * 60))) 
                toaster.pop({type: 'error', body: "Please come back and join this webinar when it starts!", timeout: 0})
            else {
                    window.open(url, '_blank');
            }
        }   
    }

}());