(function () {
    'use strict';

    angular
        .module('app.pages.slapExcute')
        .controller('SlapExcuteMainController', SlapExcuteMainController);

    function SlapExcuteMainController($scope, $rootScope, pageService,stepService, $state, $timeout, actionplanService,  $mdDialog, excuteItems, excuteItemService, userAllData, $mdToast, $q, Restangular, apiService) {

        angular.extend($scope,  {
            userAllData: userAllData, //All user data from finishedsteps api
            idealClientName: userAllData.statement.yourStatement.fourth, 
            excuteItems: excuteItems,
            reflextionData: excuteItemService.reflextionData,
            startDate: moment().toDate(), //Plan start Date
            endDate: moment().toDate(), // Plan Ends Date
            today: moment().toDate(), // 
            mainView: 'list',
            defaultStrategies: actionplanService.getDefaultConnectingStrategies(),
            strategies: [],

            resultPage: false,
            changeView: function() { 
                $scope.resultPage = !$scope.resultPage; 
                $scope.filterSales();     //Main function to redraw grid
            },

            quaters: [], // quaters with `start` `end` date and months included in the quater
            currentQuater: {}, //item of quaters to indicate current quater,

            dashData: {
                quaterTotalActions: 0,
                quaterClosedActions: 0,
                daysLeft: 0,
                cQRevenueGoalPercent: 0,
                daysPassed: 0,
                daysReflected: 0,


                TRevenueGoalPercent: 0,

            },
            gridData: [],
            filteredSalesItems: [],
            gridActions: {},
            
            progress: {
                delay: 0,
                animation: 'easeInOutQuart',
                duration: 2000,
                stroke: 10,
                radius: 100,
                bgcolor: '#eaeaea' 
            },
            filter: {
                showActions: true,
                showSales: true,
                showReflextion: true,

                showQ: 1,

                period: 'week',
                status: 'overdue',

                periodStr: ''
            },
            filteredForTabView: filteredForTabView,
            filteredForListView: filteredForListView,
            filterSales: filterSales,
            colorAction: '#2778f5',
            colorSales: '#00837f',
            colorReflextion: '#f8d144',
            colorProgress: '#38b636',
            
            curMode: '',
            openItemDialog: openItemDialog,
            openDeleteItemDialog: openDeleteItemDialog,
            closeDialog: closeDialog,
            updateItem: updateItem,
            formData: {},

            selectEmotion: selectEmotion,
            selectReflextWhat: selectReflextWhat,
            tempReflextWhat: '',
            capitalize: capitalize
        });
        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'SLAPexcute', path: 'main'})
            .setPageTitle("Execute");
        
        $timeout(activate);
        function activate() {
            var startDate = $scope.userAllData.slapMindset.slapStartDate;
            $scope.quaters.push( _.merge(actionplanService.getNthQuater(startDate, 1), $scope.userAllData.actionPlan.connectingStrategyStrategizing[0]));
            $scope.quaters.push( _.merge(actionplanService.getNthQuater(startDate, 2), $scope.userAllData.actionPlan.connectingStrategyStrategizing[1]));
            $scope.quaters.push( _.merge(actionplanService.getNthQuater(startDate, 3), $scope.userAllData.actionPlan.connectingStrategyStrategizing[2]));
            $scope.quaters.push( _.merge(actionplanService.getNthQuater(startDate, 4), $scope.userAllData.actionPlan.connectingStrategyStrategizing[3]));
            $scope.currentQuater = $scope.quaters[0];

            for (var j = 0; j < 4; j++) {
                for (var i = 0; i < $scope.defaultStrategies.length; i++) {
                    if ($scope.defaultStrategies[i].id === $scope.userAllData.actionPlan.connectingStrategyStrategizing[j].strategy.id) {
                        $scope.strategies.push($scope.defaultStrategies[i].name);
                        break;
                    }
                }
            }

            _.each($scope.quaters, function (qut){
                if(/*!$scope.currentQuater && */moment().isBetween(qut.start, qut.end, 'day', '[]')) {
                    $scope.currentQuater = qut;
                    
                }
            });
            $scope.availableQuaters = [0,1,2,3].filter(function (qId) { return qId + 1 >= $scope.currentQuater.nth;} );
            $scope.pastQuaters = [0, 1, 2, 3].filter(function (qId) { return qId + 1 < $scope.currentQuater.nth; });
            $scope.filter.showQ = $scope.currentQuater.nth;   //set by current quater

            $scope.startDate = $scope.quaters[0].start.toDate();
            $scope.endDate = $scope.quaters[3].end.toDate();
            $scope.today = moment.max(moment($scope.startDate), moment()).toDate(); //If the user haven't started the tracking yet.

            if(moment().isBefore(moment($scope.startDate), 'day')) { //If startdate is after today
                //Add default 3 actions
                //Check if prior action exists
                var isExist = _.find($scope.excuteItems, {isPriorItem: 2});
                if( _.isUndefined(isExist)) {

                    //ADD 3 action ITEMS
                    $q.all(excuteItemService.defaultActionsBeforeStart.map(function(itemTitle){

                        return $scope.excuteItems.post({
                            type: 'action',
                            title: itemTitle,
                            notes: '',
                            dueDate: moment().format('YYYY-MM-DD'),
                            progress: 0,
                            isPriorItem: 2
                        });

                    })).then(function(responses){
                        responses.map(function(resp){ return $scope.excuteItems.push(resp.data); });
                        showToast('Added Default Action(s).');
                    });

                }
                isExist = _.find($scope.excuteItems, {isPriorItem: 3});
                if( _.isUndefined(isExist)) {
                    //ADD ALL
                    addAllReflextion();
                }
            } 

            ///========For now all reflections are added when the user enter excute first time =====//////
            // else if(moment().isBetween(moment($scope.startDate), moment($scope.endDate), 'day', '[]')) {
            //     //If current date is between start and end date
            //     //Check if it's Monday, it then add reflextion


            //     /*-----------so here's the problem
            //                 Should user always reflex the week or month on friday or end or month?
            //                 Or any day in that month or week?
            //     -------------------------*/
            //     if (moment().day() == 1) {
            //         var hasReflexted = false;
            //         _.each($scope.excuteItems, function(item){
            //             if ((item.type == 'reflextion') 
            //                 && (moment(item.dueDate).isSame( moment().day(-2), 'day' ))
            //                 && ((item.reflextWhat == 'week')))
            //                 hasReflexted = true;
            //         })
            //         if(!hasReflexted) {

            //             var newForm = {
            //                 type: 'reflextion',
            //                 title: '',
            //                 notes: '',
            //                 dueDate: moment().day(-2).format($rootScope.dateFormat),
            //                 progress: 0,
            //                 feeling: {},
            //                 reflextWhat: 'week'
            //             };

            //             $scope.excuteItems.post(newForm).then(function(item){
            //                 $scope.excuteItems.push(item.data);
            //                 showToast('You didn\'t reflext last week');
            //                 dataUpdated();
            //             });
            //         }

            //     }

            //     //Check if it's 1th of each day, if then add reflextion
            //     if (moment().date() == 1) {
            //         var hasReflexted = false;
            //         _.each($scope.excuteItems, function(item){
            //             if ((item.type == 'reflextion') 
            //                 && (moment(item.dueDate).isSame( moment().subtract(1, 'month').endOf('month'), 'day' ))
            //                 && ((item.reflextWhat == 'month') || (item.reflextWhat == 'quater')))
            //                 hasReflexted = true;
            //         })
            //         if(!hasReflexted) {
            //             var reflextWhat = 'month';
            //             _each($scope.quaters, function(quater){
            //                 if(moment(quater.end).isSame( moment().subtract(1, 'month').endOf('month'), 'day' ))
            //                     reflextWhat = 'quater';
            //             })
            //             var newForm = {
            //                 type: 'reflextion',
            //                 title: '',
            //                 notes: '',
            //                 dueDate: moment().subtract(1, 'month').endOf('month').format($rootScope.dateFormat),
            //                 progress: 0,
            //                 feeling: {},
            //                 reflextWhat: reflextWhat
            //             };

            //             $scope.excuteItems.post(newForm).then(function(item){
            //                 $scope.excuteItems.push(item.data);
            //                 showToast('You didn\'t reflext last ' + reflextWhat);
            //                 dataUpdated();
            //             });
            //         }

            //     }

            // }

            $scope.revenues = $scope.userAllData.yearGoal.revenueStreams.revenues;
            //Initialize Grid data
            filterSales();
            doCalculation();
        }

        function filteredForTabView(sectionName, completeStatus, quaterID) {
            var results = [];
            _.each($scope.excuteItems, function(item){
                var isValid = true;
                if ((completeStatus == 'upcoming') && (item.progress == 100)|| 
                (completeStatus == 'done') && (item.progress != 100)) {
                    isValid = false;
                }
                if (!(($scope.filter.showActions && item.type == 'action') ||
                    ($scope.filter.showSales && item.type == 'sales') ||
                    ($scope.filter.showReflextion && item.type == 'reflextion')))
                        isValid = false;
                var dateRange = {};
                if(sectionName == 'today') {
                    dateRange.end = dateRange.start = moment();
                } else if(sectionName == 'week') {
                    dateRange.start = moment().day(0);
                    dateRange.end = moment().day(6);
                } else if(sectionName == 'month') {
                    dateRange.start = moment().startOf('month');
                    dateRange.end = moment().endOf('month');
                } else if(sectionName == 'quater') {
                    dateRange.start = moment($scope.currentQuater.start);
                    dateRange.end = moment($scope.currentQuater.end);
                } else if(sectionName == 'year') {
                    dateRange.start = moment($scope.startDate);
                    dateRange.end = moment($scope.endDate);
                }
                
                if (!(moment(item.dueDate).isBetween(dateRange.start, dateRange.end, 'day', '[]'))) {
                    isValid = false;
                }
                if(isValid)
                    results.push(item);
            });
            return results;
            
        }

        function filteredForListView(){
            var results = [];
            _.each($scope.excuteItems, function(item){
                var isValid = true;


                if (($scope.filter.status == 'upcoming') && (item.progress == 100)|| 
                ($scope.filter.status == 'done') && (item.progress != 100)) {
                    isValid = false;
                }
                if (!(($scope.filter.showActions && item.type == 'action') ||
                    ($scope.filter.showSales && item.type == 'sales') ||
                    ($scope.filter.showReflextion && item.type == 'reflextion')))
                        isValid = false;
                var dateRange = {};
                if($scope.filter.period == 'today') {
                    dateRange.end = dateRange.start = moment().startOf('day');
                } else if($scope.filter.period == 'week') {
                    dateRange.start = moment().day(1).startOf('day');
                    dateRange.end = moment().day(6).startOf('day');
                } else if($scope.filter.period == 'month') {
                    dateRange.start = moment().startOf('month').startOf('day');
                    dateRange.end = moment().endOf('month');
                } else if($scope.filter.period.indexOf('quater') != -1) {
                    var quaterID = parseInt($scope.filter.period.slice(6));
                    dateRange.start = moment($scope.quaters[quaterID].start).startOf('day');
                    dateRange.end = moment($scope.quaters[quaterID].end).startOf('day');
                } 

                var now = moment($scope.today); 
                if(moment().isBefore(moment($scope.startDate), 'day')) //If before starting tracking, set now as now not first day.
                    now = moment().startOf('day');

                if ($scope.filter.status == 'overdue') {

                    if (!(moment(item.dueDate).isBetween(dateRange.start, moment.min(now, dateRange.end), 'day', '[)'))) {
                        isValid = false;
                    }

                } else {
                    // if (dateRange.start.isBefore($scope.today)) {
                    if (!(moment(item.dueDate).isBetween( moment.max(now, dateRange.start), dateRange.end, 'day', '[]'))) {
                        isValid = false;
                    }
                }

                $scope.filter.periodStr = 'From ' + dateRange.start.format('YYYY-MM-DD') + '  To ' + dateRange.end.format('YYYY-MM-DD');
                

                if(isValid)
                    results.push(item);
            });
            return _.sortBy(results, ['dueDate']);
             
            
        }

        function filterSales() {
            $scope.filteredSalesItems = [];
            _.each($scope.excuteItems, function(item){
                if(item.type != 'sales')   //filter out only sales items
                    return;
                if ($scope.filter.showQ != 5) {  // This measn to show full YEAR sales items.
                    if (!(moment(item.dueDate).isBetween($scope.quaters[$scope.filter.showQ - 1].start, $scope.quaters[$scope.filter.showQ - 1].end, 'day', '[]')))  //filter out only in filtering quater
                        return;    
                }
                
                $scope.filteredSalesItems.push(item);
            });
            buildGridData();
        }

        function dataUpdated() {
            filterSales();
            buildGridData();   
            doCalculation();
        }

        function buildGridData() {
            $scope.gridData = [];
            _.each($scope.revenues, function(revenue){
                var data = {}; 
                var salesItems = $scope.filteredSalesItems.filter(function(item){ return +item.title == +revenue.id; });

                var totalSalesItemCount = 0;
                if ($scope.filter.showQ != 5) {  //Quater
                    totalSalesItemCount = $scope.quaters[$scope.filter.showQ - 1].units[revenue.name];
                } else if ($scope.filter.showQ == 5) {  //YEAR 
                    totalSalesItemCount = +revenue.unit;
                }

                var actualSalesItemCount = 0;
                var projectedSalesItemCount = 0;
                _.each(salesItems, function(item) { 
                    if (item.progress != 100) 
                        projectedSalesItemCount += item.saleUnit;
                    else 
                        actualSalesItemCount += item.saleUnit;
                });

                _.each(salesItems, function(item) {
                    item.typeStr = item.progress == 100 ? 'Closed Sale' : 'Projected Sale';
                    item.salesGoalShare = totalSalesItemCount / item.saleUnit;
                    item.amount = +revenue.sellingPrice * item.saleUnit;
                    item.salesGoalShare = item.salesGoalShare.toFixed(2);
                });

                data.data = salesItems;
                data.urlSync = false;


                $scope.gridData.push({
                    gridOptions: data,
                    gridActions: {},
                    revenue: revenue,
                    showDetail: false,
                    totalSalesItemCount: totalSalesItemCount,
                    actualSalesItemCount: actualSalesItemCount,
                    projectedSalesItemCount: projectedSalesItemCount
                });
            });

        }

        stepService.mySlapStateForButton = 'Build';

        function closeDialog() {
            $mdDialog.hide();
        }

        function openItemDialog($event, mode, type, item) {
            $scope.curMode = mode;
            if (type == 'action') {
                if ($scope.curMode == 'add') {
                    var newForm = {
                        type: 'action',
                        title: '',
                        notes: '',
                        dueDate: moment().format($rootScope.dateFormat),
                        progress: 0,
                        recurrency: 'No Recurrency',
                        setRecurDeadline: false,
                        recurDeadline: moment().format($rootScope.dateFormat)
                    };
                    
                    newForm.recurDeadline = $scope.endDate;
                    newForm.dueDate = $scope.today;

                    $scope.formData = newForm;
                } else if ($scope.curMode == 'edit') {
                    $scope.formData = apiService.rest.copy(item);
                }
                $mdDialog.show({
                    clickOutsideToClose: true,
                    targetEvent: $event,
                    scope: $scope, 
                    preserveScope: true,
                    templateUrl: 'components/dialogs/item-dialog/item-dialog.html',
                    controller: 'ItemDialogController',
                    autoWrap: true
                });
            } else if (type == 'sales') {
                if ($scope.curMode == 'add') {
                    var nonDeleted = $scope.gridData.filter(function(elem){
                        return !elem.revenue.deleted;
                    });
                    var id = item ? item.id : nonDeleted[0].revenue.id;
                    var newForm = {
                        type: 'sales',
                        title: id,
                        notes: '',
                        dueDate: moment($scope.today).format($rootScope.dateFormat),
                        progress: 0,
                        saleUnit: 1
                    };
                    $scope.formData = newForm;
                } else if ($scope.curMode == 'edit') {
                    $scope.formData = apiService.rest.copy(item);
                }
                $mdDialog.show({
                    clickOutsideToClose: true,
                    targetEvent: $event,
                    scope: $scope, 
                    preserveScope: true,
                    templateUrl: 'components/dialogs/item-dialog/item-dialog.html',
                    controller: 'ItemDialogController',
                    autoWrap: true
                });

            } else if (type == 'reflextion') {

                if ($scope.curMode == 'add') {
                    $scope.tempReflextWhat = '';
                    var newForm = {
                        type: 'reflextion',
                        title: '',
                        notes: '',
                        dueDate: moment($scope.today).format($rootScope.dateFormat),
                        progress: 0,
                        feeling: {},
                        reflextWhat: ''
                    };
                    $scope.formData = newForm;

                } else if ($scope.curMode == 'edit') {
                    $scope.formData = apiService.rest.copy(item);
                    $scope.reflextionData = excuteItemService.reflextionData[item.reflextWhat];
                }

                $mdDialog.show({
                    clickOutsideToClose: true,
                    targetEvent: $event,
                    scope: $scope, 
                    preserveScope: true,
                    templateUrl: 'components/dialogs/item-dialog/item-dialog.html',
                    controller: 'ItemDialogController',
                    autoWrap: true
                });
            } 
        }
        
        function updateItem($event) {
            if ($scope.curMode == 'add') {
                if ($scope.formData.type == 'action') {
                    // formData holds the data now.
                    if ($scope.formData.recurrency == 'No Recurrency') {
                        $scope.excuteItems.post({
                            type: 'action',
                            title: $scope.formData.title,
                            notes: $scope.formData.notes,
                            dueDate: $scope.formData.dueDate,
                            progress: $scope.formData.progress
                        }).then(function(item){
                            $scope.excuteItems.push(item.data);
                            showToast('Added!');
                            dataUpdated();
                        });
                    } else {

                        var datesList = [];
                        var endDate = moment($scope.endDate);
                        var current = moment($scope.today);

                        if ($scope.formData.recurrency == 'Weekly') 
                            current = current.day(5);   //Which means Friday
                        if ($scope.formData.recurrency == 'Monthly') 
                            current = current.endOf('month');
                        if ($scope.formData.recurrency == 'Quaterly')
                            current = $scope.currentQuater.end.clone();

                        while (current.isSameOrBefore(moment($scope.formData.recurDeadline))) {

                            datesList.push(current.clone().toDate());
                            switch ($scope.formData.recurrency) {
                                case 'Daily':
                                    current.add(1, 'days');
                                    break;
                                case 'Weekly':
                                    current.add(7, 'days');
                                    break;
                                case 'Monthly':
                                    current.startOf('month').add(1, 'months').endOf('month');
                                    break;
                                case 'Quaterly':
                                    current.startOf('month').add(3, 'months').endOf('month');
                                    break;
                            }

                        }
                        var items = datesList.map(function(date){
                            return {
                                type: 'action',
                                title: $scope.formData.title,
                                notes: $scope.formData.notes,
                                dueDate: date,
                                progress: $scope.formData.progress
                            };
                        });
                        $q.all(items.map(function (item){
                            return $scope.excuteItems.post(item);
                        })).then(function(responses){

                            responses.map(function(resp){ return $scope.excuteItems.push(resp.data); });
                            showToast('Added ' + responses.length + ' ' + $scope.formData.recurrency + ' Action(s).');
                            dataUpdated();
                        });
                    }
                } else if ($scope.formData.type == 'sales') {
                    $scope.excuteItems.post($scope.formData).then(function(item){
                        $scope.excuteItems.push(item.data);
                        showToast('Added!');
                        dataUpdated();
                    });
                } else if ($scope.formData.type == 'reflextion') {
                    $scope.formData.progress = 100;
                    $scope.excuteItems.post($scope.formData).then(function(item){
                        $q.all($scope.formData.feeling.actions.filter(function(item) { return item.added == true;})
                        .map(function(item){
                            return $scope.excuteItems.post({
                                type: 'action',
                                title: item.title,
                                notes: '',
                                dueDate: $scope.formData.dueDate,
                                progress: 0
                            });
                        })).then(function(responses){

                            responses.map(function(resp){ return $scope.excuteItems.push(resp.data); });
                            showToast('Added ' + responses.length + ' Action(s).');
                            dataUpdated();
                        })
                        $scope.excuteItems.push(item.data);
                        showToast('Added!');
                    });
                }
            } else if($scope.curMode == 'edit') {
                if ($scope.formData.type == 'action') {
                    $scope.formData.save()
                    .then(function(response){
                        var index = _.findIndex($scope.excuteItems, {_id: $scope.formData._id});
                        $scope.excuteItems[index] = $scope.formData;
                        showToast('Updated ' + capitalize($scope.formData.type) + ' ' + $scope.formData.title);
                        dataUpdated();
                    });
                } else if ($scope.formData.type == 'sales') {
                    $scope.formData.save()
                    .then(function(response){
                        var index = _.findIndex($scope.excuteItems, {_id: $scope.formData._id});
                        $scope.excuteItems[index] = $scope.formData;
                        // showToast('Updated ' + capitalize($scope.formData.type) + ' ' + $scope.revenues[formData.title].name);
                        showToast('Updated ' + capitalize($scope.formData.type) + ' ' + 'Item');
                        dataUpdated();
                    });
                } else if ($scope.formData.type == 'reflextion') {
                    $scope.formData.progress = 100;
                    $scope.formData.save()
                    .then(function(response){
                        var index = _.findIndex($scope.excuteItems, {_id: $scope.formData._id});
                        $scope.excuteItems[index] = $scope.formData;
                        // showToast('Updated ' + capitalize($scope.formData.type) + ' ' + $scope.revenues[formData.title].name);
                        showToast('Reflected ' + capitalize($scope.formData.reflextWhat));
                        dataUpdated();
                    });
                }
            } 
            $mdDialog.hide($event);
        }
        

        function openDeleteItemDialog($event, item) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Confirm Delete')
                .textContent('Are you sure you want to delete this ' + capitalize(item.type) +' Item' +'?')
                .ariaLabel('Delete')
                .targetEvent($event)
                .ok('Delete')
                .cancel('No');

            $mdDialog.show(confirm).then(function() {
                item.remove().then(function(response) {
                    var index = _.findIndex($scope.excuteItems, {_id: item._id});
                    $scope.excuteItems.splice(index, 1);
                    showToast('Deleted ' + capitalize(item.type));
                    dataUpdated();
                });
            }, function() {
                
            });
        }

        function doCalculation() {

            //Calcaluation for BOX1 in main page
            $scope.dashData.quaterTotalActions = 0;
            $scope.dashData.quaterClosedActions = 0;
            _.each($scope.excuteItems, function(item){ //Count Actions
                if(item.type != 'action')
                    return;
                if (!(moment(item.dueDate).isBetween($scope.quaters[$scope.filter.showQ - 1].start, $scope.quaters[$scope.filter.showQ - 1].end, 'day', '[]')))  
                    return;
                $scope.dashData.quaterTotalActions ++;

                if (item.progress == 100)
                    $scope.dashData.quaterClosedActions ++;
            });
            
            //Calcaluation for BOX2 in main page & BOX1 BOX2 in result page
            $scope.dashData.daysLeft = 0; 
            $scope.dashData.cQRevenueGoalPercent = 0; 
            $scope.dashData.TRevenueGoalPercent = 0; 
            $scope.dashData.totalQuaterRevenue = 0;
            $scope.dashData.closedQuaterRevenue = 0;
            $scope.dashData.totalYearRevenue = 0;
            $scope.dashData.closedYearRevenue = 0;

            var tempTotalQuaterRevenue = 0;
            var tempClosedQuaterRevenue = 0;
            var tempTotalYearRevenue = 0;
            var tempClosedYearRevenue = 0;
            $scope.dashData.daysLeft = Math.round(moment.duration($scope.quaters[$scope.currentQuater.nth - 1].end.diff(moment($scope.today))).asDays());

            _.each($scope.excuteItems, function(item){ //Count Actions
                if(item.type != 'sales')
                    return;
                if (item.progress == 100 && !$scope.revenues[+item.title - 1].deleted )
                    tempClosedYearRevenue += item.saleUnit * +$scope.revenues[+item.title - 1].sellingPrice;
                
                if (!(moment(item.dueDate).isBetween($scope.quaters[$scope.filter.showQ - 1].start, $scope.quaters[$scope.filter.showQ - 1].end, 'day', '[]')))  
                    return;
                
                // /tempTotalQuaterRevenue += item.saleUnit * +$scope.revenues[+item.title - 1].sellingPrice;
                if (item.progress == 100 && !$scope.revenues[+item.title - 1].deleted )
                    tempClosedQuaterRevenue += item.saleUnit * +$scope.revenues[+item.title - 1].sellingPrice;
            });

            _.each($scope.quaters, function(quater){

                for(var key in quater.units) {
                    var revenue = _.find($scope.revenues, {name: key});
                    if(revenue  && revenue.deleted == false) {
                        tempTotalYearRevenue += +revenue.sellingPrice * + quater.units[key];
                    }
                }  
            })

            for(var key in $scope.currentQuater.units) {
                var revenue = _.find($scope.revenues, {name: key});
                if(revenue  && revenue.deleted == false) {
                    tempTotalQuaterRevenue += +revenue.sellingPrice * +$scope.currentQuater.units[key];
                }
            }

            if (tempTotalQuaterRevenue != 0)
                $scope.dashData.cQRevenueGoalPercent = Math.round((tempClosedQuaterRevenue / tempTotalQuaterRevenue) * 100);
            else
                $scope.dashData.cQRevenueGoalPercent = 0;

            if (tempTotalYearRevenue != 0)
                $scope.dashData.TRevenueGoalPercent = Math.round((tempClosedYearRevenue / tempTotalYearRevenue) * 100);
            else
                $scope.dashData.TRevenueGoalPercent = 0;


            $scope.dashData.totalQuaterRevenue = tempTotalQuaterRevenue;
            $scope.dashData.closedQuaterRevenue = tempClosedQuaterRevenue;

            $scope.dashData.totalYearRevenue = tempTotalYearRevenue;
            $scope.dashData.closedYearRevenue = tempClosedYearRevenue;

            //Calcaluation for BOX3 in main page
            // $scope.dashData.daysPassed = Math.round(moment.duration(moment($scope.today).diff($scope.quaters[0].start)).asDays());
            $scope.dashData.daysPassed = _.filter($scope.excuteItems, function(item){ return item.type == 'reflextion'; }).length;
            $scope.dashData.daysReflected = _.filter($scope.excuteItems, function(item){ return item.type == 'reflextion' && item.progress == 100; }).length;

        }
        function deleteItem(item) {

        }

        function showToast(message) {
            var toast = $mdToast.simple()
            .textContent(message)
            .action('OK')
            .hideDelay(3000)
            .position("bottom right");

            $mdToast.show(toast).then(function(response) {
                if ( response == 'ok' ) {
                    $mdToast.hide();
                }
            });
        }

        function capitalize(s) {
            return s[0].toUpperCase() + s.slice(1);
        }

        function selectEmotion(emotion) {
            $scope.formData.title = emotion.id;
            $scope.formData.feeling = angular.copy(emotion);
        }

        function selectReflextWhat(tempReflext) {
            $scope.formData.reflextWhat = tempReflext;
            $scope.reflextionData = excuteItemService.reflextionData[tempReflext];
            //TODO : should check if the reflextion was already added
            $scope.tempReflextWhat = tempReflext;
            var endDate = moment($scope.endDate);
            var startDate = moment($scope.startDate);

            if (tempReflext == 'week') {
                $scope.dueDate = moment().day(-2).format('YYYY-MM-DD'); //last friday;
                if(!( moment($scope.dueDate).isBetween(moment($scope.startDate), moment($scope.endDate), 'day', '[]') )){
                    showToast('Can\'t reflext last week');
                    $mdDialog.hide();
                }
            } else if (tempReflext == 'month') {
                $scope.dueDate = moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD');
                if(!( moment($scope.dueDate).isBetween(moment($scope.startDate), moment($scope.endDate), 'day', '[]') )){
                    showToast('Can\'t reflext last month');
                    $mdDialog.hide();
                }
            } else if (tempReflext == 'quater') {
                var index = ($scope.currentQuater.nth - 1 -1);
                if ((index >= 0) && (index < 4))
                    $scope.dueDate = $scope.quaters[$scope.currentQuater.nth - 1 -1].end;
                else {
                    showToast('Can\'t reflext last month');
                    $mdDialog.hide();
                }
            }
        }

        function addAllReflextion(type) {
            var datesList = [];
            var endDate = moment($scope.endDate);
            var current = moment($scope.startDate);

            current = current.day(5);   //Which means Friday

            while (current.isSameOrBefore(endDate)) {
                datesList.push(current.clone().toDate());
                current.add(7, 'days');
            }

            var items = datesList.map(function(date){
                return {
                    type: 'reflextion',
                    title: '',
                    notes: '',
                    dueDate: moment(date).format($rootScope.dateFormat),
                    progress: 0,
                    feeling: {},
                    reflextWhat: 'week',
                    isPriorItem: 3
                };

            });

            current = moment($scope.startDate).endOf('month');
            for (var i = 0; i < 12; i++) {
                var type = 'month';
                if ((i+1) % 3 == 0) 
                    type = 'quater';
                items.push({
                    type: 'reflextion',
                    title: '',
                    notes: '',
                    dueDate: current.clone().format($rootScope.dateFormat),
                    progress: 0,
                    feeling: {},
                    reflextWhat: type,
                    isPriorItem: 3
                })
                current.startOf('month').add(1, 'months').endOf('month');
            }

            $q.all(items.map(function (item){
                return $scope.excuteItems.post(item);
            })).then(function(responses){

                responses.map(function(resp){ return $scope.excuteItems.push(resp.data); });
                showToast('Added Reflection(s).');
                dataUpdated();
            });
        }
    }
}());