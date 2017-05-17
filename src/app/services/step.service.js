(function () {
    'use strict';

    angular
        .module('app.services')
        .service('stepService', stepService);

    function stepService(apiService, $q) {
        var steps = [
            {
                name: 'Our Commitment To You',
                sref: 'mindset.ourCommitment',
                model: {
                    showInfoBlock: false,
                    showVideoBlock: false,
                    showStaticTextBlock: false
                }
            }, {
                name: 'Your Commitment to Us',
                sref: 'mindset.yourCommitment',
                model: {
                    showInfoBlock: false,
                    showVideoBlock: false,
                    showStaticTextBlock: false,
                    sliders: null
                }
            }, {
                name: 'Get the SLAPmindset',
                sref: 'mindset.slapMindset',
                model: {
                    showInfoBlock: false,
                    showVideoBlock: false,
                    showStaticTextBlock: false
                }
            }, {
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
                }
            }, {
                name: 'Are You Stuck?',
                sref: 'mindset.areYourStuck',
                model: {
                    showInfoBlock: false,
                    showVideoBlock: false,
                    showStaticTextBlock: false,
                    sliders: null
                }
            }, {
                name: 'Cashflow / Capacity Cath 22',
                sref: 'mindset.cashFlow',
                model: {
                    showInfoBlock: false,
                    showVideoBlock: false,
                    showStaticTextBlock: false
                }
            }, {
                name: 'Your Business With / Without A SLAP',
                sref: 'mindset.yourBusiness',
                model: {
                    showInfoBlock: false,
                    showVideoBlock: false,
                    showStaticTextBlock: false
                }
            }, {
                name: 'Top Down, Bottom Up',
                sref: 'mindset.topDownBottomUp',
                model: {
                    showInfoBlock: false,
                    showVideoBlock: false,
                    showStaticTextBlock: false
                }
            }, {
                name: 'Start SLAP\'n!',
                sref: 'mindset.startSlapn',
                model: {
                    showInfoBlock: false,
                    showVideoBlock: false,
                    showStaticTextBlock: false
                }
            }, {
                name: 'Your SLAP Start Date',
                sref: 'mindset.slapStartDate',
                model: {
                    data: {
                        year: null,
                        month: null
                    },
                    showVideoBlock: false,
                    showStaticTextBlock: false,
                    showStartDate: false
                }
            }, {
                name: 'SLAPstatement Overview',
                sref: 'statement.overview'
            }, {
                name: 'Your SLAPstatement',
                sref: 'statement.yourStatement'
            }, {
                name: 'SLAPstatement Q&A',
                sref: 'statement.qa'
            }, {
                name: 'Commit To Your SLAPStatement',
                sref: 'statement.commitToYour'
            }, {
                name: 'Step 1 SLAPsummary',
                sref: 'statement.step1Summary'
            }, {
                name: '1 Year Goal Overview',
                sref: 'yearGoal.overview'
            }, {
                name: 'Personal Expenses',
                sref: 'yearGoal.personalExpenses'
            }, {
                name: 'Fixed Business Expenses',
                sref: 'yearGoal.fixedBusinessExpenses'
            }, {
                name: 'Total Fixed Expenses Revenue',
                sref: 'yearGoal.totalFixedExpensesRevenue'
            }, {
                name: 'Selling Price',
                sref: 'yearGoal.sellingPrice'
            }, {
                name: 'Variable Business Expenses',
                sref: 'yearGoal.variableBusinessExpenses'
            }, {
                name: 'Profit Margin',
                sref: 'yearGoal.profitMargin'
            }, {
                name: 'Revenue Breakdown',
                sref: 'yearGoal.revenueBreakdown'
            }, {
                name: 'Your 1 Year Goal',
                sref: 'yearGoal.yourYearGoal'
            }, {
                name: 'Adjust your 1 Year Goal',
                sref: 'yearGoal.adjustYourYearGoal'
            }, {
                name: '1 Year Goal Q&A',
                sref: 'yearGoal.qa'
            }, {
                name: 'Commit To Your 1 Year Goal',
                sref: 'yearGoal.commitYourYearGoal'
            }, {
                name: 'Step 2 SLAPsummary',
                sref: 'yearGoal.step2Summary'
            }, {
                name: 'First SLAPexpert Review',
                sref: 'yearGoal.firstExpertReview'
            }, {
                name: 'Ideal Client Overview',
                sref: 'idealClient.overview'
            }, {
                name: 'Who Are Your Ideal Clients?',
                sref: 'idealClient.whoAreYouIdealClient'
            }, {
                name: 'Define Your Ideal Client',
                sref: 'idealClient.defineYourIdealClient'
            }, {
                name: 'Name Your Ideal Client',
                sref: 'idealClient.nameYourIdealClient'
            }, {
                name: 'Ideal Client Q&A',
                sref: 'idealClient.qa'
            }, {
                name: 'Commit To Your Ideal Client',
                sref: 'idealClient.commitYourIdealClient'
            },
            // {
            //     name: 'Double Check',
            //     sref: 'idealClient.doubleCheck'
            // },
            // {
            //     name: 'SLAPstatement',
            //     sref: 'idealClient.slapStatement'
            // },
            {
                name: 'Step 3 SLAPsummary',
                sref: 'idealClient.step3Summary'
            }, {
                name: 'Action Plan Overview',
                sref: 'actionPlan.overview'
            }, {
                name: 'The World Around You',
                sref: 'actionPlan.worldAroundYou'
            }, {
                name: 'Double Check Start Date',
                sref: 'actionPlan.doubleCheckStartDate'
            }, {
                name: 'What\'s Happening in Q1-Q4',
                sref: 'actionPlan.whatsHappening'
            }, {
                name: 'Rate the 10 Connecting Strategies',
                sref: 'actionPlan.rateConnectingStrategies'
            }, {
                name: 'Choose Your Connecting Strategies',
                sref: 'actionPlan.chooseYourConnectingStrategies'
            }, {
                name: 'Connecting Strategy Strategizing',
                sref: 'actionPlan.connectingStrategyStrategizing'
            }, {
                name: 'Action Items',
                sref: 'actionPlan.actionItems'
            }, {
                name: 'Action Plan Review',
                sref: 'actionPlan.actionPlanReview'
            }, {
                name: 'Quarterly Goals',
                sref: 'actionPlan.quarterlyGoals'
            }, {
                name: 'Double Check 1 Year Goal',
                sref: 'actionPlan.doubleCheckYearGoal'
            }, {
                name: 'Action Plan Q&A',
                sref: 'actionPlan.qa'
            }, {
                name: 'Commit To Your Action Plan',
                sref: 'actionPlan.commitYourActionPlan'
            }, {
                name: 'Step 4 SLAPsummary',
                sref: 'actionPlan.step4Summary'
            }, {
                name: 'Second SLAPexpert Review',
                sref: 'actionPlan.secondExpertReview'
            }, {
                name: 'Living SLAP Day-to-Day',
                sref: 'execute.livingDayToDay'
            }, {
                name: 'Commit to Yourself',
                sref: 'execute.commitYourSelf'
            }, {
                name: 'Set Yourself Up For Success',
                sref: 'execute.setYourselfUpForSuccess'
            }, {
                name: 'Tour of SLAPcenter - Execute',
                sref: 'execute.tourExecute'
            }];

        var finishedSteps = [];

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

        this.sendApiData = sendApiData;
        this.getApiData = getApiData;

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

        function getLastFinished() {
            return $q(function (resolve) {
                if (finishedSteps.length <= 0) {
                    return resolve(steps[0]);
                } else {
                    var lastSteps = finishedSteps[finishedSteps.length - 1];
                    return resolve(steps[lastSteps]);
                }
            });
        }

        function resolveActiveStep(state) {

            return $q(function (resolve, reject) {
                return initApiData()
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

        function initApiData() {
            var deferred = $q.defer();

            if (finishedSteps.length <= 0 && !requestApi) {
                requestApi = !requestApi;
                return getFinishedStepsAPI()
                    .then(function (response) {
                        console.log(response);
                        if (response.data.finishedSteps.length > 0) {
                            finishedSteps = response.data.finishedSteps;
                        }
                    })
                    .catch(function (err) {
                        return err;
                    })
            }

            deferred.resolve();

            return deferred.promise;
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
            }
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
    }
}());