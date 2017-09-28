(function () {
    'use strict';

    angular
        .module('app.services')
        .service('stepService', stepService);

    function stepService(apiService, $q, toaster) {
        var steps = [
            {
                name: 'Our Commitment To You',
                sref: 'mindset.ourCommitment',
                model: {
                    showInfoBlock: false,
                    showVideoBlock: false,
                    showStaticTextBlock: false
                },
                videoUrl: 'http://content.jwplatform.com/videos/UNz3tfmI-CZ1S4g0I.mp4'
            }, {
                name: 'Your Commitment to Us',
                sref: 'mindset.yourCommitment',
                model: {
                    showInfoBlock: false,
                    showVideoBlock: false,
                    showStaticTextBlock: false,
                    data: null
                },
                videoUrl: 'http://content.jwplatform.com/videos/plhYBAOo-CZ1S4g0I.mp4'
            }, /*{
                name: 'Get the SLAPmindset',
                sref: 'mindset.slapMindset',
                model: {
                    showInfoBlock: false,
                    showVideoBlock: false,
                    showStaticTextBlock: false
                }
            },*/ {
                name: 'Privilege and Responsibility',
                sref: 'mindset.privilegeAndResponsibility',
                model: {
                    showInfoBlock: false,
                    showVideoBlock: false,
                    showStaticTextBlock: false,
                    showDropdownBlock: false,
                    showNotice: false,
                    data: {
                        first: null,
                        second: null,
                        third: null,
                        fourth: null,
                        text: null,
                        businessName: null,
                        result: null
                    }
                },
                videoUrl: 'http://content.jwplatform.com/videos/mChzDpt3-CZ1S4g0I.mp4'
            }, {
                name: 'Are You Stuck?',
                sref: 'mindset.areYourStuck',
                model: {
                    showInfoBlock: false,
                    showVideoBlock: false,
                    showStaticTextBlock: false,
                    data: null
                },
                videoUrl: 'http://content.jwplatform.com/videos/6NN6zFhp-CZ1S4g0I.mp4'
            }, {
                name: 'Cashflow Capacity Catch 22',
                sref: 'mindset.cashFlow',
                model: {
                    showInfoBlock: false,
                    showVideoBlock: false,
                    showStaticTextBlock: false
                },
                videoUrl: 'http://content.jwplatform.com/videos/piNY7QMa-CZ1S4g0I.mp4'
            }, {
                name: 'Plan and Action',
                sref: 'mindset.yourBusiness',
                model: {
                    showInfoBlock: false,
                    showVideoBlock: false,
                    showStaticTextBlock: false
                },
                videoUrl: 'http://content.jwplatform.com/videos/l24Ipj3e-CZ1S4g0I.mp4'
            },/* {
                name: 'Top Down, Bottom Up',
                sref: 'mindset.topDownBottomUp',
                model: {
                    showInfoBlock: false,
                    showVideoBlock: false,
                    showStaticTextBlock: false
                }
            }, *//*{
                name: 'Start SLAP\'n!',
                sref: 'mindset.startSlapn',
                model: {
                    showInfoBlock: false,
                    showVideoBlock: false,
                    showStaticTextBlock: false
                }
            },*/ {
                name: 'Get SLAPn!',
                sref: 'mindset.slapStartDate',
                model: {
                    data: {
                        year: null,
                        month: null
                    },
                    showVideoBlock: false,
                    showStaticTextBlock: false,
                    showStartDate: false
                },
                videoUrl: 'http://content.jwplatform.com/videos/sG2Jy0bq-CZ1S4g0I.mp4'
            },

            // Slapstatement

            {
                name: 'SLAPstatement Overview',
                sref: 'statement.overview',
                model: {
                    showInfoBlock: false,
                    showVideoBlock: false,
                    showStaticTextBlock: false
                },
                videoUrl: 'http://content.jwplatform.com/videos/rhBpA6WX-CZ1S4g0I.mp4'
            }, {
                name: 'Your SLAPstatement',
                sref: 'statement.yourStatement',
                model: {
                    data: {
                        first: '0',
                        second: '',
                        third: '0',
                        fourth: '',
                        fifth: '0'
                    },
                    fullName: null,
                    showVideoBlock: false,
                    showStaticTextBlock: false,
                    showFormBlock: false
                },
                videoUrl: 'http://content.jwplatform.com/videos/8cL3Av2t-CZ1S4g0I.mp4'
            }, {
                name: 'SLAPstatement Q&A',
                sref: 'statement.qa',
                model: {
                    showInfoBlock: false,
                    showVideoBlock: false,
                    showStaticTextBlock: false
                },
                videoUrl: ''
            }, {
                name: 'Review SLAPstatement',
                sref: 'statement.commitToYour',
                model: {
                    showVideoBlock: false,
                    showStaticTextBlock: false,
                    showContent: false,
                    data: {},
                    businessName: null
                },
                videoUrl: 'http://content.jwplatform.com/videos/5XhZZYt0-CZ1S4g0I.mp4'
            }, {
                name: 'Step 1 SLAPsummary',
                sref: 'statement.step1Summary',
                model: {
                    showVideoBlock: false,
                    showStaticTextBlock: false,
                    showFormBlock: false,
                    data: {
                        first: '0',
                        second: null,
                        third: '0',
                        fourth: null,
                        fifth: '0',
                        sixth: null,
                        businessName: null
                    }
                }
            },

            // Ideal client

            {
                name: 'Ideal Client Overview',
                sref: 'idealClient.overview',
                model: {
                    showVideoBlock: false,
                    showStaticTextBlock: false
                },
                videoUrl: 'http://content.jwplatform.com/videos/CygD9gob-CZ1S4g0I.mp4'
            }, {
                name: 'Client Survey',
                sref: 'idealClient.whoAreYouIdealClient',
                model: {
                    showVideoBlock: false,
                    showStaticTextBlock: false,
                    showIdealClientTextBlock: false,
                    data: {
                        clients: [],
                        idealClient: {}
                    }

                },
                videoUrl: 'http://content.jwplatform.com/videos/qwXWMsMb-CZ1S4g0I.mp4'
            }, {
                name: 'Your Ideal Client',
                sref: 'idealClient.defineYourIdealClient',
                model: {
                    showVideoBlock: false,
                    showStaticTextBlock: false,
                    showContent: false,
                    data: {
                        clients: [],
                        idealClient: {
                            name: '',
                            gender: '0',
                            age: '0',
                            maritalStatus: '0',
                            kids: '0',
                            employment: '0',
                            location: '0',
                            home: '0',
                            transit: '0',
                            hobbies: '0',
                            reads: '0',
                            number: 0
                        }
                    }
                },
                videoUrl: 'http://content.jwplatform.com/videos/O77KJaT0-CZ1S4g0I.mp4'
            }, {
                name: 'Name Your Ideal Client',
                sref: 'idealClient.nameYourIdealClient',
                model: {
                    showVideoBlock: false,
                    showStaticTextBlock: false,
                    showIdealClientNameBlock: false
                },
                videoUrl: 'http://content.jwplatform.com/videos/zQJXgx3h-CZ1S4g0I.mp4'
            }, {
                name: 'Ideal Client Q&A',
                sref: 'idealClient.qa',
                model: {
                    showVideoBlock: false,
                    showStaticTextBlock: false
                },
                videoUrl: ''
            }, {
                name: 'Review SLAPstatement',
                sref: 'idealClient.commitYourIdealClient',
                model: {
                    showVideoBlock: false,
                    showStaticTextBlock: false,
                    showContent: false
                },
                videoUrl: 'http://content.jwplatform.com/videos/HCUmRD4q-CZ1S4g0I.mp4'
            },
            {
                name: 'Step 2 SLAPsummary',
                sref: 'idealClient.step2Summary',
                model: {
                    showVideoBlock: false,
                    showStaticTextBlock: false,
                    showContent: false
                }
            },

            // 1 Year goal

            {
                name: '1 Year Goal Overview',
                sref: 'yearGoal.overview',
                model: {
                    showVideoBlock: false,
                    showStaticTextBlock: false,
                },
                videoUrl: 'http://content.jwplatform.com/videos/ISCjjlVS-CZ1S4g0I.mp4'
            }, {
                name: 'Personal Expenses',
                sref: 'yearGoal.personalExpenses',
                model: {
                    showVideoBlock: false,
                    showStaticTextBlock: false,
                    showContent: false,
                    data: {
                        expenses: [],
                        incidentals: '10.00',
                        expensesSum: 0
                    }
                },
                videoUrl: 'http://content.jwplatform.com/videos/5sTBE6zf-CZ1S4g0I.mp4'
            }, {
                name: 'Fixed Business Expenses',
                sref: 'yearGoal.fixedBusinessExpenses',
                model: {
                    showVideoBlock: false,
                    showStaticTextBlock: false,
                    showContent: false,
                    data: {
                        expenses: [],
                        incidentals: '10.00',
                        expensesSum: 0,
                        profit: '0.00'
                    }
                },
                videoUrl: 'http://content.jwplatform.com/videos/8xbUkKYq-CZ1S4g0I.mp4'
            }, {
                name: 'Your Breakeven Number',
                sref: 'yearGoal.totalFixedExpensesRevenue',
                model: {
                    showVideoBlock: false,
                    showStaticTextBlock: false,
                    showContent: false
                },
                videoUrl: 'http://content.jwplatform.com/videos/FsFRuOh7-CZ1S4g0I.mp4'
            }, {
                name: 'Revenue Streams',
                sref: 'yearGoal.revenueStreams',
                model: {
                    showVideoBlock: false,
                    showStaticTextBlock: false,
                    showContent: false,
                    data: {
                        revenues: [],
                        totalBreakdown: 0,
                    }
                },
                videoUrl: 'http://content.jwplatform.com/videos/yb345sel-CZ1S4g0I.mp4'
            }, {
                name: 'Selling Price',
                sref: 'yearGoal.sellingPrice',
                model: {
                    showVideoBlock: false,
                    showStaticTextBlock: false,
                    showContent: false,
                    data: {
                        revenues: [],
                        totalBreakdown: 0,
                    }
                },
                videoUrl: 'http://content.jwplatform.com/videos/h2bPHtf6-CZ1S4g0I.mp4'
            }, {
                name: 'Variable Expenses',
                sref: 'yearGoal.variableBusinessExpenses',
                model: {
                    showVideoBlock: false,
                    showStaticTextBlock: false,
                    showContent: false,
                    data: {
                        revenues: [],
                        totalBreakdown: 0,
                    }
                },
                videoUrl: 'http://content.jwplatform.com/videos/eyL9wraJ-CZ1S4g0I.mp4'
            }, {
                name: 'Your Profit Margin',
                sref: 'yearGoal.profitMargin',
                model: {
                    showVideoBlock: false,
                    showStaticTextBlock: false,
                    showContent: false,
                    data: {
                        revenues: [],
                        totalBreakdown: 0,
                    }
                },
                videoUrl: 'http://content.jwplatform.com/videos/KpFjzbaD-CZ1S4g0I.mp4'
            }, {
                name: 'Revenue Breakdown',
                sref: 'yearGoal.revenueBreakdown',
                model: {
                    showVideoBlock: false,
                    showStaticTextBlock: false,
                    showContent: false,
                    data: {
                        revenues: [],
                        totalBreakdown: 0,
                    }
                },
                videoUrl: 'http://content.jwplatform.com/videos/IXxhFFP6-CZ1S4g0I.mp4'
            }, {
                name: 'Your 1 Year Goal',
                sref: 'yearGoal.yourYearGoal',
                model: {
                    showVideoBlock: false,
                    showStaticTextBlock: false,
                    showContent: false,
                    data: {
                        revenues: [],
                        totalBreakdown: 0,
                    }
                },
                videoUrl: 'http://content.jwplatform.com/videos/KSSOKs53-CZ1S4g0I.mp4'
            }, {
                name: 'Review 1 Year Goal',
                sref: 'yearGoal.adjustYourYearGoal',
                model: {
                    showVideoBlock: false,
                    showStaticTextBlock: false,
                    showContent: false,
                    data: {
                        revenues: [],
                        totalBreakdown: 0,
                    }
                },
                videoUrl: 'http://content.jwplatform.com/videos/eD3sbZ21-CZ1S4g0I.mp4'
            }, {
                name: '1 Year Goal Q&A',
                sref: 'yearGoal.qa',
                model: {
                    showVideoBlock: false,
                    showStaticTextBlock: false
                },
                videoUrl: ''
            }, {
                name: 'Your 1 Year Goal',
                sref: 'yearGoal.commitYourYearGoal',
                model: {
                    showVideoBlock: false,
                    showStaticTextBlock: false,
                    showContent: false,
                    data: {
                        expenses: [],
                        incidentals: '1.00',
                        expensesSum: 0
                    }
                },
                videoUrl: 'http://content.jwplatform.com/videos/KSSOKs53-CZ1S4g0I.mp4'
            }, {
                name: 'Step 3 SLAPsummary',
                sref: 'yearGoal.step3Summary',
                model: {
                    showVideoBlock: false,
                    showStaticTextBlock: false,
                    showContent: false
                }
            }, 
            // Action plan

            {
                name: 'Action Plan Overview',
                sref: 'actionPlan.overview',
                model: {
                    showVideoBlock: false,
                    showStaticTextBlock: false
                },
                videoUrl: 'http://content.jwplatform.com/videos/rf1M1deM-CZ1S4g0I.mp4'
            }, {
                name: 'The World Around You',
                sref: 'actionPlan.worldAroundYou',
                model: {
                    showVideoBlock: false,
                    showStaticTextBlock: false,
                    showContent: false,
                    data: {
                        eventsByMonth: []
                    } 
                },
                videoUrl: 'http://content.jwplatform.com/videos/klwkQrRp-CZ1S4g0I.mp4'
            }, {
                name: 'Review Start Date',
                sref: 'actionPlan.doubleCheckStartDate',
                model: {
                    showVideoBlock: false,
                    showStaticTextBlock: false,
                    showContent: false,
                    data: {}
                },
                videoUrl: 'http://content.jwplatform.com/videos/C3RkptA5-CZ1S4g0I.mp4'
            }, {
                name: 'You and Your Ideal Client',
                sref: 'actionPlan.whatsHappening',
                model: {
                    showVideoBlock: false,
                    showStaticTextBlock: false,
                    showContent: false,
                    data: [
                        {
                            "impactClient" : "",
                            "impactBusiness" : ""
                        },
                        {
                            "impactClient" : "",
                            "impactBusiness" : ""
                        },
                        {
                            "impactClient" : "",
                            "impactBusiness" : ""
                        },
                        {
                            "impactClient" : "",
                            "impactBusiness" : ""
                        },
                    ]
                },
                videoUrl: 'http://content.jwplatform.com/videos/Lrif6we8-CZ1S4g0I.mp4'
            }, {
                name: 'Connecting Strategies',
                sref: 'actionPlan.rateConnectingStrategies',
                model: {
                    showVideoBlock: false,
                    showStaticTextBlock: false,
                    showContent: false,
                    data: []
                },
                videoUrl: 'http://content.jwplatform.com/videos/umhp2XDb-CZ1S4g0I.mp4'
            }, {
                name: 'Quarterly Strategy',
                sref: 'actionPlan.connectingStrategyStrategizing',
                model: {
                    showVideoBlock: false,
                    showStaticTextBlock: false,
                    showContent: false,
                    data: [
                        {}, {}, {}, {}
                    ]
                },
                videoUrl: 'http://content.jwplatform.com/videos/KSCYJtkl-CZ1S4g0I.mp4'
            }, {
                name: 'Action Items',   
                sref: 'actionPlan.actionItems',
                model: {
                    showVideoBlock: false,
                    showStaticTextBlock: false,
                    showContent: false,
                    data: [
                        {}, {}, {}, {}
                    ]
                },
                videoUrl: 'http://content.jwplatform.com/videos/fcc9gCgr-CZ1S4g0I.mp4'
            }, {
                name: 'Quarterly Goals',
                sref: 'actionPlan.quarterlyGoals',
                model: {
                    showVideoBlock: false,
                    showStaticTextBlock: false,
                    showContent: false,
                    data: [
                        {}, {}, {}, {}
                    ]
                },
                videoUrl: 'http://content.jwplatform.com/videos/BqI3YV3P-CZ1S4g0I.mp4'
            }, {
                name: 'Your 1 Year Goal',
                sref: 'actionPlan.doubleCheckYearGoal',
                model: {
                    showVideoBlock: false,
                    showStaticTextBlock: false,
                    showContent: false,
                    data: []
                },
                videoUrl: 'http://content.jwplatform.com/videos/UzlDZdPs-CZ1S4g0I.mp4'
            }, {
                name: 'Action Plan Q&A',
                sref: 'actionPlan.qa',
                model: {
                    showVideoBlock: false,
                    showStaticTextBlock: false
                },
                videoUrl: ''
            }, {
                name: 'Review Action Plan',
                sref: 'actionPlan.commitToYourActionPlan',
                model: {
                    showVideoBlock: false,
                    showStaticTextBlock: false,
                    showContent: false,
                    data: []
                },
                videoUrl: ''
            }, {
                name: 'Step 4 SLAPsummary',
                sref: 'actionPlan.step4Summary',
                model: {
                    showVideoBlock: false,
                    showStaticTextBlock: false,
                    showContent: false
                },
                videoUrl: ''
            }, //{
            //     name: 'Second SLAPexpert Review',
            //     sref: 'actionPlan.secondExpertReview',
            //     model: {
            //         showVideoBlock: false,
            //         showStaticTextBlock: false,
            //         showContent: false
            //     }
            // },

            // Execute

            {
                name: 'The 3 SLAPhabits',
                sref: 'execute.livingDayToDay',
                model: {
                    showVideoBlock: false,
                    showStaticTextBlock: false
                },
                videoUrl: 'http://content.jwplatform.com/videos/9ta9DJT7-CZ1S4g0I.mp4'
            },/* {
                name: 'Commit to Yourself',
                sref: 'execute.commitYourSelf',
                model: {
                    showVideoBlock: false,
                    showStaticTextBlock: false
                }
            },*//* {
                name: 'Set Yourself Up For Success',
                sref: 'execute.setYourselfUpForSuccess',
                model: {
                    showVideoBlock: false,
                    showStaticTextBlock: false
                }
            },*/ {
                name: 'Time to Execute',
                sref: 'execute.tourExecute',
                model: {
                    showVideoBlock: false,
                    showStaticTextBlock: false
                },
                videoUrl: 'http://content.jwplatform.com/videos/qdS3FcAu-CZ1S4g0I.mp4'
            }];

        var finishedSteps = [];


        // temporary crutch
        // _.forEach(steps, function (value, key) {
        //     finishedSteps.push(key);
        // });


        var activeStepIndex = null;
        var activeStep = null;
        var prevStep = null;
        var nextStep = null;
        var requestApi = false;
        var stepIndex = null;

        this.getActiveStep = getActiveStep;
        this.getNextAndPrevStep = getNextAndPrevStep;
        this.setFinishActiveStep = setFinishActiveStep;
        this.updateActiveModel = updateActiveModel;
        this.getAllSteps = getAllSteps;
        this.resolveActiveStep = resolveActiveStep;
        this.getLastFinished = getLastFinished;
        this.setRequestApiFlag = setRequestApiFlag;
        this.getAllUserData = getAllUserData
        this.getAllStepDataByUser = getAllStepDataByUser;
        
        this.checkStepsIsFinishedSection = checkStepsIsFinishedSection;

        this.sendApiData = sendApiData;
        this.getApiData = getApiData;
        this.mySlapStateForButton = 'Excute';

        ///////////////////////////////

        function sendApiData(url, data) {
            return apiService.rest.all(url).post({
                data: data, finishedSteps: finishedSteps
            });
        }

        function getApiData(url) {
            return apiService
                .rest
                .one(url)
                .get();
        }

        function getLastFinished(hidePopUp) {
            return $q(function (resolve) {
                if (finishedSteps.length == 0) {
                    return resolve({sref: "mindset.ourCommitment"});
                } else if (finishedSteps.length >= steps.length) {
                    return resolve({sref: "slapExcute.main"});
                } else {
                    var lastSteps = finishedSteps[finishedSteps.length - 1];
                    if (!hidePopUp){
                        toaster.pop({ type: 'error', body: "You must build your SLAP in order! Once you have completed a page you can go back, but you cannot jump ahead" });
                    }   
                    return resolve(steps[lastSteps]);
                }
            });
        }
        
        function getAllUserData() {
           return getFinishedStepsAPI()
            .then(function (response) {
                return response.data;
            });
        }

        function resolveActiveStep(state) {

            return $q(function (resolve, reject) {
                return _initApiData()
                    .then(function () {
                        var step = getStateStep(state);
                        var prev = getPrevStep(stepIndex);
                        var next = getNextStep(stepIndex);

                        if (!prev) {
                            activeStep = step;
                            activeStepIndex = stepIndex;
                            prevStep = prev;
                            nextStep = next;
                            return resolve(activeStep);
                        }

                        if (prev && isFinished(stepIndex - 1)) {
                            activeStep = step;
                            activeStepIndex = stepIndex;
                            prevStep = prev;
                            nextStep = next;
                            return resolve(activeStep);
                        }

                        return resolve(null);
                    })
                    .catch(reject);
            });
        }

        function getStateStep(state) {
            return steps.find(function (step, index) {
                if (step.sref === state.self.name) {
                    stepIndex = index;

                    return true;
                }

                return false;
            })
        }

        function _initApiData() {
            var deferred = $q.defer();

            if (finishedSteps.length === 0 || !requestApi) {
                requestApi = !requestApi;
                return getFinishedStepsAPI()
                    .then(function (response) {
                        if (response.data) {
                            finishedSteps = response.data.steps.finishedSteps.map(function(step){ return parseInt(step); });
                            _setDataStepModel(response.data);
                        }
                    })
                    .catch(function (err) {
                        return err;
                    })
            }

            deferred.resolve();

            return deferred.promise;
        }

        function _setDataStepModel(data) {
            if (data.slapMindset) {
                for (var key in data.slapMindset) {
                    var sref = 'mindset.' + key;
                    var step = steps.find(function (item) {
                        return item.sref === sref;
                    });

                    if(step) {
                        if (Array.isArray(data.slapMindset[key]) && data.slapMindset[key].length <= 0) {
                            step.model.data = null;
                        } else {
                            step.model.data = data.slapMindset[key];
                        }
                    }
                }
            }

            if(data.statement) {
                for (var key in data.statement) {
                    var sref = 'statement.' + key;
                    var step = steps.find(function (item) {
                        return item.sref === sref;
                    });

                    if(step) {
                        if (Array.isArray(data.statement[key]) && data.statement[key].length <= 0) {
                            step.model.data = null;
                        }
                        step.model.data = data.statement[key];
                    }
                }
            }

            if(data.idealClient) {
                for (var key in data.idealClient) {
                    var sref = 'idealClient.' + key;
                    var step = steps.find(function (item) {
                        return item.sref === sref;
                    });

                    if(step) {
                        if (Array.isArray(data.idealClient[key]) && data.idealClient[key].length === 0) {
                            step.model.data = null;
                        }
                        step.model.data = data.idealClient[key];
                    }
                }
            }


            if(data.yearGoal) {
                for (var key in data.yearGoal) {
                    var sref = 'yearGoal.' + key;
                    var step = steps.find(function (item) {
                        return item.sref === sref;
                    });

                    if(step) {
                        if (Array.isArray(data.yearGoal[key]) && data.yearGoal[key].length === 0) {
                            step.model.data = null;
                        }
                        step.model.data = data.yearGoal[key];
                    }
                }
            }


            if(data.actionPlan) {
                for (var key in data.actionPlan) {
                    var sref = 'actionPlan.' + key;
                    var step = steps.find(function (item) {
                        return item.sref === sref;
                    });

                    if(step) {
                        if (Array.isArray(data.actionPlan[key]) && data.actionPlan[key].length === 0) {
                            step.model.data = null;
                        }
                        step.model.data = data.actionPlan[key];
                    }
                }
            }
        }

        function isFinished(index) {
            return finishedSteps.indexOf(index) === -1 ? false : true;
        }

        function getActiveStep() {
            return activeStep;
        }

        function getNextAndPrevStep() {
            return {
                prevStep: prevStep,
                nextStep: nextStep
            }
        }

        function updateActiveModel(data) {
            for (var prop in data) {
                if (data.hasOwnProperty(prop) && activeStep.model.hasOwnProperty(prop)) {
                    activeStep.model[prop] = data[prop];
                }
            }
        }

        function setFinishActiveStep() {
            if (finishedSteps.indexOf(activeStepIndex) === -1) {
                finishedSteps.push(activeStepIndex);
                return true; // This means that the activeStep is new and should make activity
            } 
            return false;
        }

        function getAllSteps() {
            return steps;
        }

        function getFinishedStepsAPI() {
            return apiService.rest.one('getFinishedUserStep').get();
        }

        function getPrevStep(index) {
            if (index > 0) {
                return steps[index - 1];
            }
            return null;
        }

        function getNextStep(index) {
            if (index < steps.length - 1) {
                return steps[index + 1];
            }

            return null;
        }

        function checkStepsIsFinishedSection(stepsGroup, prevNameStep) {
            if (stepsGroup[stepsGroup.length - 1].sref === prevNameStep) return true;

            var lastStepGroupIndex = steps.findIndex(function (item) {
                return item.sref === stepsGroup[stepsGroup.length - 1].sref; //TODO:bottleneck
            });

            return finishedSteps.find(function (item) {
                return item === lastStepGroupIndex;
            })
        }

        function setRequestApiFlag(){
            requestApi = false;
        }

        function getAllStepDataByUser(user_id) {
            return apiService.rest.all('getFinishedUserStep').one(user_id).get();
        }



    }
}());