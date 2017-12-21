(function () {
    'use strict';

    angular
        .module('reports.reportBuilder.module')
        .controller('AdminReportsItemController', AdminReportsItemController);

    /* @ngInject */
    function AdminReportsItemController($scope, allPartners, allExperts, $state, pageService, adminUserService, NgTableParams, $mdToast, $q, Restangular, $mdDialog, $timeout, $rootScope, commonDialogService, $stateParams, toaster, reportService, allProducts, allCoupons, actionplanService) {
        angular.extend($scope,  {
            report: {},
            reportID: $stateParams.report_id,
            ROLES: adminUserService.ROLES,
            STATUSES: adminUserService.STATUSES,
            res: [],
            expert: allExperts,
            partner: allPartners,

            deleteItem: deleteItem,
            createOrSave: createOrSave,
            printSlap: printSlap,

            runReportBuilder: runReportBuilder,
            is_running: false, 
            COUNTRIES: [{id: 0, name: 'International'},{id: 1, name: 'Canada'},{id: 2, name: 'United States'}, ],

            //Products
            allProducts: allProducts,
            selectedProduct: null,
            searchProductText: null,
            //Coupons
            allCoupons: allCoupons,
             selectedCoupon: null,
            searchCouponText: null,
            ActivitiesAll: [{id: 11, name: 'Have Logged In', dateRange: false}, {id: 1, name: 'Have Not Logged In', dateRange: false},
            {id: 2, name: 'SE Calls Scheduled', dateRange: false}, {id: 3, name: 'SM Accountability Calls Scheduled', dateRange: false}, 
            {id: 4, name: 'Onboarding Call Happened', dateRange: true}, {id: 5, name: 'Execute Onboarding Call Happened', dateRange: true}, 
            {id: 6, name: 'SLAPexpert Call Happend', dateRange: true}, {id: 7, name: 'Q1 Feedback Call Happened', dateRange: true}, 
            {id: 8, name: 'Q4 Hustle Call Happened', dateRange: true}, {id: 9, name: 'Renewal Confirmed', dateRange: true}, 
            {id: 10, name: 'SLAPstuff Sent', dateRange: true}],
            slapStatuses: [{id: 0, name: 'In Build'}, {id: 1, name: 'In Execute'}],
            //Activities
            allActivities: [{id: 0, name: 'Logged In'},{id: 1, name: 'Did not log in'},{id: 2, name: 'Completed Build Step 1'},{id: 3, name: 'Completed Build Step 2'},{id: 4, name: 'Completed Build Step 3'},{id: 5, name: 'Completed Build Step 4'},{id: 6, name: 'Commited Build'},{id: 7, name: 'Submitted their SLAP'},{id: 8, name: 'Submitted Weekly Reflection'},{id: 9, name: 'Submitted Monthly Reflection'},{id: 10, name: 'Submitted Quarterly Reflection'},{id: 11, name: 'Updated Sales Tracker'},{id: 12, name: 'Updated Action Items'}],
            //Quaters
            allQuaters: [{id:1, name:'Q1'}, {id:2, name:'Q2'}, {id:3, name:'Q3'},{id:4, name:'Q4'}],
            //Score
            allScores: [{id:1, name:'Red'}, {id:2, name:'Yellow'}, {id:1, name:'Green'}],
            //Strategies
            allStrategies: actionplanService.getDefaultConnectingStrategies(),
            pausingPaymentsStatus: [{id: 1, name: 'Paused'}, {id: 0, name: 'Active'}],
            declinedStatus: [{id: 0, name: 'Declined'}, {id: 1, name: 'Money'}],
            buildStatus: [{id: 0, name: 'Less then 30 days'}, {id: 1, name: 'More then 30 days'}],
            gridData: {
                gridOptions: {
                    data:[]
                },
                gridActions: {}
            },  
            dataReady: false,
            itemPerPage: 50,            
            getItemPerPage: getItemPerPage,
            reloadData: reloadData     
        }); 


        pageService
            .reset()
            .setShowBC(true)
            .addCrumb({name: 'Report Builder', path: 'reports.list'});

        $timeout(function(){
            activate();
        });
        function activate() {

            if (!$scope.reportID) {
                pageService
                    .addCrumb({name: 'Add', path: 'reports.add'})
                    .setPageTitle('Report Builder');

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

            if (!$scope.report.filter.slapStatus) 
                $scope.report.filter.quaters = [];
            
            update().then(function(){
                toaster.pop({type: 'success', body: 'Report saved.'});
                $state.go('reports.list');
            }).catch(function(err){
                toaster.pop({type: 'error', body: err.data & err.data.message ? err.data.message : 'Error.'});
            });
        }

        function update() {
            if($scope.reportID){
                return reportService.update($scope.report);
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

        function runReportBuilder() {
            $scope.is_running = true;
            $scope.dataReady = false;
            return reportService.run($scope.report).then(function(res){
                $scope.res = res.data;
                var users = res.data.users;
                var gridData = [];
                users.forEach(function(user) {
                    gridData.push(user);
                })
                $scope.gridData = {
                    gridOptions: {
                        data: gridData,
                        urlSync: true, 
                    },
                    sort: {
                        predicate: 'businessName',
                        direction: 'asc'
                    },                    
                    gridActions: {},
                };                
                if (gridData)
                    $scope.dataReady = true;
            })
        }

        function printSlap() {
            window.print();
        }

        function getItemPerPage(value) {
            $scope.itemPerPage = value;
        }
        function reloadData() {
            $scope.dataloaded = false;
            adminUserService.list()
            .then(function (response) {
                var slapsters = response.data.filter(function(user) {
                    return user.role == 4;
                });
                slapsters = permissionService.filterSlapstersByPermission(slapsters);

                var accounts = _.groupBy(slapsters, function(user) { return user.email; });
                $scope.slpasters = [];
                _.each(accounts, function(account){
                    $scope.slpasters.push({
                        current: account[0],  //TODO: select appropriate slapsters
                        accounts: account
                    });
                });
                
                $scope.dataloaded = true;
                buildGridData();
            });
        }

    }
}());