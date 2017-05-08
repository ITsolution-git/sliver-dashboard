(function() {
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
                url: '/livingSlapDayToDay',
                params: {
                    prev: {
                        name: 'Second SLAPexpert Review',
                        sref: 'actionPlan.secondExpertReview'
                    },
                    next: {
                        name: 'Commit to Yourself',
                        sref: 'execute.commitYourSelf'
                    }
                },
                controller: 'LivingDayToDayController',
                templateUrl: 'pages/execute/living-day-toDay/living-day-toDay.html'
            })
            .state('execute.commitYourSelf', {
                url: '/commitToYourself',
                params: {
                    prev: {
                        name: 'Living SLAP Day-to-Day',
                        sref: 'execute.livingDayToDay'
                    },
                    next: {
                        name: 'Set Yourself Up For Success',
                        sref: 'execute.setYourselfUpForSuccess'
                    }
                },
                controller: 'CommitYourselfController',
                templateUrl: 'pages/execute/commit-yourself/commit-yourself.html'
            })
            .state('execute.setYourselfUpForSuccess', {
                url: '/setYourselfUpForSuccess',
                params: {
                    prev: {
                        name: 'Commit to Yourself',
                        sref: 'execute.commitYourSelf'
                    },
                    next: {
                        name: 'Tour of SLAPcenter - Execute',
                        sref: 'execute.tourExecute'
                    }
                },
                controller: 'SetYourselfUpForSuccessController',
                templateUrl: 'pages/execute/set-yourself-up-for-success/set-yourself-up-for-success.html'
            })
            .state('execute.tourExecute', {
                url: '/tourOfSLAPcenterExecute',
                params: {
                    prev: {
                        name: 'Set Yourself Up For Success',
                        sref: 'execute.setYourselfUpForSuccess'
                    },
                    next: {
                        name: null,
                        sref: null
                    }
                },
                controller: 'TourExecuteController',
                templateUrl: 'pages/execute/tour-execute/tour-execute.html'
            });
    }
}());