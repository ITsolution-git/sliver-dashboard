(function () {
    'use strict';

    angular
        .module('manage.users.module')
        .controller('AdminSlapstersItemController', AdminSlapstersItemController);

    /* @ngInject */
    function AdminSlapstersItemController($auth, $scope, partners, $state, pageService, userService,  adminUserService, NgTableParams, $mdToast, $q, Restangular, $mdDialog, $timeout, $rootScope, commonDialogService, $stateParams, toaster, buildData, productData, promocodeData, activityData, excuteItems,  actionplanService, paymentsService, activityService, apiService, permissionService) {

        angular.extend($scope,  {
            
            user: {},
            buildData: buildData,
            programData: productData.filter(function(pro){return pro.typeProduct == 1}),
            extraProductData: productData.filter(function(pro){return pro.typeProduct == 3 }),
            promocodeData: promocodeData,
            activityData: activityData,
            paymentData: [],
            curUser: userService.getStoredUser(),
            excuteItems: excuteItems,
            changeStripeSubscription: changeStripeSubscription,
            partners: partners,
            userData: [],
            defaultStrategies: actionplanService.getDefaultConnectingStrategies(),
            strategies: [],
            startPlan: '',

            userID: $stateParams.user_id,
            ROLES: adminUserService.ROLES,
            STATUSES: adminUserService.STATUSES,
            accounts: [],
            selectedUserID: '',
            deleteItem: deleteItem,
            createOrSave: createOrSave,
            adminBuild: adminBuild,
            openExpertDialog: openExpertDialog,
            openSlapexpertDialog: openSlapexpertDialog,
            dialogCharge: dialogCharge,


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
            charge: charge,
            //Slap manager Milestones
            SMmilestones:[
                {
                    title: "Onboarding Call Set",
                    journey: {section: 'start', name: 'Onboarding Call Set'}
                },
                {
                    title: "Execute Call Set",
                    journey: {section: 'excute', name: 'Execute Call Set'}
                },
                {
                    title: "SE Calls Set",
                    journey: {section: 'start', name: 'SE Calls Set'}
                },
                {
                    title: "SM Calls Set",
                    journey: {section: 'onboard', name: 'SM Calls Set'}
                },
                {
                    title: "SLAPstuff Sent",
                    journey: {section: 'q1', name: 'SLAPstuff Sent'}
                },
                {
                    title: "SLAPbuddy Connected",
                    journey: {section: 'q2', name: 'SLAPbuddy Connected'}
                },
                {
                    title: "Q3 Hustle Call Set",
                    journey: {section: 'q3', name: 'Q3 Hustle Call Set'}
                },
                {
                    title: "Renewal Confirmed",
                    journey: {section: 'q4', name: 'Renewal Confirmed'}
                },
            ],
            toggleSMmilestone: toggleSMmilestone,
            //Activity Grid

            activityGridData: {
                gridOptions: {data:[]},
                gridActions: {}
            },
            activityGridReady: false,
            actFilter: {
                searchKeyword: '',
                startDate: '',
                endDate: ''  
            },
            buildActivityGridData: buildActivityGridData,
            activityTypes: activityService.activityTypes,
            activityFilter: {Milestone:true},
            changeUser: changeUser,
            isAdmin: isAdmin,

            //Activity dialog

            curMode: '',
            openItemDialog: openItemDialog,
            openDeleteItemDialog: openDeleteItemDialog,
            closeDialog: closeDialog,
            updateItem: updateItem,
            updateNotes: updateNotes,
            formData: {},
        });


        pageService
            .reset()
            .setShowBC(true)
            .addCrumb({name: 'SLAPsters', path: 'slapsters.list'});

        $timeout(activate);
        function activate() {
            reloadData()
            .then(function(){
                activatePayments();

                initializeIdealJourney();

                buildActivityGridData();

                $scope.activityTypes
                .filter(function(type){ return type.show = false; })

                var startDate = ($scope.buildData && $scope.buildData.slapMindset && $scope.buildData.slapMindset.slapStartDate) ? $scope.buildData.slapMindset.slapStartDate : null;
                $scope.startDate = startDate;

                $scope.startPlan = $scope.user.planId;

                $scope.actFilter.startDate = new Date();
                $scope.actFilter.endDate = new Date();
     
                if(!startDate)
                    return;
                    
                angular.extend($scope.quaters[0], _.merge(actionplanService.getNthQuater(startDate, 1), $scope.buildData.actionPlan.whatsHappening[0]));
                angular.extend($scope.quaters[1], _.merge(actionplanService.getNthQuater(startDate, 2), $scope.buildData.actionPlan.whatsHappening[1]));
                angular.extend($scope.quaters[2], _.merge(actionplanService.getNthQuater(startDate, 3), $scope.buildData.actionPlan.whatsHappening[2]));
                angular.extend($scope.quaters[3], _.merge(actionplanService.getNthQuater(startDate, 4), $scope.buildData.actionPlan.whatsHappening[3]));

                $scope.startDate = $scope.quaters[0].start.toDate();
                $scope.endDate = $scope.quaters[3].end.toDate();

                $scope.actFilter.startDate = moment($scope.user.createdAt).format("MM/DD/YYYY");
                $scope.actFilter.endDate = $scope.quaters[3].end.format("MM/DD/YYYY");
                
                $scope.today = moment.max(moment($scope.startDate), moment()).toDate(); //If the user haven't started the tracking yet.

                $scope.revenues = ($scope.buildData && $scope.buildData.yearGoal && $scope.buildData.yearGoal.revenueStreams && $scope.buildData.yearGoal.revenueStreams.revenues) ? $scope.buildData.yearGoal.revenueStreams.revenues : null;

                doCalculation();
            });
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
                quater.quaterTotal['action'] = 0;
                quater.quaterClosed['action'] = 0;
                quater.quaterTotal['sales'] = 0;
                quater.quaterClosed['sales'] = 0;
                quater.quaterTotal['reflextion'] = 0;
                quater.quaterClosed['reflextion'] = 0;
            });
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
                revenue.unit = 0;
                revenue.progress = 0;
                revenue.quaterSale = [];
                for(var i = 0; i < 4; i ++)
                    revenue.quaterSale.push({
                        targetUnit: 0,
                        actualUnit: 0,
                        progress: 0
                    });
                _.each($scope.quaters, function(quater, QID){
                    revenue.quaterSale[QID].targetUnit = +quater.units[revenue.name]; 
                    var i = $scope.defaultStrategies.length;
                    while (i--) {
                        if ($scope.defaultStrategies[i].id === quater.strategy.id) {
                           $scope.strategies.push($scope.defaultStrategies[i].name);
                        }
                    }
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
                    revenue.unit += revenue.quaterSale[QID].targetUnit;
                });    
            });
            
            
            // $scope.anualInfo.unit = 0;
            // $scope.anualInfo.actualUnit = 0;
            $scope.anualInfo.actualRevenueSum = 0;
            $scope.anualInfo.targetRevenueSum = 0;
            $scope.anualInfo.progress = 0;
            $scope.anualInfo.quaterSale = []
            for(var i = 0; i < 4; i ++)
                $scope.anualInfo.quaterSale.push({
                    // targetUnit: 0,
                    // actualUnit: 0,
                    progress: 0,
                    actualRevenueSum: 0,
                    targetRevenueSum: 0
                })
            
            _.each($scope.revenues, function(revenue, revenueID){
                $scope.anualInfo.actualRevenueSum += revenue.actualUnit * +revenue.sellingPrice;  
                $scope.anualInfo.targetRevenueSum += revenue.unit * +revenue.sellingPrice;  

                _.each($scope.quaters, function(quater, QID){
                    $scope.anualInfo.quaterSale[QID].targetRevenueSum += revenue.quaterSale[QID].targetUnit * +revenue.sellingPrice; ;
                    $scope.anualInfo.quaterSale[QID].actualRevenueSum += revenue.quaterSale[QID].actualUnit * +revenue.sellingPrice;  
                });
            });

            $scope.anualInfo.progress = $scope.anualInfo.targetRevenueSum ? $scope.anualInfo.actualRevenueSum / $scope.anualInfo.targetRevenueSum * 100 : 0;
            _.each($scope.quaters, function(quater, QID){
                $scope.anualInfo.quaterSale[QID].progress = $scope.anualInfo.quaterSale[QID].targetRevenueSum ? $scope.anualInfo.quaterSale[QID].actualRevenueSum / $scope.anualInfo.quaterSale[QID].targetRevenueSum * 100 : 0;
            });

        }

        function reloadData() {
            $scope.dataloaded = false;
            return adminUserService.list()
            .then(function (response) {
                $scope.userData = response.data;
                $scope.accounts = [];
                $scope.user = _.find(response.data, {_id: $scope.userID});

                if (!$scope.user)
                    $state.go('slapsters.list');

                $scope.selectedUserID = $scope.user._id;
                $scope.accounts = response.data.filter(function(user){
                    return user.role == 4 && user.businessName == $scope.user.businessName;
                });
                $scope.accounts = permissionService.filterSlapstersByPermission($scope.accounts);

                pageService
                    .addCrumb({name: $scope.user.businessName + ' / ' + ' Created on ' + moment($scope.user.createdAt).format('YYYY-MM-DD'), path: 'users.list'})
                    .setPageTitle($scope.user.businessName);

                
                $scope.dataloaded = true;
                return response;
            });
        }


        function createOrSave(event) {
            update().then(function(){
                toaster.pop({type: 'success', body: 'Success'});
                
            }).catch(function(err){
                console.log(err);
                toaster.pop({type: 'error', body: err.message});
            });
        }

        function changeStripeSubscription(event) {
            if ($scope.user.planId != $scope.startPlan) {
                var success = function(){
                    createOrSave(event);
                }
                commonDialogService.openDeleteItemDialog(event, 'When you change a SLAPsters Plan - it automatically changes their monthly subscription and their SLAPexpert Hours.   Are you sure you want to do this?  Do you have approval from the client?',
                'Change', success);
                $scope.startPlan = $scope.user.planId;
            }
            else {
                $scope.user.planId = $scope.startPlan;
                createOrSave(event);
            }
        }

        function update() {
            // return adminUserService.update(Restangular.stripRestangular($scope.user));
            return $scope.user.save();
        }

        function deleteItem(event) {
            var success = function(){

                adminUserService.delete($scope.user).then(function() {
                    toaster.pop({type: 'success', body: 'User archived.'});
                    $state.go('users.list');
                })
                .catch(function(err) {
                    console.log(err);
                });
            }
            commonDialogService.openDeleteItemDialog(event, 'Are you sure you want to remove this account?', 'Archive', success);
        }

        function deleteAction(event) {
            var success = function(){

                adminUserService.delete($scope.user).then(function() {
                    toaster.pop({type: 'success', body: 'Action Delete.'});
                    $state.go('users.list');
                })
                .catch(function(err) {
                    console.log(err);
                });
            }
            commonDialogService.openDeleteItemDialog(event, 'Are you sure you want to remove this action?', 'Delete', success);
        }

        function changeUser(user_id) {
            $state.go('slapsters.list');
            $state.go('slapsters.item', {user_id:user_id});
        }

        function isJouneyItemDone(section, name){
            var isEx = _.find($scope.activityData, {journey : {section:section, name: name}});
            if (isEx)
                return isEx;
            return null;
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
            return paymentsService.getStripePaymentsByUser($stateParams.user_id)
            .then(function (response) {
                return $scope.paymentData = response.data;
            }).catch(function(err) { console.log(err); $state.go('slapsters'); });
        }

        function togglePayment() {
            $scope.user.pausingPayment = !$scope.user.pausingPayment;
            createOrSave();
            // paymentsService.toggleSubscription($scope.user);
        }

        function dialogCharge(type) {
            charge(type);
            closeDialog();
        }

        function charge (type) {
            if($scope.user.pausingPayment)
                return toaster.pop({type: 'error', body: 'This user was paused payment.'});
            var productName = '';
            if( type == 0 ) {// 1:! meeting
                productName = 'Missing 1:1 Call';
            } else if( type == 1 ) { // Group meeting 
                productName = 'Missing Group Call';
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
                    activatePayments();
                }).catch(function(err){
                    toaster.pop({type: 'error', body: 'Payment Failed.'});
                });
        }
        
        function toggleSMmilestone(item) {
            var existingItem = isJouneyItemDone(item.journey.section, item.journey.name);
            if(!existingItem) {
                var activity = {
                    userId: $scope.userID,
                    title: item.title,
                    type: 'SLAPmanager',  
                    notes: item.title,
                    journey: item.journey
                };
                activityService.add(activity)
                .then(function(resp){
                    $scope.activityData.push(resp.data);
                });    
            } else {
                existingItem.remove()
                .then(function(resp){
                    var index = $scope.activityData.map(function(i){return i._id}).indexOf(existingItem._id);
                    $scope.activityData.splice(index, 1);
                });
            }
            
        }

        function buildActivityGridData() {
            var data = {}; 
            
            $scope.activityGridReady = false;
            $timeout(function(){
                var types = $scope.activityTypes
                .filter(function(type){ return type.show == true; })
                .map(function(type){return type.name});
                var filtered = $scope.activityData.filter(function(activity){
                    var valid = false;
                    if ($scope.actFilter.searchKeyword.trim() != ''){
                        if (activity.title.toLowerCase().indexOf($scope.actFilter.searchKeyword.toLowerCase()) != -1)
                            valid = true;
                        if (activity.notes.toLowerCase().indexOf($scope.actFilter.searchKeyword.toLowerCase()) != -1)
                            valid = true;
                    } else { valid = true; }


                    if (moment(activity.createdAt).isBetween($scope.actFilter.startDate, $scope.actFilter.endDate, 'day', '[]'))
                        valid &= true;
                    else
                        valid &= false;
                    

                    if(types.indexOf(activity.type) == -1)
                        valid &= false;
                    else
                        valid &= true;
                    
                    return valid;
                })

                
                data.data = filtered.map(function(act){
                    // var role = _.find($scope.ROLES, {id: user.role});
                    // user.displayRole = role ? role.name : '';
                    var updateBy = _.find($scope.userData, {_id: act.updatedBy});
                    act.updatedByUserName = updateBy ? updateBy.name + ' ' + updateBy.lastName : 'Admin';
                    act.createdAtStr = moment(act.createdAt).format('llll');
                    return act;
                });

                data.urlSync = false;
                $scope.activityGridData = {
                    gridOptions: data,
                    gridActions: {},
                };
                $scope.activityGridReady = true;
            })
            
        }


        function closeDialog() {
            $mdDialog.hide();
        }

        function openItemDialog($event, mode, item) {
            $scope.curMode = mode;
            if ($scope.curMode == 'add') {
                var newForm = {
                    type: '',
                    title: '',
                    notes: '',
                    userId: $scope.userID
                };
                
                $scope.formData = newForm;
            } else if ($scope.curMode == 'edit') {
                $scope.formData = apiService.rest.copy(item);
            }
            $mdDialog.show({
                clickOutsideToClose: true,
                targetEvent: $event,
                scope: $scope, 
                preserveScope: true,
                templateUrl: 'admin/components/dialogs/activity-dialog/activity-dialog.html',
                controller: 'ActivityDialogController',
                autoWrap: true
            });
        }

        function openSlapexpertDialog($event, item) {
                var newForm = {
                    type: 'SLAPexpert',
                    title: 'Client interaction',
                    extra: {
                        date: '',
                        hours: '',
                        minutes: '',
                        callLength: 0,
                        tool: '',
                        mindset: 0,
                        statement: 0,
                        goals: 0,
                        items: 0,
                        rate: 0,
                        priorities: '',
                        spec: '',
                    },
                    notes: '',
                    userId: $scope.userID,
                };
                
                $scope.formData = newForm;
                
            $mdDialog.show({
                clickOutsideToClose: true,
                targetEvent: $event,
                scope: $scope, 
                preserveScope: true,
                templateUrl: 'admin/components/dialogs/slapexpert-dialog/slapexpert-dialog.html',
                controller: 'SlapexpertDialogController',
                autoWrap: true
            });
        }

        function openExpertDialog($event, item) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Record Client Interaction?')
                .textContent('Record Client Interaction?')
                .ariaLabel('CIN')
                .targetEvent($event)
                .ok('Attended Meeting - record CIN')
                .cancel('Missed Meeting - charge cancellation fee');
        
                $mdDialog.show(confirm).then(function() {
                    openSlapexpertDialog($event, item);
                    }, function () {
                        $mdDialog.show({
                            clickOutsideToClose: true,
                            targetEvent: $event,
                            scope: $scope, 
                            preserveScope: true,
                            templateUrl: 'admin/components/dialogs/meeting-dialog/meeting-dialog.html',
                            controller: 'MeetingDialogController',
                            autoWrap: true
                        });
                    });
        }

        

        function updateNotes($event, form) { 
            if(form.$invalid) {
                toaster.pop({type: 'error', body: "You cannot finalize this process until all fields are completed.", timeout: 2000});
                vm.buttonDisabled = false;
                return;
            }
            activityService.add($scope.formData)
                .then(function(response){
                    $scope.activityData.push(response.data);
                    showToast('Added Activity');
                    buildActivityGridData();
                });
            $mdDialog.hide($event);
        }
        
        function updateItem($event) {
            if ($scope.curMode == 'add') {
                
                activityService.add($scope.formData)
                .then(function(response){
                    $scope.activityData.push(response.data);
                    showToast('Added Activity');
                    buildActivityGridData();
                });
            } else if($scope.curMode == 'edit') {
                
                $scope.formData.save().then(function(item){
                    var index = _.findIndex($scope.activityData, {_id: $scope.formData._id});
                    $scope.activityData[index] = $scope.formData;
                    showToast('Updated');
                    buildActivityGridData();
                });
            } 
            $mdDialog.hide($event);
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

        function openDeleteItemDialog($event, item) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Confirm Delete')
                .textContent('Are you sure you want to remove this action?')
                .ariaLabel('Delete')
                .targetEvent($event)
                .ok('Delete')
                .cancel('No');

            $mdDialog.show(confirm).then(function() {
                item.remove().then(function(response) {
                    var index = _.findIndex($scope.activityData, {_id: item._id});
                    $scope.activityData.splice(index, 1);
                    showToast('Deleted Activity');
                    buildActivityGridData();
                });
            }, function() {
            });
        }

        function adminBuild(item) {
            apiService.adminToken = $auth.getToken();

            adminUserService.getToken(item._id).then(function (res){
                $auth.setToken(res.data.token);
                $state.go('home');
                document.location.reload(true);
                //var url = $state.href('login',{token: res.data.token})
                //window.open(url, '_blank');
            });
        }

        function isAdmin() {
            if($scope.curUser.role == 1 || $scope.curUser.role == 3) return true;
            else return false;
        }


    
}
}());