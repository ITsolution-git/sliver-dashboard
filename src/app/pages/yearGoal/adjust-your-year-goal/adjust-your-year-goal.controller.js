(function () {
    'use strict';

    angular
        .module('app.pages.yearGoal')
        .controller('AdjustYourYearGoalController', AdjustYourYearGoalController);

    function AdjustYourYearGoalController($scope, pageService, activeStep, stepService, $state, $timeout) {

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
                totalVExp: 0
            },
            emptyVariableExpense: {
                expense: '',
                cost: '0.00'
            },
            notifications: [],
            checkRevenueCompleted: checkRevenueCompleted,
            checkVariableExpenseCompleted: checkVariableExpenseCompleted,
            checkValidity: checkValidity,
            deleteRevenue: deleteRevenue,
            deleteVariableExpense: deleteVariableExpense,
            calcHeight: calcHeight
        });
        getData();
        
        $timeout(addNewRevenue);
        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Year Goal');

        function getData() {
            // var urls = _.get($state.current, 'params.prev.sref').split('.');
            var url = 'fixedBusinessExpenses';

            // return stepService.getApiData(urls[urls.length - 1])
            return stepService.getApiData(url) //TODO: Think over the dynamics url
                .then(function (response) {
                    if (response && response.status === 200) {

                        $scope.totalFixedExpenses = (response.data.fixedBusinessExpenses.expensesSum + response.data.fixedBusinessExpenses.incidentals * 0.01 * response.data.fixedBusinessExpenses.expensesSum + (+response.data.fixedBusinessExpenses.profit)) * 12
                        doCalculation();
                    }
                });
        }

        function addNewRevenue(model) {
            var index;

            if (model) {
                index = _.findIndex($scope.data.revenues, model);
            }

            var force = false;
            if ($scope.data.revenues.length > 0) {
                var lastItem = $scope.data.revenues[$scope.data.revenues.length - 1];
                if (!angular.equals(lastItem, $scope.emptyRevenue)) {
                    force = true;
                }
            }
            if ($scope.data.revenues.length === 0 || $scope.data.revenues.length === index + 1 || force) {
                var revenueModel = _.cloneDeep($scope.emptyRevenue);
                $scope.data.revenues.push(revenueModel);
            }
        }

        function addNewVariableExpense(revenue, variableExpense) {

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
            }
            
        }

        function checkRevenueCompleted(revenue, evt) {
            if (!_.isEmpty(revenue.name) && !(+revenue.sellingPrice == 0) && !(+revenue.breakdown == 0)) {
                if ((revenue.sellingPrice != '') &&
                    (revenue.breakdown != '') &&
                    (revenue.sellingPrice.match(/^\d+(\.)*\d*$/)) &&
                    (revenue.breakdown.match(/^\d+(\.)*\d*$/))) {
                    $scope.forward = true;
                    
                    addNewRevenue(revenue);
                    doCalculation();
                } else {
                    $scope.forward = false;
                }
            }
        }
        

        function checkVariableExpenseCompleted(variableExpense, revenue, evt) {
            if (!_.isEmpty(variableExpense.expense) && !(+variableExpense.cost == 0)) { 
                if ((variableExpense.cost != '') &&
                    (variableExpense.cost.match(/^\d+(\.)*\d*$/))) {
                    addNewVariableExpense(revenue, variableExpense);
                    doCalculation();
                    $scope.forward = true;
                }
            } else {
                $scope.$forward = false;
            }
        }

        function checkValidity(value, evt) {
            if (value != '' && !value.match(/^\d+(\.)*\d*$/)) {
                $(evt.target).addClass('invalid');
                addNotification($scope.notifications, {name: 'Invalid Price', type: 'error', message:'Please provide valid Price.', show: true});
                
                $scope.forward = false;
            } else {
                removeNotificaton($scope.notifications, 'Invalid Price');
                $(evt.target).removeClass('invalid');
                $scope.forward = true;
            }
            return value.match(/^\d+(\.)*\d*$/);
        }

        function isExpensesValid() {
            var valid = true;

            // Validable Expenses valid
            _.each($scope.data.revenues, function(revenue) {
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
            _.each($scope.data.revenues, function(revenue) {
                totalBreakdown += +revenue.breakdown;
            });
            if (totalBreakdown != 100) {
                addNotification($scope.notifications, {name: 'Breakdown Invalid', type: 'error', message:'Total Breakdown should be exactly 100.', show: true});
                valid = false;
            } else {
                removeNotificaton($scope.notifications, 'Breakdown Invalid');
            }

            $scope.data.totalBreakdown = totalBreakdown.toFixed(2);


            return valid;
        }

        function doCalculation() {
            //Profit margin
            _.each($scope.data.revenues, function(revenue) {
                var totalVariableExpenses = 0;
                _.each(revenue.variableExpenses, function(variableExpense) {
                    if (variableExpense.cost != 0 || '') 
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
            _.each($scope.data.revenues, function(revenue) {
                totalBreakdown += +revenue.breakdown;
            });
            $scope.data.totalBreakdown = totalBreakdown.toFixed(2);

            // Unit of Sales

            _.each($scope.data.revenues, function(revenue) {
                var C = $scope.totalFixedExpenses * +revenue.breakdown * 0.01;
                var A = +revenue.sellingPrice - +revenue.totalVExp;
                if (A != 0){
                    revenue.unit = Math.ceil(C / A);
                }
            });
            

        }

        function deleteRevenue(revenue) {
            if ($scope.data.revenues.length > 1) {
                _.remove($scope.data.revenues, function (n) {
                    return n === revenue;
                });
                doCalculation();
            }
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
            if (!isExpensesValid())
                return false;
            
            stepService.updateActiveModel($scope);
            stepService.setFinishActiveStep();
            stepService.setRequestApiFlag();
            var nextprevStep = stepService.getNextAndPrevStep();
            var urls = activeStep.sref.split('.');

            var data = {};

            if ($scope.data.revenues.length > 1) {
                var revenues = [];
                _.forEach($scope.data.revenues, function (value) {

                    if (!angular.equals(value, $scope.emptyRevenue)) {
                        revenues.push(value);
                    }

                });
                data.revenues = revenues;
            }


            return stepService.sendApiData(urls[urls.length - 1], data)
                .then(function () {
                    if(direction == 'forward')  
                        $state.go(nextprevStep.nextStep.sref); 
                    else
                        $state.go(nextprevStep.prevStep.sref);
                });
        }

        function calcHeight(revenue, $index) {
            return $scope.data.revenues[$index].variableExpenses.length;
        }
        $scope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            sendData();
        });
    }
}());