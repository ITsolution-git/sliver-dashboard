(function () {
    'use strict';

    angular
        .module('app.pages.actionPlan')
        .controller('ConnectingStrategyStrategizingController', ConnectingStrategyStrategizingController);

    function ConnectingStrategyStrategizingController($scope, activeStep, pageService,stepService, $state, $timeout, actionplanService, actionItems, excuteItemService, $q) {

        angular.extend($scope, activeStep.model, {
            forward: true,
            actionItems: actionItems,
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
            notifications: [],

            filterActionItemsByMonth: filterActionItemsByMonth,
            defaultActionItemsAdded: false,

            qStgChanged: [false,false,false,false]  //Quater Strategy changed
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

                        
                        //If Action Item is empty, should load default action items.
                        //TODO: When user chooses another strategy for that quater, should updated it?

                        $timeout(function(){
                            for (var i = 0; i < 12; i++) {
                                addNewActions(i);
                            }
                        });

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

        //TODO Load Default items
        function loadDefaultActionItems(QID){

            //Delete actions item in that quater and reload

            // if(!confirm("You changed the strategy for Q" + (QID+1))+ '. Do you want reload default action items. Reloading will delete origial default action items.') {
            //     return;
            // }
            var quater = $scope.data[QID];
            if(quater.strategy && quater.strategy.id) {

                var itemsByMonth = actionplanService.getDefaultActionsByStrategy(quater.strategy.id);
                _.each(itemsByMonth.actions, function(itemsMonths, monthID) {
                    var dueDate = moment({year: Math.floor($scope.startDate.year + ((+$scope.startDate.month + 3 * QID - 1 + monthID)/12)), month: $scope.QMonths[QID][monthID], day: 1 }).endOf('month').format('YYYY-MM-DD');
                    console.log(dueDate);
                    _.each(itemsMonths, function(item){
                        //Set Due date to end of that month
                        var copied = angular.copy(item);
                        copied.dueDate = dueDate;
                        copied.isPriorItem = 1;
                        excuteItemService.createItem(copied).then(function(item){
                            $scope.actionItems.push(item.data);
                        }); 
                        
                    });
                });
            }
            
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


        function addNewActions(monthID, event) {

            var force = false;

            var monthActions = filterActionItemsByMonth(monthID);

            if (monthActions.length > 0) {
                var lastItem = monthActions[monthActions.length - 1];
                if (lastItem.title != '') {
                    force = true;
                }
            } else {
                force = true;
            }

            if (force) {
                $scope.actionItems.push({
                    type: 'action', 
                    dueDate: moment({year: Math.floor($scope.startDate.year + ((+$scope.startDate.month + monthID)/12)), month: monthID, day: 1 }).endOf('month').format('YYYY-MM-DD'),
                    progress: 0, 
                    feeling: null, 
                    notes: '', 
                    title:''});
            }
        }
        

        function checkActionCompleted(action, monthID, evt) {
            if (action.title.trim() != '') {
                addNewActions(monthID, event);
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
            //Validations Before sending Data

            if ((($scope.pageName == 'quarterlyGoals') || ($scope.pageName == 'commitToYourActionPlan')) && !checkQuaterUnitsValid()) { //quater units sum should same as quaterly goal.
                $('body').animate({
                    scrollTop: $("slap-notifications").offset().top
                }, 400);
                return false;
            }

            if ((($scope.pageName == 'connectingStrategyStrategizing')) && !checkQuaterStrategiesValid()) { //quater units sum should same as quaterly goal.
                $('body').animate({
                    scrollTop: $("slap-notifications").offset().top
                }, 400);
                return false;
            }

            var nextprevStep = stepService.getNextAndPrevStep();
            
            stepService.updateActiveModel($scope);
            stepService.setFinishActiveStep();
            //loadDefaultActionItems

            //TODO delete only updated strategy quater and reload data for that quater.
            if($scope.qStgChanged[0] || $scope.qStgChanged[1] || $scope.qStgChanged[2] || $scope.qStgChanged[3]) {
                
                //Delete all actions iteas and reload again
                $q.all($scope.actionItems.filter(function(item){
                    if (item.type=='action' && item.isPriorItem){
                        return item.remove();
                    }
                })).then(function(responses){
                    loadDefaultActionItems(0);
                    loadDefaultActionItems(1);
                    loadDefaultActionItems(2);
                    loadDefaultActionItems(3);
                })

                // qStgChanged.forEach(function(item, ind){
                //     if(item)
                //         loadDefaultActionItems(ind);
                // });
            }

            var url = 'whatsHappening';

            var data = {};
            
            var eventsByMonth = _.map($scope.eventsByMonth, function (month) {    
                return {events: month.events};
            });
            data.eventsByMonth = eventsByMonth;

            return stepService.sendApiData(url, $scope.data)
                .then(function () {

                    if (($scope.pageName != 'actionItems') && ($scope.pageName != 'commitToYourActionPlan')) { //Do not save when current page is not Action Items
                        $scope.saved = true;
                        stepService.setRequestApiFlag();
                        if(direction == 'forward')  
                            $state.go(nextprevStep.nextStep.sref); 
                        else if(direction == 'backward')
                            $state.go(nextprevStep.prevStep.sref);
                    } else {
                        $q.all($scope.actionItems.map(function(item){
                            if (item.title == '')
                                return true;
                            if (_.isUndefined(item._id)) {
                                return excuteItemService.createItem(item);
                            } else {
                                return item.save();
                            }
                        })).then(function(resp){
                            return stepService.sendApiData('worldAroundYou', data)
                            .then(function () {
                                $scope.saved = true;
                                stepService.setRequestApiFlag();
                                if(direction == 'forward')  
                                    $state.go(nextprevStep.nextStep.sref); 
                                else if(direction == 'backward')
                                    $state.go(nextprevStep.prevStep.sref);
                            });    
                        })
                    }
                });
        }

        function checkQuaterUnitsValid() {
            var valid = true;
            _.each($scope.revenues, function(revenue) {
                var totalRevenue = +$scope.data[0].units[revenue.name] + +$scope.data[1].units[revenue.name] + +$scope.data[2].units[revenue.name] + +$scope.data[3].units[revenue.name]; 
                if (totalRevenue != revenue.unit){
                    valid = false;
                }
                    
            })
            if (!valid){
                addNotification($scope.notifications, {name: 'Invalid Sum', type: 'error', message:'Total Sum of Revenue Streams of each Quater should be exactly same as Yearly Goal.', show: true});
            } else {
                removeNotificaton($scope.notifications,'Invalid Sum');
            }
            return valid;
        }

        function checkQuaterStrategiesValid() {
            var valid = true;
            _.each($scope.data, function(quater, index) {
                if ((!quater.strategy) || (!quater.strategy.id)) {
                    valid = false;
                }
            });

            if (!valid) {
                addNotification($scope.notifications, {name: 'Invalid Strategy', type: 'error', message:'Please choose strategies for each Quater ', show: true});
            } else {
                removeNotificaton($scope.notifications, 'Invalid Strategy');
            }
            return valid;
        }

        function deleteAction(action, month) {
            if ($scope.actionItems.length > 1) {
                if (!_.isUndefined(action._id)) {
                    action.remove().then(function(response){
                        _.remove($scope.actionItems, function (n) {
                            return n === action;
                        });
                    });
                } else {
                    _.remove($scope.actionItems, function (n) {
                            return n === action;
                        });
                }
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

        function filterActionItemsByMonth(monthID) {
            return $scope.actionItems.filter(function(item){
                return moment(item.dueDate).month() == monthID;
            });
        }

        $scope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            if ($scope.saved != true) {
                sendData();
            }
        });
    }
}());