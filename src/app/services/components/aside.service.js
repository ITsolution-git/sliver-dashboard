(function () {
    'use strict';

    angular
        .module('app.services')
        .service('asideService', asideService);

    /* @ngInject */
    function asideService() {
        var slapMindset = [
            {
                name: 'Our Commitment To You',
                sref: 'mindset.ourCommitment'
            }, {
                name: 'Your Commitment to Us',
                sref: 'mindset.yourCommitment'
            }, {
                name: 'Get the SLAPmindset',
                sref: 'mindset.slapMindset'
            }, {
                name: 'Privilege and Responsibility',
                sref: 'mindset.privilegeAndResponsibility'
            }, {
                name: 'Are You Stuck?',
                sref: 'mindset.areYourStuck'
            }, {
                name: 'Cashflow / Capacity Cath 22',
                sref: 'mindset.cashFlow'
            }, {
                name: 'Your Business With / Without A SLAP',
                sref: 'mindset.yourBusiness'
            }, {
                name: 'Top Down, Bottom Up',
                sref: 'mindset.topDownBottomUp'
            }, {
                name: 'Start SLAP\'n!',
                sref: 'mindset.startSlapn'
            }, {
                name: 'Your SLAP Start Date',
                sref: 'mindset.slapStartDate'
            }
        ];

        var slapStatement = [
            {
                name: 'SLAPstatement Overview',
                sref: 'statement.overview'
            }, {
                name: 'Your SLAPstatement',
                sref: 'statement.your'
            }, {
                name: 'SLAPstatement Q&A',
                sref: 'statement.qa'
            }, {
                name: 'Commit To Your',
                sref: 'statement.commitToYour'
            }, {
                name: 'SLAPStatement',
                sref: 'statement.statement'
            }, {
                name: 'Step 1 SLAPsummary',
                sref: 'statement.step1Summary'
            }
        ];

        var yearGoals = [
            {
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
            }
        ];

        var idealClients = [
            {
                name: 'Ideal Client Overview',
                sref: 'idealClient.overview'
            }, {
                name: 'Who Are Your Ideal Clients?',
                sref: 'idealClient.whoAreYourIdealClients'
            },{
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
            }, {
                name: 'Double Check',
                sref: 'idealClient.doubleCheck'
            }, {
                name: 'SLAPstatement',
                sref: 'idealClient.slapStatement'
            }, {
                name: 'Step 3 SLAPsummary',
                sref: 'idealClient.step3Summary'
            }
        ];

        var actionPlans = [
            {
                name: 'Action Plan Overview',
                sref: 'actionPlan.overview'
            }, {
                name: 'The World Around You',
                sref: 'actionPlan.worldAroundYou'
            },{
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
            }
        ];

        var execute = [];

        this.getAll = getAll;

        ////////////////////////
        function getAll() {
            return {
                slapStatement: slapStatement,
                slapMindset: slapMindset,
                yearGoals: yearGoals,
                idealClients: idealClients,
                actionPlans: actionPlans,
                execute: execute
            };
        }
    }
}());