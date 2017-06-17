(function () {
    'use strict';

    angular
        .module('app.pages.actionPlan')
        .controller('ConnectingStrategyStrategizingController', ConnectingStrategyStrategizingController);

    function ConnectingStrategyStrategizingController($scope, activeStep, pageService,stepService, $state, $timeout, actionplanService) {

        angular.extend($scope, activeStep.model, {
            forward: true,
            sendData: sendData,
            startDate: {},
            QMonths: [],
            monthNames: actionplanService.getMonthLongNames(),
            currentQut: 1,
            saved: false,
            strategies: [],
            topRatingStrategies: [],
            checkActionCompleted: checkActionCompleted,
            deleteAction: deleteAction,
            autoExpand: autoExpand,
            revenues: [],

            checkValidity: checkValidity,
            notifications: []
        });

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle(stepService.getActiveStep().name);

        getData();
        
        var nextprevStep = stepService.getNextAndPrevStep();
        var urls = activeStep.sref.split('.');
        $scope.pageName = urls[urls.length - 1];
        
        $timeout(function(){
            $scope.autoExpand('strategy-description');
        },0);
        
        function getData() {
            // var urls = _.get($state.current, 'params.prev.sref').split('.');
            var url = 'allMindsetUser';

            // return stepService.getApiData(urls[urls.length - 1])
            stepService.getApiData(url) //TODO: Think over the dynamics url
                .then(function (response) {
                    if (response && response.status === 200) {

                        $scope.startDate = response.data.slapStartDate;
                        $scope.QMonths.push( actionplanService.getNthQuaterMonths($scope.startDate.month, 1));
                        $scope.QMonths.push( actionplanService.getNthQuaterMonths($scope.startDate.month, 2));
                        $scope.QMonths.push( actionplanService.getNthQuaterMonths($scope.startDate.month, 3));
                        $scope.QMonths.push( actionplanService.getNthQuaterMonths($scope.startDate.month, 4));
                    }
                });
            
            // Get Rating information
            stepService.getApiData('rateConnectingStrategies')
                .then(function (response) {
                    if (response && response.status === 200) {
                        $scope.strategies = response.data.rateConnectingStrategies;
                        $scope.topRatingStrategies = actionplanService.calculateTopStrategies($scope.strategies);
                    }
                });


            url = 'worldAroundYou';
            stepService.getApiData(url) //TODO: Think over the dynamics url
                .then(function (response) {
                    if (response && response.status === 200) {
                        $scope.eventsByMonth = response.data.worldAroundYou.eventsByMonth;
                        if ($scope.pageName != 'quarterlyGoals') {
                            $timeout(function() {
                                _.each($scope.eventsByMonth, function(month){
                                    addNewActions(month);
                                });
                            });
    
                        }
                        $timeout(function(){
                            $scope.autoExpand('strategy-description');
                        },1000);
                    }
                });


            stepService.getApiData('revenueStreams')  //TODO: request api? data service
                .then(function (response) {
                    if (response && response.status === 200) {
                        $scope.revenues = _.get(response, 'data.revenueStreams.revenues', []);
                        initiateUnits();
                    }
                });

        }

        function initiateUnits() {
            
            _.each($scope.data, function(quater) {
                if (!quater) 
                    quater = {}; 
                if (_.isUndefined( quater.units )) 
                    quater.units = {};
                for (var i = 0; i < $scope.revenues.length; i++) {
                    if (_.isUndefined(quater.units[$scope.revenues[i].name] )) {
                        quater.units[$scope.revenues[i].name] = 0;
                    }
                }

            });
        }


        function addNewActions(month, model) {
            var index;

            if (model) {
                index = _.findIndex(month, model);
            }

            var force = false;

            if (_.isUndefined(month.actionItems)) {
                month.actionItems = [];
                force = true;
            } else {
            
                if (month.actionItems.length > 0) {
                    var lastItem = month.actionItems[month  .actionItems.length - 1];
                    if (!angular.equals(lastItem, {name:''})) {
                        force = true;
                    }
                }
            }

            if (month.actionItems.length === 0 || month.actionItems.length === index + 1 || force) {
                month.actionItems.push({name: ''});
            }
        }
        

        function checkActionCompleted(action, month, evt) {
            if (action.name.trim() != '') {
                addNewActions(month, event);
            } else {
            }
        }
        
        function checkValidity(value, evt) {
            if (value != '' && !value.match(/^\d+(\.)*\d*$/)) {
                $(evt.target).addClass('invalid');
                addNotification($scope.notifications, {name: 'Invalid Number', type: 'error', message:'Please provide valid Amount.', show: true});
                
                $scope.forward = false;
            } else {
                removeNotificaton($scope.notifications, 'Invalid Number');
                $(evt.target).removeClass('invalid');
                $scope.forward = true;
                
            }
        }
        
        function addNotification(notifications, newNotification) {
            var existing = _.find(notifications, {name: newNotification.name});
            if (_.isUndefined(existing)) {
                notifications.push(newNotification);
            } else {
                existing.show = true;
            }
            
        }

        function removeNotificaton(notifications, name) {
            _.remove(notifications, function(notification) {
                return notification.name == name;
            });
        }
        function sendData(direction) {
            stepService.updateActiveModel($scope);
            stepService.setFinishActiveStep();
            
            if ((($scope.pageName == 'quarterlyGoals') || ($scope.pageName == 'commitToYourActionPlan')) && !checkQuaterUnitsValid()) {
                $('body').animate({
                    scrollTop: $("slap-notifications").offset().top
                }, 400);
                return false;
            }
            var nextprevStep = stepService.getNextAndPrevStep();
            
            
            var url = 'whatsHappening';

            var data = {};

            var eventsByMonth = _.map($scope.eventsByMonth, function (month) {
                return {events: month.events, actionItems: month.actionItems.slice(0, month.actionItems.length - 1)};
            });
            data.eventsByMonth = eventsByMonth;

            return stepService.sendApiData(url, $scope.data)
                .then(function () {

                    if (($scope.pageName!='actionItems') || ($scope.pageName!='commitToYourActionPlan')) { //Do not save when current page is not Action Items
                        $scope.saved = true;
                        stepService.setRequestApiFlag();
                        if(direction == 'forward')  
                            $state.go(nextprevStep.nextStep.sref); 
                        else if(direction == 'backward')
                            $state.go(nextprevStep.prevStep.sref);
                    } else {
                        return stepService.sendApiData('worldAroundYou', data)
                            .then(function () {
                                $scope.saved = true;
                                stepService.setRequestApiFlag();
                                if(direction == 'forward')  
                                    $state.go(nextprevStep.nextStep.sref); 
                                else if(direction == 'backward')
                                    $state.go(nextprevStep.prevStep.sref);
                            });
                    }
                });
        }

        function checkQuaterUnitsValid() {
            var valid = true;
            _.each($scope.revenues, function(revenue) {
                var totalRevenue = +$scope.data[0].units[revenue.name] + +$scope.data[1].units[revenue.name] + +$scope.data[2].units[revenue.name] + +$scope.data[3].units[revenue.name]; 
                if (totalRevenue != revenue.unit){
                    valid = false;
                    addNotification($scope.notifications, {name: 'Invalid Sum', type: 'error', message:'Total Sum of Revenue Streams of each Quater should be exactly same as Yearly Goal.', show: true});
                } else {
                    removeNotificaton($scope.notifications,'Invalid Sum');
                }
                    
            })
            
            return valid;
        }

        function deleteAction(action, month) {
            if (month.actionItems.length > 1) {
                _.remove(month.actionItems, function (n) {
                    return n === action;
                });
            }
        }

        function autoExpand(e) {
            var elements = typeof e === 'object' ? [e.target] : [].slice.call(document.getElementsByClassName(e));
            elements.forEach(function(element){
                var scrollHeight = element.scrollHeight; // replace 60 by the sum of padding-top and padding-bottom
                if (scrollHeight != 0) 
                    element.style.height =  scrollHeight + "px";    
            });
        }

        $scope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            if ($scope.saved != true) {
                sendData();
            }
        });
    }
}());