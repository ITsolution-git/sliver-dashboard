(function () {
    'use strict';

    angular
        .module('app.pages.slapExcute')
        .controller('SlapExcuteMainController', SlapExcuteMainController);

    function SlapExcuteMainController($scope, $rootScope, pageService,stepService, $state, $timeout, actionplanService,  $mdDialog, excuteItems, excuteItemService, userAllData, $mdToast, $q,Restangular, apiService) {

        angular.extend($scope,  {
            userAllData: userAllData, //All user data from finishedsteps api
            excuteItems: excuteItems,
            startDate: moment().toDate(), //Plan start Date
            endDate: moment().toDate(), // Plan Ends Date
            today: moment().toDate(), // 

            resultPage: false,
            changeView: function() { 
                $scope.resultPage = !$scope.resultPage; 
                $scope.filterSales();     //Main function to redraw grid
            },

            quaters: [], // quaters with `start` `end` date and months included in the quater
            currentQuater: {}, //item of quaters to indicate current quater,

            dashData: {},
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
                showQ: 1
            },
            filtered: filtered,
            filterSales: filterSales,
            colorAction: '#2778f5',
            colorSales: '#38b636',
            colorReflextion: '#f8d144',
            
            curMode: '',
            openItemDialog: openItemDialog,
            openDeleteItemDialog: openDeleteItemDialog,
            closeDialog: closeDialog,
            updateItem: updateItem,
            formData: {},

            
        });
        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'SLAPexcute', path: 'main'})
            .setPageTitle("SLAPExcute");
        
        $timeout(activate);
        function activate() {
            var startDate = $scope.userAllData.slapMindset.slapStartDate;
            $scope.quaters.push( _.merge(actionplanService.getNthQuater(startDate, 1), $scope.userAllData.actionPlan.connectingStrategyStrategizing[0]));
            $scope.quaters.push( _.merge(actionplanService.getNthQuater(startDate, 2), $scope.userAllData.actionPlan.connectingStrategyStrategizing[1]));
            $scope.quaters.push( _.merge(actionplanService.getNthQuater(startDate, 3), $scope.userAllData.actionPlan.connectingStrategyStrategizing[2]));
            $scope.quaters.push( _.merge(actionplanService.getNthQuater(startDate, 4), $scope.userAllData.actionPlan.connectingStrategyStrategizing[3]));

            $scope.currentQuater = $scope.quaters[0];
            _.each($scope.quaters, function (qut){
                if(!$scope.currentQuater && moment().isBetween(qut.start, qut.end, 'day', '[]')) {
                    $scope.currentQuater = qut;
                    
                }
            });

            $scope.filter.showQ = $scope.currentQuater.nth;   //set by current quater

            $scope.startDate = $scope.quaters[0].start.toDate();
            $scope.endDate = $scope.quaters[3].end.toDate();
            $scope.today = moment.max(moment($scope.startDate), moment()).toDate(); //If the user haven't started the tracking yet.

            $scope.revenues = $scope.userAllData.yearGoal.revenueStreams.revenues;
            //Initialize Grid data
            filterSales();
        }

        function filtered(sectionName, completeStatus) {
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

        function buildGridData() {
            $scope.gridData = [];
            _.each($scope.revenues, function(revenue){
                var data = {};
                var salesItems = $scope.filteredSalesItems.filter(function(item){ return item.title == revenue.id; });

                var totalSalesItemCount = 0;
                if ($scope.filter.showQ != 5) {  //Quater
                    totalSalesItemCount = $scope.quaters[$scope.filter.showQ - 1].units[revenue.name];
                } else if ($scope.filter.showQ != 5) {  //YEAR 
                    totalSalesItemCount = revenue.units;
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
                    var newForm = {
                        type: 'sales',
                        title: 1,
                        notes: '',
                        dueDate: moment().format($rootScope.dateFormat),
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
                            showToast('Added Successfully');
                        });
                    } else {

                        var datesList = [];
                        var endDate = moment($scope.endDate);
                        var current = moment($scope.startDate);

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
                        });
                    }
                } else if ($scope.formData.type == 'sales') {
                    $scope.excuteItems.post($scope.formData).then(function(item){
                        $scope.excuteItems.push(item.data);
                        showToast('Added Successfully');
                    });
                }
            } else if($scope.curMode == 'edit') {
                if ($scope.formData.type == 'action') {
                    $scope.formData.save()
                    .then(function(response){
                        var index = _.findIndex($scope.excuteItems, {_id: $scope.formData._id});
                        $scope.excuteItems[index] = $scope.formData;
                        showToast('Updated ' + capitalize($scope.formData.type) + ' ' + $scope.formData.title);
                    });
                } else if ($scope.formData.type == 'sales') {
                    $scope.formData.save()
                    .then(function(response){
                        var index = _.findIndex($scope.excuteItems, {_id: $scope.formData._id});
                        $scope.excuteItems[index] = $scope.formData;
                        // showToast('Updated ' + capitalize($scope.formData.type) + ' ' + $scope.revenues[formData.title].name);
                        showToast('Updated ' + capitalize($scope.formData.type) + ' ' + 'Item');
                    });
                }
            } 
            $mdDialog.hide($event);
        }
        

        function openDeleteItemDialog($event, item) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Confirm Delete')
                .textContent('Would you like to delete ' + capitalize(item.type) + ' ' + item.title +'?')
                .ariaLabel('Delete')
                .targetEvent($event)
                .ok('Delete')
                .cancel('No');

            $mdDialog.show(confirm).then(function() {
                item.remove().then(function(response) {
                    var index = _.findIndex($scope.excuteItems, {_id: item._id});
                    $scope.excuteItems.splice(index, 1);
                    showToast('Deleted ' + capitalize(item.type) + ' ' + item.title);
                });
            }, function() {
                
            });
        }

        function doCalucation() {
            $scope.dashData.quaterTotalActions = 0;
            $scope.dashData.quaterClosedActions = 0;
            _.each($scope.excuteItems, function(item){ //Count Actions
                if(item.type != 'actions')
                    return;
                if (!(moment(item.dueDate).isBetween($scope.quaters[$scope.filter.showQ - 1].start, $scope.quaters[$scope.filter.showQ - 1].end, 'day', '[]')))  
                    return;
                $scope.dashData.quaterTotalActions ++;

                if (item.progress == 100)
                    $scope.dashData.quaterClosedActions ++;
            });
            
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
            return s[0].toUpperCase() + s.slice(1);;
        }
    }
}());