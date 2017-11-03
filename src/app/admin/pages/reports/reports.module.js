(function() {
    'use strict';

    angular
        .module('adminapp.pages.reports', [
            'reports.financialTracker.module',
            'reports.reportBuilder.module',
            'reports.archivedAccounts.module',
            'reports.partnerReports.module',
            'reports.SLAPexpertReports.module'
        ]);
}());