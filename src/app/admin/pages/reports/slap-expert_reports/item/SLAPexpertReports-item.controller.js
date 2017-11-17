(function () {
    'use strict';

    angular
        .module('reports.SLAPexpertReports.module')
        .controller('AdminSLAPExpertReportsItemController', AdminSLAPExpertReportsItemController);

    /* @ngInject */
    function AdminSLAPExpertReportsItemController($scope, $state, expertReportService, pageService, allExperts, adminUserService, NgTableParams, $mdToast, $q, Restangular, $mdDialog, $timeout, $rootScope, commonDialogService, $stateParams, toaster, reportService, actionplanService) {
        angular.extend($scope,  {
            report: {},
            reportID: $stateParams.report_id,
            users: allExperts,
            expert: '',
            startDate: '',
            endDate: '',
            buildReport: buildReport,
        });


        pageService
            .reset()
            .setShowBC(true)
            .addCrumb({name: 'SLAPexpert Reports', path: 'reports.slapexpert.item'})
            .setPageTitle('SLAPexpert Reports');


        $scope.printSlap = function () {
            window.print();
        };

        function buildReport() {
            $scope.disableButton = true;
            if ($scope.expert && $scope.startDate && $scope.endDate)
                return expertReportService.post({expertId: $scope.expert, from: $scope.startDate, to: $scope.endDate})
                    .then(function (resolve) {
                        $scope.report = resolve.data;
                        if($scope.report){
                            $scope.visibleReport = true;
                            $scope.visibleMess = false;
                        }else {
                            $scope.visibleReport = false;
                            $scope.visibleMess = true;
                        }
                        $scope.disableButton = false;
                    })
                    .catch(function (e) { $scope.disableButton = false; console.log(e);})
        }


        //
    //     $timeout(function(){
    //         activate();
    //     });
    //     function activate() {
    //
    //         if (!$scope.reportID) {
    //             pageService
    //                 .addCrumb({name: 'Add', path: 'reports.add'})
    //                 .setPageTitle('Build Reports');
    //
    //             $scope.report = {};
    //             $scope.report.filter = {};
    //             $scope.report.filter.products = [];
    //             $scope.report.filter.coupons = [];
    //             $scope.report.filter.activities = [];
    //             $scope.report.filter.quaters = [];
    //             $scope.report.filter.scores = [];
    //             $scope.report.filter.strategies = [];
    //             $scope.report.filter.goalProgress = {};
    //             $scope.report.filter.startDate = new Date();
    //             $scope.report.filter.endDate = new Date();
    //         } else {
    //             reportService.get($scope.reportID).then(function (response) {
    //                 $scope.report = response.data;
    //
    //                 pageService
    //                     .addCrumb({name: $scope.report.name , path: 'reports.list'})
    //                     .setPageTitle('Build');
    //             });
    //         }
    //     }
    //     function createOrSave(event) {
    //
    //         update().then(function(){
    //             toaster.pop({type: 'success', body: 'Report saved.'});
    //             $state.go('reports.list');
    //         }).catch(function(err){
    //             toaster.pop({type: 'error', body: err.data & err.data.message ? err.data.message : 'Error.'});
    //         });
    //     }
    //
    //     function update() {
    //         if($scope.reportID){
    //             return $scope.report.save();
    //         } else {
    //             return reportService.add($scope.report);
    //         }
    //     }
    //     function deleteItem(event) {
    //         var success = function(){
    //
    //             reportService.delete($scope.report).then(function() {
    //                 toaster.pop({type: 'success', body: 'Report Deleted.'});
    //                 $state.go('reports.list');
    //             })
    //             .catch(function(err) {
    //                 console.log(err);
    //             });
    //         }
    //         commonDialogService.openDeleteItemDialog(event, 'Are you sure you want to remove this?', 'Delete', success);
    //
    //     }
    //
    //     function showToast(message) {
    //         var toast = $mdToast.simple()
    //         .textContent(message)
    //         .action('OK')
    //         .hideDelay(3000)
    //         .position("bottom right");
    //
    //         $mdToast.show(toast).then(function(response) {
    //             if ( response == 'ok' ) {
    //                 $mdToast.hide();
    //             }
    //         });
    //     }
    //
    //
    //
    //     //Products
    //     function transformProductChip(chip) {
    //         if (angular.isObject(chip)) {
    //             return chip;
    //         }
    //         return null;
    //     }
    //
    //     function queryProductSearch (query) {
    //         if(query)
    //             return $scope.allProducts.filter(function(item){
    //                 return item.productName.toLowerCase().indexOf(query.toLowerCase()) != -1;
    //             });
    //         else
    //             return $scope.allProducts;
    //     }
    //     //Coupons
    //
    //     function transformCouponChip(chip) {
    //         if (angular.isObject(chip)) {
    //             return chip;
    //         }
    //         return null;
    //     }
    //
    //     function queryCouponSearch (query) {
    //         if(query)
    //             return $scope.allCoupons.filter(function(item){
    //                 return item.name.toLowerCase().indexOf(query.toLowerCase()) != -1;
    //             });
    //         else
    //             return $scope.allCoupons;
    //     }
    //
    //     //Activities
    //
    //     function transformActivityChip(chip) {
    //         return chip;
    //         if (angular.isObject(chip)) {
    //             return chip;
    //         }
    //         return null;
    //     }
    //     function queryActivitySearch (query) {
    //         if(query)
    //             return $scope.allActivities.filter(function(item){
    //                 return item.name.toLowerCase().indexOf(query.toLowerCase()) != -1;
    //             });
    //         else
    //             return $scope.allActivities;
    //     }
    //
    //     //Strategies
    //
    //     function transformStrategyChip(chip) {
    //         return chip;
    //         if (angular.isObject(chip)) {
    //             return chip;
    //         }
    //         return null;
    //     }
    //     function queryStrategySearch (query) {
    //         if(query)
    //             return $scope.allStrategies.filter(function(item){
    //                 return item.name.toLowerCase().indexOf(query.toLowerCase()) != -1;
    //             });
    //         else
    //             return $scope.allStrategies;
    //     }
    //
    //
    //     //Scores
    //
    //     function transformScoreChip(chip) {
    //         return chip;
    //         if (angular.isObject(chip)) {
    //             return chip;
    //         }
    //         return null;
    //     }
    //     function queryScoreSearch (query) {
    //         if(query)
    //             return $scope.allScores.filter(function(item){
    //                 return item.name.toLowerCase().indexOf(query.toLowerCase()) != -1;
    //             });
    //         else
    //             return $scope.allScores;
    //     }
    //
    //
    //     //Quaters
    //
    //     function transformQuaterChip(chip) {
    //         return chip;
    //         if (angular.isObject(chip)) {
    //             return chip;
    //         }
    //         return null;
    //     }
    //     function queryQuaterSearch (query) {
    //         if(query)
    //             return $scope.allQuaters.filter(function(item){
    //                 return item.name.toLowerCase().indexOf(query.toLowerCase()) != -1;
    //             });
    //         else
    //             return $scope.allQuaters;
    //     }
    //
    //
    }

}());