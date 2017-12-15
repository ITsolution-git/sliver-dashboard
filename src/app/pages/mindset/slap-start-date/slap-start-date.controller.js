(function () {
    'use strict';

    angular
        .module('app.pages.mindset')
        .controller('SlapStartDateController', SlapStartDateController);

    /* @ngInject */
    function SlapStartDateController($scope, $state, userService, pageService, stepService, activeStep, excuteItemService, excuteItems, $q) {
        $scope.videoUrl = activeStep.videoUrl;
        $scope.visible = true;
        $scope.changed = false;

        var date = new Date();
        var currentMonth = ((date.getMonth() + 1) % 13).toString();
        var currentYear = date.getFullYear();
        var excuteItems = excuteItems;
        // $scope.years = [];
        // for(var i = 0; i<19; i++){
        //     $scope.years.push(i+2000);
        // }
        userService.loadUser().then(function (user) {
            $scope.user = angular.copy(user, {});
        })
        $scope.notifications = [];

        angular.extend($scope, activeStep.model, {
            forward: true,
            sendData: sendData,
            saved: false,

            valueChanged: false
        });

        var beforeSave = moment({year: $scope.data.year, month: +$scope.data.month - 1, day:1});
        if ($scope.data.year === null || $scope.data.year === 0) {
            $scope.data.year = currentYear
            // $scope.data.year = 2017;            
        }

        if ($scope.data.month === null || $scope.data.month === "0") {
            $scope.data.month = currentMonth;
        }
        else var startMonth = $scope.data.month;
        $scope.data.slapStartDate = $scope.data.month + '_' + $scope.data.year;
        var filteredMonth = [];
        for (var i = 0; i < 4; i++) {   
            filteredMonth[i] = moment(new Date()).add(i, 'M').get('month') + 1;
        } 
        $scope.allMonths = [{ id: 1, name: 'January' }, { id: 2, name: 'February' }, { id: 3, name: 'March' }, { id: 4, name: 'April' }, { id: 5, name: 'May' },
        { id: 6, name: 'June' }, { id: 7, name: 'July' }, { id: 8, name: 'August' }, { id: 9, name: 'September' }, { id: 10, name: 'October' }, { id: 11, name: 'November' },
        { id: 12, name: 'December' }];
        $scope.months = $scope.allMonths.filter(function(month){
                return ~filteredMonth.indexOf(month.id);
            });

        $scope.years = $scope.months.map(function(month){
            if (+month.id < +currentMonth) {
                return currentYear + 1;
            } else {
                return currentYear;
            }
        });
        if ($scope.data.year && $scope.data.month) {
            var month = $scope.allMonths[$scope.data.month - 1];
            $scope.data.slapStartDate = $scope.data.month + '_' + $scope.data.year;      
            if ( !($scope.data.year == currentYear && $scope.data.month == currentMonth)){
                $scope.years.push($scope.data.year);
                $scope.months.push(month);
            }
            $scope.startdates = $scope.months.map(function(month,indx){
                return{
                    month: month,
                    year: $scope.years[indx]
                }
            
            }).sort(function(date1, date2){
                return date1.year - date2.year; 
            });
            $scope.startdates = _.uniqWith($scope.startdates, _.isEqual);
            
        };
        
        // $scope.$watch('data.month', function (value) {
        //     if (value.split('_')[0]; != startMonth) {
        //         if (value !== undefined) {
        //             if (+value < +currentMonth) {
        //                 $scope.data.year = currentYear + 1;
        //             } else {
        //                 $scope.data.year = currentYear;
        //             }
        //             $scope.changed = true;
        //         }
        //     }
        // });

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle(stepService.getActiveStep().name);

        function sendData(direction) {
            var startdate = $scope.data.slapStartDate.split('_');
            $scope.data.month = startdate[0];
            $scope.data.year = +startdate[1];
            //$scope.data.year = +$scope.data.year;
            if ($scope.data.year != beforeSave.get('year') + 1 && $scope.data.month != beforeSave.get('month') + 1) {
                $scope.changed = true;
            }
            delete $scope.data.slapStartDate
            stepService.updateActiveModel($scope);
            stepService.setFinishActiveStep();

            var nextprevStep = stepService.getNextAndPrevStep();
            var urls = activeStep.sref.split('.');
            //If user changed the date and have excute items.            
            if ($scope.data.month != (beforeSave.month() + 1))  {
                //As a matter of fact, the new startdate cannot be a past of now because of $scope.$watch('data.month', function (value) { line codes
                var newStartDate = moment({year: $scope.data.year, month: +$scope.data.month -1, day:1});
                if (newStartDate.isBefore(moment(), 'month')) {
                    $scope.notifications = [{name: 'Wrong Start Date', type: 'error', message: 'You cannot set SLAP Start Date to past.', show: true}];
                } else {
                    $scope.notifications = [];
                    /// Now move all excute items according to its start date
                    var deltaMonths = moment.duration(newStartDate - beforeSave).asMonths().toFixed(0);

                    _.each(excuteItems, function(item){
                        item.dueDate = moment(item.dueDate).add(deltaMonths, 'months').format('YYYY-MM-DD');
                        if ([28, 29, 30, 31].indexOf(moment(item.dueDate).date()) != -1){
                            item.dueDate = moment(item.dueDate).date(28).format('YYYY-MM-DD');
                        }

                    });

                    $q.all(excuteItems.map(function(item){ return item.save();}))
                    .then(function(responses){
                        return stepService.sendApiData(urls[urls.length - 1], $scope.data)
                        .then(function () {
                            stepService.setRequestApiFlag();
                            $scope.saved = true;
                            if(direction == 'forward')  
                                $state.go(nextprevStep.nextStep.sref); 
                            else if(direction == 'backward')
                                $state.go(nextprevStep.prevStep.sref);
                        });
                    });
                }
            } else {

                if(direction == 'forward')
                    $state.go(nextprevStep.nextStep.sref); 
                else if(direction == 'backward')
                    $state.go(nextprevStep.prevStep.sref);
            }
            
        }

        $scope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            if ($scope.saved != true) {
                sendData();
            }
        });
    }

}());