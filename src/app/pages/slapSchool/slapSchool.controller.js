(function() {
    'use strict';

    angular
        .module('app.pages.slapSchool')
        .controller('SlapSchoolController', SlapSchoolController);

    /* @ngInject */
    function SlapSchoolController($scope, $state, data, toaster, pageService, userService) {
        pageService
        .setPageTitle('SLAPschool');
        
        var arr = [];
        
        var webinars = data.webinars;
        $scope.suggestionType = [];
        $scope.types = [{id: 0, text: "Did a SLAPschool Event"}, {id: 1, text: "Added a Training or Tool"}, {id: 2, text: "Created an FAQ"}]
        $scope.suggestionText = "";
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

        $scope.data.forEach(function (item) {

            var topic = item.topic.split('ft. ');
            item.topic = topic;
            return item;
        });

        $scope.duration_ = 0;


        $scope.openTraining = function() {
            $state.go('slapSchool.trainingTools');
        }

        $scope.isStart = function(start, duration, e, url) {
            e.preventDefault();
            var now = moment();
            var start_ = moment(start);
            start_.add(duration, 'minutes');
            if (moment(now).isBetween(moment(start),moment(start_),'hours',[]))
                window.open(url, '_blank');
            else {
                toaster.pop({type: 'success', body: "This webinar is not live right now.  Please come back and join us when it starts!  It will be good!", timeout: 3000})
            }
        }  

        $scope.sendSuggestion = function() {
            userService.sendSuggestion({suggestionType: $scope.suggestionType, suggestionText: $scope.suggestionText}).then(function() {
                $scope.suggestionType = [];
                $scope.suggestionText = "";
                toaster.pop({type: 'success', body: "Success!", timeout: 3000})
            })

        }

    }

}());