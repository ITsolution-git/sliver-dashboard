(function() {
    'use strict';

    angular
        .module('app.pages.slapSchool')
        .controller('SlapSchoolController', SlapSchoolController);

    /* @ngInject */
    function SlapSchoolController($scope, $state, data, toaster) {

        $scope.data = data; 
        $scope.duration_ = 0;

        $scope.isStart = function(start, duration, e, url) {
            
            e.preventDefault();
            var now = moment();
            var start_ = moment(start);
            start_.add(duration, 'minutes');

            if ((now._d >= start_._d) && (now._d <= start_._d))
                window.open(url, '_blank');
            else {
                toaster.pop({type: 'error', body: "Please come back and join this webinar when it starts!", timeout: 0})
            }
        }   
    }

}());