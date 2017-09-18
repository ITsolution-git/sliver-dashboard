(function () {
    'use strict';

    angular
        .module('app.pages.actionPlan')
        .controller('WorldAroundYouController', WorldAroundYouController);

    function WorldAroundYouController($scope, activeStep, pageService, stepService, $state, $timeout, actionplanService, toaster) {

        angular.extend($scope, activeStep.model, {
            forward: true,
            sendData: sendData,
            model: {
            },
            startDate: {},
            QMonths: [],
            monthNames: actionplanService.getMonthLongNames(),
            currentQut: 1,
            checkEventCompleted: checkEventCompleted,
            deleteEvent: deleteEvent,
            quaterChanged: [false, false, false, false],
            saved: false
        });
        
        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('World Around You');

        if ($scope.data.eventsByMonth.length == 0) {
            $scope.data.eventsByMonth = actionplanService.getDefaultEvents();
        }
        
        $timeout(function() {
            _.each($scope.data.eventsByMonth, function(month){
                addNewEvents(month);
            });
        });

        getData();
        function getData() {
            // var urls = _.get($state.current, 'params.prev.sref').split('.');
            var url = 'allMindsetUser';

            // return stepService.getApiData(urls[urls.length - 1])
            return stepService.getApiData(url) //TODO: Think over the dynamics url
                .then(function (response) {
                    if (response && response.status === 200) {
                        $scope.startDate = response.data.slapStartDate;
                        $scope.QMonths.push( actionplanService.getNthQuaterMonths ($scope.startDate.month, 1));
                        $scope.QMonths.push( actionplanService.getNthQuaterMonths($scope.startDate.month, 2));
                        $scope.QMonths.push( actionplanService.getNthQuaterMonths($scope.startDate.month, 3));
                        $scope.QMonths.push( actionplanService.getNthQuaterMonths($scope.startDate.month, 4));
                    }
                });
        }

        function addNewEvents(month, model, currentIndex, monthID) {
            var index;

            if (model) {
                index = _.findIndex(month, model);
            }

            var force = false;
            if (month.events.length > 0) {
                var lastItem = month.events[month.events.length - 1];
                if (!angular.equals(lastItem, {name:''})) {
                    force = true;
                }
            }
            if (month.events.length === 0 || month.events.length === index + 1 || force) {
                month.events.push({name: ''});
                $timeout(function () {
                    var newElemIndex = currentIndex + 1;
                    var elem = $('#action-' + monthID + '-' + newElemIndex).focus();
                });  
            }
        }

        function sendData(direction) {
            // var res = $scope.quaterChanged.every(function (quater) {
            //     return quater;
            // });
            // if (!res && direction == 'forward' ) {
            //     toaster.pop({ type: 'info', body: 'You must make adjustments to the information in all 4 Quarters before you can go to the next step' });
            //     return false;
            // }
            stepService.updateActiveModel($scope);
            stepService.setFinishActiveStep();
            
            
            var nextprevStep = stepService.getNextAndPrevStep();
            var urls = activeStep.sref.split('.');

            var data = {};

            var eventsByMonth = _.map($scope.data.eventsByMonth, function (month) {
                return {actionItems: month.actionItems, events: month.events.slice(0, month.events.length - 1)};
                
            });
            data.eventsByMonth = eventsByMonth;

            return stepService.sendApiData(urls[urls.length - 1], data)
                .then(function () {
                    $scope.saved = true;
                    stepService.setRequestApiFlag();
                    if(direction == 'forward')  
                        $state.go(nextprevStep.nextStep.sref); 
                    else if(direction == 'backward')
                        $state.go(nextprevStep.prevStep.sref);
                });
        }



        function checkEventCompleted(event, month, evt, currentIndex, monthID) {
            if (event.name.trim() != '') {
                addNewEvents(month, event, currentIndex, monthID);
            } else {
            }
        }
        
        function deleteEvent(event, month, nthQut) {
            if (month.events.length > 1) {
                if (event.name) $scope.quaterChanged[nthQut - 1] = true;
                _.remove(month.events, function (n) {
                    return n === event;
                });

            }
        }

        $scope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            if ($scope.saved != true) {
                sendData();
            }
        });
        $scope.checkChanges = function (nthQut){
            $scope.quaterChanged[nthQut-1] = true;
        }

    }
}());