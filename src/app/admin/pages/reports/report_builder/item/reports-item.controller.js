(function () {
    'use strict';

    angular
        .module('reports.reportBuilder.module')
        .controller('AdminReportsItemController', AdminReportsItemController);

    /* @ngInject */
    function AdminReportsItemController($scope, $state, pageService, adminUserService, NgTableParams, $mdToast, $q, Restangular, $mdDialog, $timeout, $rootScope, commonDialogService, $stateParams, toaster, reportService, allProducts, allCoupons, actionplanService) {
        angular.extend($scope,  {
            report: {},
            reportID: $stateParams.report_id,
            ROLES: adminUserService.ROLES,
            STATUSES: adminUserService.STATUSES,

            deleteItem: deleteItem,
            createOrSave: createOrSave,

            COUNTRIES: [{id: 0, name: 'International'},{id: 0, name: 'Canada'},{id: 0, name: 'United States'}, ],

            //Products
            allProducts: allProducts,
            transformProductChip: transformProductChip,
            queryProductSearch: queryProductSearch,
            selectedProduct: null,
            searchProductText: null,
            //Coupons
            allCoupons: allCoupons,
            transformCouponChip: transformCouponChip,
            queryCouponSearch: queryCouponSearch,
            selectedCoupon: null,
            searchCouponText: null,
            //Activities
            allActivities: [{id: 0, name: 'All'},{id: 1, name: 'Logged In'},{id: 2, name: 'Did not log in'},{id: 3, name: 'Completed Build Step 1'},{id: 4, name: 'Completed Build Step 1'},{id: 5, name: 'Completed Build Step 1'},{id: 6, name: 'Completed Build Step 1'},{id: 7, name: 'Commited Build'},{id: 8, name: 'Submitted their SLAP'},{id: 9, name: 'Submitted Weekly Reflection'},{id: 10, name: 'Submitted Monthly Reflection'},{id: 11, name: 'Submitted Quarterly Reflection'},{id: 12, name: 'Updated Sales Tracker'},{id: 13, name: 'Updated Action Items'}],
            transformActivityChip: transformActivityChip,
            queryActivitySearch: queryActivitySearch,

            //Quaters
            allQuaters: [{id:0,name:'All'}, {id:1, name:'Q1'}, {id:2, name:'Q2'}, {id:1, name:'Q3'},{id:4, name:'Q4'}],
            transformQuaterChip: transformQuaterChip,
            queryQuaterSearch: queryQuaterSearch,
            //Score
            allScores: [{id:0,name:'All'}, {id:1, name:'Red'}, {id:2, name:'Yellow'}, {id:1, name:'Green'}],
            transformScoreChip: transformScoreChip,
            queryScoreSearch: queryScoreSearch,
            //Strategies
            allStrategies: actionplanService.getDefaultConnectingStrategies(),
            transformStrategyChip: transformStrategyChip,
            queryStrategySearch: queryStrategySearch,

        });


        pageService
            .reset()
            .setShowBC(true)
            .addCrumb({name: 'Build Reports', path: 'reports.list'});

        $timeout(function(){
            activate();
        });
        function activate() {

            if (!$scope.reportID) {
                pageService
                    .addCrumb({name: 'Add', path: 'reports.add'})
                    .setPageTitle('Build Reports');

                $scope.report = {};
                $scope.report.filter = {};
                $scope.report.filter.products = [];
                $scope.report.filter.coupons = [];
                $scope.report.filter.activities = [];
                $scope.report.filter.quaters = [];
                $scope.report.filter.scores = [];
                $scope.report.filter.strategies = [];
                $scope.report.filter.goalProgress = {};
                $scope.report.filter.startDate = new Date();
                $scope.report.filter.endDate = new Date();
            } else {
                reportService.get($scope.reportID).then(function (response) {
                    $scope.report = response.data;
                    
                    pageService
                        .addCrumb({name: $scope.report.name , path: 'reports.list'})
                        .setPageTitle('Build');
                });
            }
        }
        function createOrSave(event) {
            
            update().then(function(){
                toaster.pop({type: 'success', body: 'Report saved.'});
                $state.go('reports.list');
            }).catch(function(err){
                toaster.pop({type: 'error', body: err.data & err.data.message ? err.data.message : 'Error.'});
            });
        }

        function update() {
            if($scope.reportID){
                return $scope.report.save();
            } else {
                return reportService.add($scope.report);
            }
        }
        function deleteItem(event) {
            var success = function(){

                reportService.delete($scope.report).then(function() {
                    toaster.pop({type: 'success', body: 'Report Deleted.'});
                    $state.go('reports.list');
                })
                .catch(function(err) {
                    console.log(err);
                });
            }
            commonDialogService.openDeleteItemDialog(event, 'Are you sure you want to remove this?', 'Delete', success);

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



        //Products
        function transformProductChip(chip) {
            if (angular.isObject(chip)) {
                return chip;
            }
            return null;
        }

        function queryProductSearch (query) {
            if(query)
                return $scope.allProducts.filter(function(item){
                    return item.productName.toLowerCase().indexOf(query.toLowerCase()) != -1;
                });
            else
                return $scope.allProducts;
        }
        //Coupons

        function transformCouponChip(chip) {
            if (angular.isObject(chip)) {
                return chip;
            }
            return null;
        }

        function queryCouponSearch (query) {
            if(query)
                return $scope.allCoupons.filter(function(item){
                    return item.name.toLowerCase().indexOf(query.toLowerCase()) != -1;
                });
            else
                return $scope.allCoupons;
        }

        //Activities
        
        function transformActivityChip(chip) {
            return chip;
            if (angular.isObject(chip)) {
                return chip;
            }
            return null;
        }
        function queryActivitySearch (query) {
            if(query)
                return $scope.allActivities.filter(function(item){
                    return item.name.toLowerCase().indexOf(query.toLowerCase()) != -1;
                });
            else
                return $scope.allActivities;
        }

        //Strategies
        
        function transformStrategyChip(chip) {
            return chip;
            if (angular.isObject(chip)) {
                return chip;
            }
            return null;
        }
        function queryStrategySearch (query) {
            if(query)
                return $scope.allStrategies.filter(function(item){
                    return item.name.toLowerCase().indexOf(query.toLowerCase()) != -1;
                });
            else
                return $scope.allStrategies;
        }


        //Scores
        
        function transformScoreChip(chip) {
            return chip;
            if (angular.isObject(chip)) {
                return chip;
            }
            return null;
        }
        function queryScoreSearch (query) {
            if(query)
                return $scope.allScores.filter(function(item){
                    return item.name.toLowerCase().indexOf(query.toLowerCase()) != -1;
                });
            else
                return $scope.allScores;
        }


        //Quaters
        
        function transformQuaterChip(chip) {
            return chip;
            if (angular.isObject(chip)) {
                return chip;
            }
            return null;
        }
        function queryQuaterSearch (query) {
            if(query)
                return $scope.allQuaters.filter(function(item){
                    return item.name.toLowerCase().indexOf(query.toLowerCase()) != -1;
                });
            else
                return $scope.allQuaters;
        }


    }
}());