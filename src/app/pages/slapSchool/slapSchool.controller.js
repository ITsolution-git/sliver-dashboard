(function() {
    'use strict';

    angular
        .module('app.pages.slapSchool')
        .controller('SlapSchoolController', SlapSchoolController);

    /* @ngInject */
    function SlapSchoolController($scope, $state, data, toaster) {
        
        var arr = [];
        var webinars = data[0].webinars;

        data[0].forEach(function(item){
            arr.push(item.name);
        });
        var result = [];
        data[0].forEach(function(item){
            result = item.webinars;
        });

        for (var i = 0; i < result.length; i++) {
            result[i].name = arr[i];
        }
        $scope.data = result;
        $scope.duration_ = 0;


        $scope.isStart = function(start, duration, e, url) {
            
            e.preventDefault();
            var now = moment();
            var start_ = moment(start);
            start_.add(duration, 'minutes');

            if ((now._d >= start_._d) && (now._d <= start_._d))
                window.open(url, '_blank');
            else {
                toaster.pop({type: 'success', body: "This webinar is not live right now.  Please come back and join us when it starts!  It will be good!", timeout: 3000})
            }
        }   
    }

}());