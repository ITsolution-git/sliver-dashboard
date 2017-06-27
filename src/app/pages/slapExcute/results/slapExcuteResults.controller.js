

(function () {
    'use strict';

    angular
        .module('app.pages.slapExcute')
        .controller('SlapExcuteResultsController', SlapExcuteResultsController);

    function SlapExcuteResultsController($scope, $rootScope, pageService,stepService, $state, $timeout, actionplanService,  $mdDialog, excuteItems, excuteItemService, userAllData, $mdToast, $q,Restangular, apiService) {

        angular.extend($scope,  {
            userAllData: userAllData, //All user data from finishedsteps api
            excuteItems: excuteItems,
            startDate: moment().toDate(), //Plan start Date
            endDate: moment().toDate(), // Plan Ends Date
            today: moment().toDate(), // 

            resultPage: false,
            quaters: [], // quaters with `start` `end` date and months included in the quater
            currentQuater: {}, //item of quaters to indicate current quater
            progress: {
                delay: 0,
                animation: 'easeInOutQuart',
                duration: 2000,
                stroke: 10,
                radius: 90,
                bgcolor: '#eaeaea' 
            },
            filter: {
                showQ: 1
            },
            filtered: filtered,
            colorAction: '#2778f5',
            colorSales: '#38b636',
            colorReflextion: '#f8d144',
            
            curMode: '',
            openItemDialog: openItemDialog,
            openDeleteItemDialog: openDeleteItemDialog,
            closeDialog: closeDialog,
            updateItem: updateItem,
            formData: {}
        });
        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'SLAPexcute', path: 'results'})
            .setPageTitle("SLAPExcute - Results");
        
        $timeout(activate);
        function activate() {
            var startDate = $scope.userAllData.slapMindset.slapStartDate;
            $scope.quaters.push( actionplanService.getNthQuater(startDate, 1));
            $scope.quaters.push( actionplanService.getNthQuater(startDate, 2));
            $scope.quaters.push( actionplanService.getNthQuater(startDate, 3));
            $scope.quaters.push( actionplanService.getNthQuater(startDate, 4));

            $scope.currentQuater = $scope.quaters[0];
            _.each($scope.quaters, function (qut){
                if(moment().isBetween(qut.start, qut.end, 'day', '[]')) {
                    $scope.currentQuater = qut;
                }
            });

            $scope.startDate = $scope.quaters[0].start.toDate();
            $scope.endDate = $scope.quaters[3].end.toDate();
            $scope.today = moment.max(moment($scope.startDate), moment()).toDate(); //If the user haven't started the tracking yet.

            $scope.revenues = $scope.userAllData.yearGoal.revenueStreams.revenues;

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
                        salesUnit: 1
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