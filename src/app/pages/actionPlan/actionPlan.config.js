(function () {
    'use strict';

    angular
        .module('app.pages.actionPlan')
        .config(moduleConfig);

    function moduleConfig($stateProvider) {
        $stateProvider
            .state('actionPlan', {
                data: {
                    access: '@'
                },
                abstract: true,
                url: '/actionplan',
                parent: 'default',
                views: {
                    content: {
                        template: '<ui-view />'
                    }
                }
            })
            .state('actionPlan.overview', {
                url: '/actionplanoverview',
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
                controller: 'ActionPlanOverviewController',
                templateUrl: 'pages/actionPlan/action-plan-overview/action-plan-overview.html'
            })
            .state('actionPlan.worldAroundYou', {
                url: '/theworldaroundyou',
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
                controller: 'WorldAroundYouController',
                templateUrl: 'pages/actionPlan/world-around-your/world-around-your.html'
            })
            .state('actionPlan.doubleCheckStartDate', {
                url: '/reviewstartdate',
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
                    },
                    excuteItems: function (excuteItemService) {
                        return excuteItemService.loadExcuteItems();
                    },
                },
                controller: 'SlapStartDateController',
                templateUrl: 'pages/actionPlan/double-check-start-date/double-check-start-date.html'
            })
            .state('actionPlan.whatsHappening', {
                url: '/youandyouridealclient',
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
                controller: 'WhatsHappeningController',
                templateUrl: 'pages/actionPlan/whats-happening/whats-happening.html'
            })
            .state('actionPlan.rateConnectingStrategies', {
                url: '/connectingstrategies',
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
                controller: 'RateConnectingStrategiesController',
                templateUrl: 'pages/actionPlan/rate-connecting-strategies/rate-connecting-strategies.html'
            })
            .state('actionPlan.connectingStrategyStrategizing', {
                url: '/quarterlystrategy',
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
                            });
                    },
                    actionItems: function (excuteItemService) {
                        return excuteItemService.loadExcuteItems().then(function(excuteItems){
                            return excuteItems.filter(function(item){ return item.type == 'action';});
                        });
                    },
                },
                controller: 'ConnectingStrategyStrategizingController',
                templateUrl: 'pages/actionPlan/connecting-strategy-strategizing/connecting-strategy-strategizing.html'
            })
            .state('actionPlan.actionItems', {
                url: '/actionitems',
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
                    },
                    actionItems: function (excuteItemService) {
                        return excuteItemService.loadExcuteItems().then(function(excuteItems){
                            return excuteItems.filter(function(item){ return item.type == 'action';});
                        });
                    },
                },
                controller: 'ConnectingStrategyStrategizingController',
                templateUrl: 'pages/actionPlan/action-items/action-items.html'
            })
            .state('actionPlan.quarterlyGoals', {
                url: '/quarterlygoals',
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
                    },
                    actionItems: function (excuteItemService) {
                        return excuteItemService.loadExcuteItems().then(function(excuteItems){
                            return excuteItems.filter(function(item){ return item.type == 'action';});
                        });
                    },
                },
                controller: 'ConnectingStrategyStrategizingController',
                templateUrl: 'pages/actionPlan/quarterly-goals/quarterly-goals.html'
            })
            .state('actionPlan.doubleCheckYearGoal', {
                url: '/your1yeargoal',
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
                    },
                    actionItems: function (excuteItemService) {
                        return excuteItemService.loadExcuteItems().then(function(excuteItems){
                            return excuteItems.filter(function(item){ return item.type == 'action';});
                        });
                    },
                },
                controller: 'ConnectingStrategyStrategizingController',
                templateUrl: 'pages/actionPlan/double-check-year-goal/double-check-year-goal.html'
            })
            .state('actionPlan.qa', {
                url: '/actionplanq&a',
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
                controller: 'ActionPlanQAController',
                templateUrl: 'pages/actionPlan/action-plan-qa/action-plan-qa.html'
            })
            .state('actionPlan.commitToYourActionPlan', {
                url: '/reviewactionplan',
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
                    },
                    actionItems: function (excuteItemService) {
                        return excuteItemService.loadExcuteItems().then(function(excuteItems){
                            return excuteItems.filter(function(item){ return item.type == 'action';});
                        });
                    },
                },
                controller: 'ConnectingStrategyStrategizingController',
                templateUrl: 'pages/actionPlan/commit-your-action-plan/commit-your-action-plan.html'
            })
            .state('actionPlan.step4Summary', {
                url: '/step4slapsummary',
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
                    },
                    actionItems: function (excuteItemService) {
                        return excuteItemService.loadExcuteItems().then(function(excuteItems){
                            return excuteItems.filter(function(item){ return item.type == 'action';});
                        });
                    },
                },
                controller: 'Step4SummaryController',
                templateUrl: 'pages/actionPlan/step4-summary/step4-summary.html'
            });
            // .state('actionPlan.secondExpertReview', {
            //     url: '/secondSLAPexpertReview',
            //     resolve: {
            //         activeStep: function (stepService, $state) {
            //             return stepService.resolveActiveStep(this)
            //                 .then(function (active) {
            //                     if (active) {
            //                         return active;
            //                     }

            //                     return stepService.getLastFinished()
            //                         .then(function (finishedStep) {
            //                             $state.go(finishedStep.sref);
            //                         });
            //                 })
            //         },
            //         actionItems: function (excuteItemService) {
            //             return excuteItemService.loadExcuteItems().then(function(excuteItems){
            //                 return excuteItems.filter(function(item){ return item.type == 'action';});
            //             });
            //         },
            //     },
            //     controller: 'Step4SummaryController',
            //     templateUrl: 'pages/actionPlan/second-expert-review/second-expert-review.html'
            // });
    }
}());