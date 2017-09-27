(function () {
    'use strict';

    angular
        .module('app.pages.execute')
        .config(moduleConfig);

    function moduleConfig($stateProvider) {
        $stateProvider
            .state('execute', {
                data: {
                    access: '@'
                },
                abstract: true,
                url: '/execute',
                parent: 'default',
                views: {
                    content: {
                        template: '<ui-view />'
                    }
                }
            })
            .state('execute.livingDayToDay', {
                url: '/the3slaphabits',
                resolve: {
                    activeStep: function (stepService, $state) {
                        return stepService.resolveActiveStep(this)
                            .then(function (active) {
                                if (active) {
                                    return active;
                                }

                                return stepService.getLastFinished()
                                    .then(function (finishedStep) {
                                        $state.go(finishedStep.sref);
                                    });
                            })
                    }
                },
                controller: 'LivingDayToDayController',
                templateUrl: 'pages/execute/living-day-toDay/living-day-toDay.html'
            })
            .state('execute.commitYourSelf', {
                url: '/commitToYourself',
                resolve: {
                    activeStep: function (stepService, $state) {
                        return stepService.resolveActiveStep(this)
                            .then(function (active) {
                                if (active) {
                                    return active;
                                }

                                return stepService.getLastFinished()
                                    .then(function (finishedStep) {
                                        $state.go(finishedStep.sref);
                                    });
                            })
                    }
                },
                controller: 'CommitYourselfController',
                templateUrl: 'pages/execute/commit-yourself/commit-yourself.html'
            })
            .state('execute.setYourselfUpForSuccess', {
                url: '/setYourselfUpForSuccess',
                resolve: {
                    activeStep: function (stepService, $state) {
                        return stepService.resolveActiveStep(this)
                            .then(function (active) {
                                if (active) {
                                    return active;
                                }

                                return stepService.getLastFinished()
                                    .then(function (finishedStep) {
                                        $state.go(finishedStep.sref);
                                    });
                            })
                    }
                },
                controller: 'SetYourselfUpForSuccessController',
                templateUrl: 'pages/execute/set-yourself-up-for-success/set-yourself-up-for-success.html'
            })
            .state('execute.tourExecute', {
                url: '/timetoexecute',
                resolve: {
                    activeStep: function (stepService, $state) {
                        return stepService.resolveActiveStep(this)
                            .then(function (active) {
                                if (active) {
                                    return active;
                                }

                                return stepService.getLastFinished()
                                    .then(function (finishedStep) {
                                        $state.go(finishedStep.sref);
                                    });
                            })
                    }
                },
                controller: 'TourExecuteController',
                templateUrl: 'pages/execute/tour-execute/tour-execute.html'
            });
    }
}());