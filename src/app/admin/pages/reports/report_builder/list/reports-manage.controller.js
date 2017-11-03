(function () {
    'use strict';

    angular
        .module('reports.reportBuilder.module')
        .controller('AdminReportsManageController', AdminReportsManageController);

    function AdminReportsManageController($scope, expertReportService, partnerReportService, $state, pageService, reportService, NgTableParams, $mdToast, $q, Restangular, $mdDialog, $timeout, $rootScope, commonDialogService) {
        angular.extend($scope,  {
            gridData: {
                gridOptions: {data:[]},
                gridActions: {}
            },
            reports: [],
            searchKeyword: '',
            dataloaded: false,
            dataReady: false,
            
            buildGridData: buildGridData,
            deleteItem: deleteItem,
            getReport: getReport,
        });

        pageService
            .reset()
            .addCrumb({name: 'Reports', path: 'reports.list'})
            .setPageTitle('Manage Reports');


        $timeout(activate);
        function activate() {
            reloadData();
        }

        function getReport() {
            return expertReportService.post({expertId: '59f85bdc2e9d831c0c956c2c', from: '2017.10.01', to: '2017.11.30'})
                .then(function (resolve) {console.log(resolve);})
                .catch(function (e) {console.log(e);})
        }

        function reloadData() {
            $scope.dataloaded = false;
            reportService.list()
            .then(function (response) {
                $scope.reports = response.data;
                $scope.dataloaded = true;
                buildGridData();
            });
        }

    
        function buildGridData() {
            var data = {}; 
            
            $scope.dataReady = false;
            $timeout(function(){

                var filtered = $scope.reports.filter(function(report){
                    var valid = false;
                    if ($scope.searchKeyword.trim() != ''){
                        if (report.name.toLowerCase().indexOf($scope.searchKeyword) != -1)
                            valid = true;
                    } else { valid = true; }
                    return valid;
                })

                data.data = filtered.map(function(report){

                    return report;
                });

                data.urlSync = false;
                    $scope.gridData = {
                    gridOptions: data,
                    gridActions: {},
                };
                $scope.dataReady = true;
            })
            
        }

        function deleteItem(event, item) {
            var success = function(){

                item.remove().then(function() {
                    reloadData();
                })
                .catch(function(err) {
                    console.log(err);
                });
            }
            commonDialogService.openDeleteItemDialog(event, 'Are you sure you want to remove this?', 'Delete', success);
        }


    }
}());