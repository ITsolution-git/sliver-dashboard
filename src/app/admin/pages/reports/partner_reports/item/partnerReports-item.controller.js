(function () {
    'use strict';

    angular
        .module('reports.partnerReports.module')
        .controller('AdminPartnerReportsItemController', AdminPartnerReportsItemController);

    /* @ngInject */
    function AdminPartnerReportsItemController($scope, $state, partnerReportService, pageService, allPartners, adminUserService, NgTableParams, $mdToast, $q, Restangular, $mdDialog, $timeout, $rootScope, commonDialogService, $stateParams, toaster, reportService, actionplanService, $window) {
        
        angular.extend($scope,  {
            gridData: {
                gridOptions: {data:[]},
                gridActions: {}
            },            
            dataReady: false,
            report: {},
            reportID: $stateParams.report_id,
            users: allPartners,
            partner: '',
            startDate: '',
            endDate: '',
            buildReport: buildReport,
            selectedYear: (new Date()).getFullYear(),
            getYears: getYears,
            selectedMonth: (new Date()).getMonth() + 1,
            getMonths: getMonths
        });

        pageService
            .reset() 
            .setShowBC(true)
            .addCrumb({name: 'Partner Reports', path: 'reports.partner.item'})
            .setPageTitle('Partner Reports');


        $scope.printSlap = function () {
            $window.print();
            // $timeout(function() {
            //     $window.print();
            // })
    //         var contentToPrint = $('#partner-report').html();
    //         var windowPopup = window.open('', '_blank', 'width=500,height=500');
    //         windowPopup.document.open();
    //         windowPopup.document.write('<html><head><link href="https://fonts.googleapis.com/icon?family=Material+Icons"
    // rel="stylesheet"><link rel="stylesheet" type="text/css" href="/../css/vendor.css" /><link rel="stylesheet" type="text/css" href="/../css/custom/custom.css" /><link rel="stylesheet" type="text/css" href="/../css/style.css" /><link rel="stylesheet" type="text/css" href="/../css/materializestyle.css" /><link rel="stylesheet" type="text/css" href="/../css/materialize.css" /><script src="./vendor.js"></script><script type="text/javascript" src="/js/plugins/jquery-1.11.2.min.js"></script><script type="text/javascript" src="./materialize.js"></script><script type="text/javascript" src="./plugins/perfect-scrollbar/perfect-scrollbar.min.js"></script></head><body onload="window.print()">' + contentToPrint + '</body></html>');
    //         windowPopup.document.close();            
        };

        function buildReport() {
            $scope.disableButton = true;
            $scope.dataReady = false;
            var startDate = new Date($scope.selectedYear, $scope.selectedMonth - 1, 1)
            var endDate = new Date($scope.selectedYear, $scope.selectedMonth, 0)
            if ($scope.partner && startDate && endDate){
                return partnerReportService.post({partnerId: $scope.partner, from: startDate, to: endDate})
                .then(function (resolve) {
                    $scope.report = resolve.data;
                    $scope.gridData = {
                        gridOptions: {
                            data: $scope.report.slapsters,
                            urlSync: false, 
                        },
                        gridActions: {},
                    };
                    if ($scope.report.slapsters)
                        $scope.dataReady = true;
                    if($scope.report != "No reports for this date range."){
                        $scope.visibleReport = true;
                        $scope.visibleMess = false;
                    }else {
                        $scope.visibleReport = false;
                        $scope.visibleMess = true;
                    }
                    $scope.disableButton = false;
                })
                    .catch(function (e) { $scope.disableButton = false;  console.log(e);})
            } else {
                $scope.disableButton = false; 
            }
        }

        function getYears() {
            var years = [];
            for (var i = 2000; i < (new Date()).getFullYear() + 1; i++) {
                years.push(i);
            }
            return years;
        }

        function getMonths() {
            var months = [];
            var limit = ($scope.selectedYear === (new Date()).getFullYear()) ? (new Date()).getMonth() + 1 : 12;
            for (var i = 1; i <= limit; i++) {
                months.push(i);
            }
            return months;
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