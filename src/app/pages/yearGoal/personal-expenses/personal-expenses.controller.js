(function () {
    'use strict';

    angular
        .module('app.pages.yearGoal')
        .controller('PersonalExpensesController', PersonalExpensesController);

    function PersonalExpensesController($scope,$timeout, pageService, activeStep,stepService, $state) {
        $scope.videoUrl = activeStep.videoUrl;
        angular.extend($scope, activeStep.model, {
            forward: true,
            sendData: sendData,
            emptyExpense: {
                expense: '',
                monthlyCost: ''
            },
            saved: false

        });
        $scope.notifications = [];
        $scope.checkFormElements = checkFormElements;
        $scope.deleteItem = deleteItem;
        $scope.checkNumberValid = checkNumberValid;

        $timeout(addNewExpense);

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('1 Year Goal');

        function addNewExpense(model) {

            var index;

            if (model) {
                index = _.findIndex($scope.data.expenses, model);
            }

            var force = false;
            if ($scope.data.expenses.length > 0) {
                var lastItem = $scope.data.expenses[$scope.data.expenses.length - 1];
                if (!angular.equals(lastItem, $scope.emptyExpense)) {
                    force = true;
                }
            }
            if ($scope.data.expenses.length === 0 || $scope.data.expenses.length === index + 1 || force) {
                var expenseModel = _.cloneDeep($scope.emptyExpense);
                $scope.data.expenses.push(expenseModel);
                $timeout(function(){         
                    var index = $scope.data.expenses.length-1;
                    var elem = $('#expense-' + index).focus();
                });
                
            }
        }

        function checkFormElements(model, evt) {

            if (!_.isEmpty(model.expense) && !_.isEmpty(model.monthlyCost)) {
                if ($scope.checkNumberValid(model.monthlyCost, evt)) {
                    addNewExpense(model);
                    expensesSum();
                }
            }
        }
        
        function checkNumberValid(value, evt) {
            if (!value.match(/^\d+(\.)*\d*$/)) {
                $(evt.target).addClass('invalid');
                $scope.forward = false;
                $scope.notifications = [{name: 'Invlide Price', type: 'error', message:'Please provide valid Price.', show: true}];
            } else {
                $(evt.target).removeClass('invalid');
                $scope.forward = true;
                $scope.notifications = [];
            }
            return value.match(/^\d+(\.)*\d*$/);
        }

        function expensesSum() {
            if ($scope.data.expenses.length > 0) {
                $scope.data.expensesSum = 0;
                _.each($scope.data.expenses, function (item) {
                    $scope.data.expensesSum += +item.monthlyCost
                })
            }
        }

        function deleteItem(model) {
            if ($scope.data.expenses.length > 1) {
                _.remove($scope.data.expenses, function (n) {
                    return n === model;
                });
                expensesSum();
            }
        }


        function sendData(direction) {
            stepService.updateActiveModel($scope);
            stepService.setFinishActiveStep();

            var nextprevStep = stepService.getNextAndPrevStep();
            var urls = activeStep.sref.split('.');

            var data = angular.copy($scope.data);

            if ($scope.data.expenses.length > 1) {
                var expenses = [];
                _.forEach($scope.data.expenses, function (value) {

                    if (!angular.equals(value, $scope.emptyExpense)) {
                        expenses.push(value);
                    }

                });
                data.expenses = expenses;
            }


            return stepService.sendApiData(urls[urls.length - 1], data)
                .then(function () {
                    if(direction == 'forward')  
                        $state.go(nextprevStep.nextStep.sref); 
                    else if(direction == 'backward')
                        $state.go(nextprevStep.prevStep.sref);
                    
                    $scope.saved = true;
                });
        }
        $scope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            if ($scope.saved != true) {
                sendData();
            }
        });
    }
}());