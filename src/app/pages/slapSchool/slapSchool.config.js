(function () {
    'use strict';

    angular
        .module('app.pages.slapSchool')
        .config(moduleConfig);

    function moduleConfig($stateProvider) {
        $stateProvider
            .state('slapSchool', {
                data: {
                    access: '@'
                },
                parent: 'withNavbar',
                url: '/school',
                views: {
                    content: {
                        controller: 'SlapSchoolController',
                        templateUrl: 'pages/slapSchool/slapSchool.html'
                    }
                },
                resolve: {
                    data: function (zoomService) {
                        return zoomService.meetingsList();
                    } 
                }
            })
            .state('slapSchool.trainingTools', {
                data: {
                    access: '@'
                },
                parent: 'withNavbar',
                url: '/school/training',
                views: {
                    content: {
                        controller: 'TrainingToolsController',
                        templateUrl: 'pages/slapSchool/training-tools/training-tools.html'
                    }
                },
                resolve: {
                    activeStep: function (stepService, $state) {
                        return stepService.getApiData('rateConnectingStrategies')
                            .then(function (active) {
                                if (active) {
                                    return active;
                                }
                                return stepService.getLastFinished()
                                .then(function (finishedStep) {
                                    $state.go('slapSchool.trainingTools');
                                });
                            })
                    }
                }
            })
            .state('slapSchool.trainingToolsItem', {
                data: {
                    access: '@'
                },
                parent: 'withNavbar',
                url: '/school/training/{strategy_id}',
                views: {
                    content: {
                        controller: 'TrainingToolsItemController',
                        templateUrl: 'pages/slapSchool/training-tools/trainig-tools-item/trainig-tools-item.html'

                    }
                }//,
                // resolve: {
                //     activeStep: function (stepService, $state) {
                //         return stepService.getApiData('rateConnectingStrategies')
                //             .then(function (active) {
                //                 if (active) {
                //                     return active;
                //                 }
                //                 return stepService.getLastFinished()
                //                     .then(function (finishedStep) {
                //                         $state.go('slapSchool.trainingTools');
                //                     });
                //             })
                //     }
                // }
            })
    }
}());