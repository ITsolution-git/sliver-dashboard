(function() {
    'use strict';
    
    angular
        .module('app.pages.yearGoal')
        .controller('FixedBusinessExpensesController', FixedBusinessExpensesController);
    
    function FixedBusinessExpensesController($scope, $timeout, pageService) {

        angular.extend($scope, {
            model: {
                expenses: [],
                incidentals: '1.00',
                expensesSum: 0
            },
            emptyExpense: {
                expense: '',
                monthlyCost: ''
            },
            showContent: false,
            showVideoBlock: false,
            showStaticTextBlock: false
        });

        $scope.checkFormElements = checkFormElements;
        $scope.deleteItem = deleteItem;

        $timeout(addNewExpense);

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Year Goal');

        function addNewExpense(model) {

            var index;

            if (model) {
                index = _.findIndex($scope.model.expenses, model);
            }

            if ($scope.model.expenses.length === 0 || $scope.model.expenses.length === index + 1) {
                var expenseModel = _.cloneDeep($scope.emptyExpense);
                $scope.model.expenses.push(expenseModel);
            }
        }

        function checkFormElements(model) {

            if (!_.isEmpty(model.expense) && !_.isEmpty(model.monthlyCost)) {
                addNewExpense(model);
                expensesSum();
            }
        }

        function expensesSum() {
            if ($scope.model.expenses.length > 0) {
                $scope.model.expensesSum = 0;
                _.each($scope.model.expenses, function (item) {
                    $scope.model.expensesSum += +item.monthlyCost
                })
            }
        }

        function deleteItem(model) {
            if ($scope.model.expenses.length > 1) {
                _.remove($scope.model.expenses, function (n) {
                    return n === model;
                });
                expensesSum();
            }
        }

    }
}());