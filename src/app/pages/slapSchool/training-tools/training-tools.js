(function () {
    'use strict';

    angular
        .module('app.pages.slapSchool')
        .controller('TrainingToolsController', TrainingToolsController);

    function TrainingToolsController($scope, activeStep, pageService, stepService, $state, $timeout, actionplanService, $uibModal, $window, idealclientService) {



        angular.extend($scope, {
            rateConnectingStrategies: activeStep.data.rateConnectingStrategies,
            forward: true,
            sendData: sendData,
            saved: false,
            positions: [],
            center: {},
            idealClientSelects: idealclientService.getClientSliders(),
            defaultStrategies: actionplanService.getDefaultConnectingStrategies(),
            openVideoBox: openVideoBox,
            showResponsiveView: false,
            notifications: [],
            getStrategyName: getStrategyName
        });

        if ($scope.rateConnectingStrategies.length == 0) {
            $scope.rateConnectingStrategies = actionplanService.getDefaultConnectingStrategies();
        }
       getData();

        function getData() {
            stepService.getApiData('yourStatement') //TODO: Think over the dynamics url
                .then(function (response) {
                    if (response && response.status === 200) {
                        $scope.clientName = _.get(response, 'data.yourStatement.fourth', []);
                        var originalData = _.clone($scope.data);
                    }
                });
        }
        $timeout(setPosition);

        pageService
            .reset()
            .setShowBC(false)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Action Plan');


        function sendData(direction) {
            var hasViewedAllVideos = true;
            $scope.rateConnectingStrategies.forEach(function(strategy){
                if (strategy.rating === 0){
                    hasViewedAllVideos = false;
                }
            });
            if (!hasViewedAllVideos && direction == 'forward') {
                addNotification($scope.notifications, {name: 'Valid Video', type: 'error', message:'You must watch all videos and rate each Connecting Strategy before you can go to the next step.', show: true});

                $('body').animate({
                    scrollTop: $("slap-notifications").offset().top
                }, 400);
                return;
            } else {
                removeNotification($scope.notifications, 'Valid Video');
                
            }

            // stepService.updateActiveModel($scope);
            // stepService.setFinishActiveStep();

            // stepService.updateActiveModel($scope);
            // stepService.setFinishActiveStep();

            // var nextprevStep = stepService.getNextAndPrevStep();
            // var urls = activeStep.sref.split('.');
            //
            // return stepService.sendApiData(urls[urls.length - 1], $scope.data)
            //     .then(function () {
            //         $scope.saved = true;
            //         if(direction == 'forward')
            //             $state.go(nextprevStep.nextStep.sref);
            //         else if(direction == 'backward')
            //             $state.go(nextprevStep.prevStep.sref);
            //     });
        }

        function setPosition() {
            if ($window.innerWidth <= 900) {
                $scope.showResponsiveView = true;
                return;
            }
            var radius = 300; // radius of the circle
            var fields = $('.strategy-box'),
                container = $('#strategy-container'),
                width = container.width() + 30,
                height = container.height(),
                angle = 0,
                step = (2*Math.PI) / fields.length;
            var emptyAvatar = $('#empty-client');
            fields.each(function(index, field) {
                var x = Math.round(width/2 + radius * Math.sin(angle) - $(this).width()/2),
                    y = Math.round(height/2 - radius * Math.cos(angle) - $(this).height()/2);
                $scope.positions[index] = {x: Math.round(width/2 + radius * Math.sin(angle)), y: Math.round(height/2 - radius * Math.cos(angle))};
                $(this).css({
                    left: x + 'px',
                    top: y + 'px'
                });
                angle += step;
            });
            $(emptyAvatar).css({
                left: Math.round(width/2 - $(emptyAvatar).width()/2),
                top: Math.round(height/2 - $(emptyAvatar).height()/2)
            });
            $scope.center.x = Math.round(width/2.0);
            $scope.center.y = Math.round(height/2.0);

        }

        function addNotification(notifications, newNotification) {
            var existing = _.find(notifications, {name: newNotification.name});
            if (_.isUndefined(existing)) {
                notifications.push(newNotification);
            } else {
                existing.show = true;
            }
            
        }

        function removeNotification(notifications, name) {
            _.remove(notifications, function(notification) {
                return notification.name == name;
            });
        }

        function openVideoBox(strategy) {
            strategy.video = actionplanService.getDefaultConnectingStrategies()[strategy.id - 1].video;


            var modalInstance = $uibModal.open({
                component: 'strategyVideoBox',
                size: 'lg',
                resolve: {
                    strategy: function () {
                        return strategy;
                    }
                }
            });

            modalInstance.result.then(function (value) {
                strategy.rating = value.strategy.rating;
                strategy.reason = value.strategy.reason;
                if (value.action == 'saveAndNext') {
                    openVideoBox($scope.rateConnectingStrategies[(value.strategy.id) % 10]);
                } else if (value.action == 'saveAndPrev') {
                    openVideoBox($scope.rateConnectingStrategies[(value.strategy.id + 10 - 2) % 10]);
                }
            }, function () {
                
            });
        }
        $scope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            if ($scope.saved != true) {
                sendData();
            }
        });
        function getStrategyName(id) {
            var obj = _.find($scope.defaultStrategies, { id: id });
            if (obj) return obj.name;
            else return ''
        }


    }
}());