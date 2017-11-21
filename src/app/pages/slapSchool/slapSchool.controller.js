(function() {
    'use strict';

    angular
        .module('app.pages.slapSchool')
        .controller('SlapSchoolController', SlapSchoolController);

    /* @ngInject */
    function SlapSchoolController($scope, $state, data, toaster, pageService) {
        pageService
        .setPageTitle('SLAPschool');
        
        var arr = [];
        var webinars = data.webinars;

        data.forEach(function(item){
            arr.push(item.name);
        });
        var result = [];
        data.forEach(function(item){
            result = item.webinars;
        });

        for (var i = 0; i < result.length; i++) {
            result[i].name = arr[i];
        }
        $scope.data = result;
        $scope.duration_ = 0;


        $scope.openTraining = function() {
            $state.go('slapSchool.trainingTools');
        }

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