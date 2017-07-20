(function () {
    'use strict';

    angular
        .module('manage.users.module')
        .controller('AdminSlapstersItemController', AdminSlapstersItemController);

    /* @ngInject */
    function AdminSlapstersItemController($scope, $state, pageService, adminUserService, NgTableParams, $mdToast, $q, Restangular, $mdDialog, $timeout, $rootScope, commonDialogService, $stateParams, toaster, buildData, productData, promocodeData, activityData, excuteItems,  actionplanService, paymentsService) {
        angular.extend($scope,  {
            user: {},
            buildData: buildData,
            programData: productData.filter(function(pro){return pro.typeProduct == 1}),
            extraProductData: productData.filter(function(pro){return pro.typeProduct == 3 }),
            promocodeData: promocodeData,
            activityData: activityData,
            paymentData: [],
            excuteItems: excuteItems,

            userData: [],

            userID: $stateParams.user_id,
            ROLES: adminUserService.ROLES,
            STATUSES: adminUserService.STATUSES,
            accounts: [],
            selectedUserID: '',
            deleteItem: deleteItem,
            createOrSave: createOrSave,

            changeUser: changeUser,

            //Journey
            isJouneyItemDone: isJouneyItemDone,
            //Success Metrics
            quaters: [{},{},{},{}],
            revenues: null,
            start: new Date(),
            end: new Date(),
            today: new Date(),
            startDate: null,
            
            anualInfo: {},
            //Payment:
            togglePayment: togglePayment,
            charge: charge
        });
        

        pageService
            .reset()
            .setShowBC(true)
            .addCrumb({name: 'Slapster', path: 'slapsters.list'});

        $timeout(activate);
        function activate() {
            reloadData();

            activatePayments();

            initializeIdealJourney();

            var startDate = ($scope.buildData && $scope.buildData.slapMindset && $scope.buildData.slapMindset.slapStartDate) ? $scope.buildData.slapMindset.slapStartDate : null;
            $scope.startDate = startDate;
            if(!startDate)
                return;

            doCalculation();

            $scope.quaters.push( _.merge(actionplanService.getNthQuater(startDate, 1), $scope.buildData.actionPlan.whatsHappening[0]));
            $scope.quaters.push( _.merge(actionplanService.getNthQuater(startDate, 2), $scope.buildData.actionPlan.whatsHappening[1]));
            $scope.quaters.push( _.merge(actionplanService.getNthQuater(startDate, 3), $scope.buildData.actionPlan.whatsHappening[2]));
            $scope.quaters.push( _.merge(actionplanService.getNthQuater(startDate, 4), $scope.buildData.actionPlan.whatsHappening[3]));

            $scope.startDate = $scope.quaters[0].start.toDate();
            $scope.endDate = $scope.quaters[3].end.toDate();
            $scope.today = moment.max(moment($scope.startDate), moment()).toDate(); //If the user haven't started the tracking yet.

            $scope.revenues = ($scope.buildData && $scope.buildData.yearGoal && $scope.buildData.yearGoal.revenueStreams && $scope.buildData.yearGoal.revenueStreams.revenues) ? $scope.buildData.yearGoal.revenueStreams.revenues : null;
        }

        function initializeIdealJourney() {

            _.each($scope.quaters, function(quater, QID){
                quater.quaterTotal = {};
                quater.quaterClosed = {};
                quater.quaterProgress = {};

                quater.quaterProgress['action'] = quater.quaterTotal['action'] ? quater.quaterClosed['action'] / quater.quaterTotal['action'] * 100 : 0;
                quater.quaterProgress['action'] = quater.quaterProgress['action'].toFixed(2);
                quater.quaterProgress['sales'] = quater.quaterTotal['sales'] ? quater.quaterClosed['sales'] / quater.quaterTotal['sales'] * 100 : 0;
                quater.quaterProgress['sales'] = quater.quaterProgress['sales'].toFixed(2);
                quater.quaterProgress['reflextion'] = quater.quaterTotal['reflextion'] ? quater.quaterClosed['reflextion'] / quater.quaterTotal['reflextion'] * 100 : 0;
                quater.quaterProgress['reflextion'] = quater.quaterProgress['reflextion'].toFixed(2);
            });
        }

        function doCalculation() {

            _.each($scope.quaters, function(quater, QID){
                _.each($scope.excuteItems, function(item){ //Count Actions
                    
                    if (!(moment(item.dueDate).isBetween(quater.start, quater.end, 'day', '[]')))  
                        return;
                    
                    quater.quaterTotal[item.type] ++;

                    if (item.progress == 100)
                        quater.quaterClosed[item.type] ++;
                });

                quater.quaterProgress['action'] = quater.quaterTotal['action'] ? quater.quaterClosed['action'] / quater.quaterTotal['action'] * 100 : 0;
                quater.quaterProgress['action'] = quater.quaterProgress['action'].toFixed(2);
                quater.quaterProgress['sales'] = quater.quaterTotal['sales'] ? quater.quaterClosed['sales'] / quater.quaterTotal['sales'] * 100 : 0;
                quater.quaterProgress['sales'] = quater.quaterProgress['sales'].toFixed(2);
                quater.quaterProgress['reflextion'] = quater.quaterTotal['reflextion'] ? quater.quaterClosed['reflextion'] / quater.quaterTotal['reflextion'] * 100 : 0;
                quater.quaterProgress['reflextion'] = quater.quaterProgress['reflextion'].toFixed(2);
            });
            
            //For Succes Metrics

            _.each($scope.revenues, function(revenue, revenueID){
                revenue.actualUnit = 0;

                revenue.quaterSale = [];
                for(var i = 0; i < 4; i ++)
                    revenue.quaterSale.push({
                        targetUnit: 0,
                        actualUnit: 0
                    });

                _.each($scope.quaters, function(quater, QID){

                    revenue.quaterSale[QID].targetUnit = +quater.units[revenue.name]; 
                    var salesItems = $scope.excuteItems.filter(function(item){ 
                        return +item.title == +revenue.id && 
                                item.type == 'sales' &&
                                moment(item.dueDate).isBetween(quater.start, quater.end, 'day', '[]'); 
                    });
                    
                    
                    _.each(salesItems, function(item){
                        if(item.progress == 100)
                            revenue.quaterSale[QID].actualUnit += item.saleUnit;
                    });

                    revenue.actualUnit += revenue.quaterSale[QID].actualUnit;
                });    
            });
            
            $scope.anualInfo.unit = 0;
            $scope.anualInfo.actualUnit = 0;
            $scope.anualInfo.progress = 0;
            $scope.anualInfo.quaterSale = []
            for(var i = 0; i < 4; i ++)
                $scope.anualInfo.quaterSale.push({
                    targetUnit: 0,
                    actualUnit: 0,
                    progress: 0
                })

            _.each($scope.revenues, function(revenue, revenueID){
                $scope.anualInfo.unit += revenue.unit;  
                $scope.anualInfo.actualUnit += revenue.actualUnit;  

                _.each($scope.quaters, function(quater, QID){
                    $scope.anualInfo.quaterSale[QID].targetUnit += revenue.quaterSale[QID].targetUnit;
                    $scope.anualInfo.quaterSale[QID].actualUnit += revenue.quaterSale[QID].actualUnit;
                });
            });

            $scope.anualInfo.progress = $scope.anualInfo.unit ? $scope.anualInfo.actualUnit / $scope.anualInfo.unit * 100 : 0;
            _.each($scope.quaters, function(quater, QID){
                $scope.anualInfo.quaterSale[QID].progress = $scope.anualInfo.quaterSale[QID].unit ? $scope.anualInfo.quaterSale[QID].actualUnit / $scope.anualInfo.quaterSale[QID].targetUnit * 100 : 0;
            });

        }

        function reloadData() {
            $scope.dataloaded = false;
            adminUserService.list()
            .then(function (response) {
                $scope.userData = response.data;
                $scope.accounts = [];
                $scope.user = _.find(response.data, {_id: $scope.userID});
                if (!$scope.user)
                    $state.go('slapsters.list');

                $scope.selectedUserID = $scope.user._id;
                $scope.accounts = response.data.filter(function(user){
                    return user.businessName == $scope.user.businessName;
                });

                pageService
                    .addCrumb({name: $scope.user.businessName + ' / ' + ' Created on ' + moment($scope.user.createdAt).format('YYYY-MM-DD'), path: 'users.list'})
                    .setPageTitle($scope.user.businessName);

                
                $scope.dataloaded = true;
            });
        }

        adminUserService.get($scope.userID).then(function (response) {
            $scope.user = response.data;
            
        });
        

        function createOrSave(event) {
            update().then(function(){
                toaster.pop({type: 'success', body: 'Success'});
                
            }).catch(function(err){
                console.log(err);
                toaster.pop({type: 'error', body: err.message});
            });
        }

        function update() {
            if($scope.userID){
                return adminUserService.update(Restangular.stripRestangular($scope.user));
            } else {
                return adminUserService.add(Restangular.stripRestangular($scope.user));
            }
        }

        function deleteItem(event) {
            var success = function(){

                adminUserService.delete($scope.user).then(function() {
                    toaster.pop({type: 'success', body: 'User deleted.'});
                    $state.go('users.list');
                })
                .catch(function(err) {
                    console.log(err);
                });
            }
            commonDialogService.openDeleteItemDialog(event, 'Do you really want to delete?', success);

        }

        function changeUser(user_id) {
            $state.go('slapsters.item', {bizname: '', user_id:user_id, mode:'view'});

        }

        function isJouneyItemDone(section, name){
            var isEx = _.find($scope.activityData, {journey : {section:section, name: name}});
            if (isEx)
                return true;
            return false;
        }



        //Payments 
        
        function activatePayments() {
            loadPayments().then(function(){
                $scope.paymentData = paymentsService.transformationData($scope.paymentData);
                _.each($scope.paymentData, function(payment){

                    var coupon = _.find($scope.promocodeData, {_id: payment.couponId });
                    if (coupon)
                        payment.promoCode = coupon.name;
                    else
                        payment.promoCode = '-';
                })
            });
        }

        function loadPayments() {
            return paymentsService.getAllPaymentsByUser($stateParams.user_id)
            .then(function (response) {
                return $scope.paymentData = response.data;
            }).catch(function(err) { console.log(err); $state.go('slapsters'); });
        }

        function togglePayment() {
            $scope.user.pausingPayment = !$scope.user.pausingPayment;
            createOrSave();
             
        }

        function charge (type) {
            
            var productName = ''
            if( type == 0 ) {// 1:! meeting
                productName = 'Missing 1:1 Meeting';
            } else if( type == 1 ) { // Group meeting 
                productName = 'Missing Group Meeting';
            }
            if(!confirm('Charging user for ' + productName))
                return;
            var product = _.find($scope.extraProductData, {productName: productName});
            if(!product) {
                alert('No Product Yet, Add meeting products. Try with seed.');
            }
            paymentsService.chargeUser(product, $scope.userID)
                .then(function(resp){
                    toaster.pop({type: 'success', body: 'Success'});
                    loadPayments();
                }).catch(function(err){
                    toaster.pop({type: 'error', body: 'Payment Failed.'});
                });
        }
    }
}());