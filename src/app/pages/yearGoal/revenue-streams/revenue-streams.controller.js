(function () {
    'use strict';

    angular
        .module('app.pages.yearGoal')
        .controller('RevenueStreamsController', RevenueStreamsController);

    function RevenueStreamsController($scope, pageService,activeStep,stepService,$state, $timeout) {
        $scope.videoUrl = activeStep.videoUrl;

        angular.extend($scope, activeStep.model,{
            forward:true,
            sendData: sendData,
            emptyRevenue: {
                name: '',
                sellingPrice: '0.00',
                variableExpenses: [{
                    expense: '',
                    cost: '0.00'
                }],
                margin: '0.00',
                breakdown: '0.00',
                unit: 0,
                totalVExp: 0,
                deleted: false,
            },
            emptyVariableExpense: {
                expense: '',
                cost: ''
            },
            notifications: [],
            checkRevenueCompleted: checkRevenueCompleted,
            checkVariableExpenseCompleted: checkVariableExpenseCompleted,
            checkValidity: checkValidity,
            deleteRevenue: deleteRevenue,
            deleteVariableExpense: deleteVariableExpense,
            calcHeight: calcHeight,
            doCalculation: doCalculation,
            saved: false
        });

        getData();

        var nextprevStep = stepService.getNextAndPrevStep();
        var urls = activeStep.sref.split('.');
        $scope.pageName = urls[urls.length - 1];

        if (($scope.pageName == 'revenueStreams') || ($scope.pageName == 'adjustYourYearGoal'))
            $timeout(addNewRevenue);
        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('1 Year Goal');

        function getData() {
            // var urls = _.get($state.current, 'params.prev.sref').split('.');
            var url = 'fixedBusinessExpenses';

            // return stepService.getApiData(urls[urls.length - 1])
            return stepService.getApiData(url) //TODO: Think over the dynamics url
                .then(function (response) {
                    if (response && response.status === 200) {

                        $scope.totalFixedExpenses = (response.data.fixedBusinessExpenses.expensesSum + response.data.fixedBusinessExpenses.incidentals * 0.01 * response.data.fixedBusinessExpenses.expensesSum) * 12  + (+response.data.fixedBusinessExpenses.profit);
                        doCalculation();
                    }
                });
        }

        function addNewRevenue(model, currentIndex) {
            var index;
            if (model) {
                index = _.findIndex($scope.data.revenues, model);
            }

            var force = false;
            if ($scope.data.revenues.length > 0) {
                var nonDeleted = [];
                _.each($scope.data.revenues, function (revenue) {
                    if (revenue.deleted == false)
                        nonDeleted.push(revenue);
                });
                var lastItem = nonDeleted[nonDeleted.length - 1];

                // if (lastItem.id == $scope.data.revenues.length) {  //If no empty item is added
                //     force = true;
                if(lastItem.name != '') {
                    force = true;
                } else {
                }
            }
            if ($scope.data.revenues.length === 0 || $scope.data.revenues.length === index + 1 || force) {
                var revenueModel = _.cloneDeep($scope.emptyRevenue);
                revenueModel.id = $scope.data.revenues.length + 1;
                $scope.data.revenues.push(revenueModel);
                $timeout(function () {
                    var nextElemIndex = currentIndex +1;
                    var elem = $('#revenue-' + nextElemIndex).focus();
                });
            }
        }

        function addNewVariableExpense(revenue, variableExpense, currentIndex, revenueIndex) {

            var index;

            if (variableExpense) {
                index = _.findIndex(revenue.variableExpenses, variableExpense);
            }

            var force = false;
            if (revenue.variableExpenses.length > 0) {
                var lastItem = revenue.variableExpenses[revenue.variableExpenses.length - 1];
                if (!angular.equals(lastItem, $scope.emptyVariableExpense)) {
                    force = true;
                }
            }
            if (revenue.variableExpenses.length === 0 || revenue.variableExpenses.length === index + 1 || force) {

                var variableExpense = _.cloneDeep($scope.emptyVariableExpense);
                revenue.variableExpenses.push(variableExpense);
                $timeout(function () {
                    var nextElemIndex = currentIndex + 1;
                    var elem = $('#expense-' + revenueIndex + '-name-' + nextElemIndex).focus();
                });
            }

        }

        function checkRevenueCompleted(revenue, evt, index) {
            if ($scope.pageName == 'revenueStreams') {
                if (!_.isEmpty(revenue.name)) {
                    $scope.forward = true;
                    addNewRevenue(revenue, index);
                    doCalculation();
                }
            } else {
                if (!_.isEmpty(revenue.name) && !(+revenue.sellingPrice == 0) && !(+revenue.breakdown == 0)) {
                    if ((revenue.sellingPrice != '') &&
                        (revenue.breakdown != '') &&
                        (revenue.sellingPrice.match(/^\d+(\.)*\d*$/)) &&
                        (revenue.breakdown.match(/^\d+(\.)*\d*$/))) {
                        $scope.forward = true;

                        addNewRevenue(revenue, index);
                        doCalculation();
                    } else {
                        $scope.forward = false;
                    }
                }
            }
        }


        function checkVariableExpenseCompleted(variableExpense, revenue, evt, index, revenueIndex) {
            if (!_.isEmpty(variableExpense.expense) && !(+variableExpense.cost == 0)) {
                if ((variableExpense.cost != '') &&
                    (variableExpense.cost.match(/^\d+(\.)*\d*$/))) {
                    addNewVariableExpense(revenue, variableExpense, index, revenueIndex);
                    doCalculation();
                    $scope.forward = true;
                }
            } else {
                $scope.$forward = false;
            }
        }

        function checkValidity(value, evt, currentIndex, revenueIndex) {
            if (value && value != '' && value.trim()[0] != '.' && !value.trim().match(/^\d+(\.)*\d*$/)) {
                $(evt.target).addClass('invalid');
                addNotification($scope.notifications, {name: 'Invalid Price', type: 'error', message:'You can only enter numbers less than 100 into this field.', show: true});

                $scope.forward = false;
            } else {
                removeNotificaton($scope.notifications, 'Invalid Price');
                $(evt.target).removeClass('invalid');
                if (event.keyCode === 13){
                    var elem = $('#expense-' + revenueIndex + '-cost-' + currentIndex).blur();
                }
                $scope.forward = true;
            }
            return (value && value.match(/^\d+(\.)*\d*$/));
        }

        function isExpensesValid() {
            var nonDeleted  = [];
            _.each($scope.data.revenues, function(revenue) {
                if (revenue.deleted == false)
                    nonDeleted.push(revenue);
            });
            if ($scope.pageName == 'revenueStreams') {
                if ($scope.data.revenues.length == 1) {

                    addNotification($scope.notifications, {name: 'Revenue Length Invalid', type: 'error', message:'You must create at least one Revenue Stream - but we recommend three to five!', show: true});
                    return false;
                } else {
                    removeNotificaton($scope.notifications, 'Revenue Length Invalid');
                    return true;
                }
            }
            if (($scope.pageName == 'revenueStreams') || ($scope.pageName == 'sellingPrice') ) {
                return true;
            } else if ($scope.pageName == 'variableBusinessExpenses') {
                var valid = true;

                // Validable Expenses valid
                _.each(nonDeleted, function(revenue) {
                    var totalVariableExpenses = 0;
                    _.each(revenue.variableExpenses, function(variableExpense) {
                        totalVariableExpenses += +variableExpense.cost;
                    });

                    revenue.totalVExp = totalVariableExpenses;
                    if (+revenue.sellingPrice != 0) {
                        if (+revenue.sellingPrice <= totalVariableExpenses) {
                            addNotification($scope.notifications, {name: 'Variable Expenses Invalid', type: 'error', message:'Total sum of Variable Expenses should be smaller than Selling Price.', show: true});
                            valid = false;
                        } else {
                            removeNotificaton($scope.notifications, 'Variable Expnses Invalid');
                        }
                    }
                });

                return valid;

            } else {
                var valid = true;

                // Validable Expenses valid
                _.each(nonDeleted, function(revenue) {
                    var totalVariableExpenses = 0;
                    _.each(revenue.variableExpenses, function(variableExpense) {
                        totalVariableExpenses += +variableExpense.cost;
                    });

                    revenue.totalVExp = totalVariableExpenses;
                    if (+revenue.sellingPrice != 0) {
                        if (+revenue.sellingPrice <= totalVariableExpenses) {
                            $scope.forward = false;
                            addNotification($scope.notifications, {name: 'Variable Expenses Invalid', type: 'error', message:'Total sum of Variable Expenses should be smaller than Selling Price.', show: true});
                            valid = false;
                        } else {
                            removeNotificaton($scope.notifications, 'Variable Expnses Invalid');
                        }
                    }

                    // if (+revenue.sellingPrice == totalVariableExpenses) {
                    //     $scope.forward = false;
                    //     addNotification($scope.notifications, {name: 'Profit None Invalid', type: 'error', message:'Total sum of Variable Expenses should be smaller than Selling Price', show: true});
                    //     valid = false;
                    // } else {
                    //     removeNotificaton($scope.notifications, 'Profit None Invalid');
                    // }
                });


                // revenue breakdown should sum 100
                var totalBreakdown = 0;
                _.each(nonDeleted, function(revenue) {
                    if (revenue.breakdown && +revenue.breakdown != 0)
                        totalBreakdown = Number((totalBreakdown + (+revenue.breakdown)).toFixed(1));
                });
                if (totalBreakdown != 100) {
                    addNotification($scope.notifications, {name: 'Breakdown Invalid', type: 'error', message:'The total Revenue Breakdown of all of your Revenue Streams must equal exactly 100%.', show: true});
                    valid = false;
                } else {
                    removeNotificaton($scope.notifications, 'Breakdown Invalid');
                }

                $scope.data.totalBreakdown = totalBreakdown.toFixed(2);


                return valid;
            }

        }

        function doCalculation() {
            //Profit margin
            var nonDeleted  = [];
            _.each($scope.data.revenues, function(revenue) {
                if (revenue.deleted == false)
                    nonDeleted.push(revenue);
            });
            _.each(nonDeleted, function(revenue) {
                var totalVariableExpenses = 0;
                _.each(revenue.variableExpenses, function(variableExpense) {
                    totalVariableExpenses += +variableExpense.cost;
                });
                if (+revenue.sellingPrice != 0) {
                    revenue.margin = (+revenue.sellingPrice - totalVariableExpenses) / +revenue.sellingPrice * 100;
                    revenue.totalVExp = totalVariableExpenses;
                    revenue.margin = revenue.margin.toFixed(2);
                }
            });

            // Breakdown

            var totalBreakdown = 0;
            _.each(nonDeleted, function(revenue) {
                if (revenue.breakdown && +revenue.breakdown != 0)
                    totalBreakdown += +revenue.breakdown;
            });
            $scope.data.totalBreakdown = totalBreakdown.toFixed(2);

            // Unit of Sales

            _.each(nonDeleted, function(revenue) {
                var C = $scope.totalFixedExpenses * +revenue.breakdown * 0.01;
                var A = +revenue.sellingPrice - +revenue.totalVExp;
                if (A != 0){
                    revenue.unit = Math.ceil(C / A);
                }
            });


        }

        function deleteRevenue(revenue) {
            var nonDeleted = [];
            _.each($scope.data.revenues, function (revenue) {
                if (revenue.deleted == false)
                    nonDeleted.push(revenue);
            });
            if(nonDeleted.length == 1){
                addNotification($scope.notifications, { name: 'Revenue count Invalid', type: 'error', message:'You need to keep at least one Revenue Stream. If you would like to further change your Revenue Streams go back to the Revenue Stream page and make additional adjustments.', show: true});
                return false;
            }
            else {
                removeNotificaton($scope.notifications, 'Revenue count Invalid');
            }
            revenue.deleted = true;
            doCalculation();
        }
 

        function deleteVariableExpense(revenue, variableExpense) {
            _.remove(revenue.variableExpenses, function (n) {
                if (revenue.variableExpenses.length > 1)
                return n === variableExpense;
            });
            if (revenue.variableExpenses.length == 1)
            addNewVariableExpense(revenue);
            doCalculation();
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
            if ($scope.pageName == "revenueStreams" && direction == 'forward'){

                var notDeleted = $scope.data.revenues.filter(function(revenue){
                    return !revenue.deleted;
                })
                if (notDeleted.length !=1){
                    notDeleted.splice(-1);
                }
                var res = notDeleted.some(function(elem){
                    return elem.name;
                })
                if (!res || !notDeleted.length){
                    addNotification($scope.notifications, { name: 'Revenue Length Invalid', type: 'error', message: 'You must create at least one Revenue Stream - but we recommend three to five!', show: true });
                    return false;
                };
            }
            if (!($scope.pageName == 'profitMargin') && direction == 'forward') {
                if (!isExpensesValid()){
                    $('body').animate({
                        scrollTop: $("slap-notifications").offset().top
                    }, 400);
                    return false;
                }
            }

            doCalculation();
            stepService.updateActiveModel($scope);
            stepService.setFinishActiveStep();
            var nextprevStep = stepService.getNextAndPrevStep();
            var urls = activeStep.sref.split('.');

            var data = {};

            var revenues = [];
            _.forEach($scope.data.revenues, function (value) {

                if (value.name && value.name.trim() != '') {
                    revenues.push(value);
                }

            });
            data.revenues = revenues;


            return stepService.sendApiData('revenueStreams', data)
                .then(function () {
                    $scope.saved = true;
                    stepService.setRequestApiFlag();
                    if(direction == 'forward')
                        $state.go(nextprevStep.nextStep.sref);
                    else if(direction == 'backward')
                        $state.go(nextprevStep.prevStep.sref);
                });
        }

        function calcHeight(revenue, $index) {
            if ((($scope.pageName == 'profitMargin') || ($scope.pageName == 'revenueBreakdown')) && ($scope.data.revenues[$index].variableExpenses.length <= 1)){
                return $scope.data.revenues[$index].variableExpenses.length - 1;
            } else {
                return $scope.data.revenues[$index].variableExpenses.length;
            }

        }
        $scope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            if ($scope.saved != true) {
                sendData();
            }
        });
    }
}());
