(function() {
    'use strict';

    angular
        .module('adminapp.pages.reports', [
            'reports.financialTracker.module',
            'reports.reportBuilder.module'
        ]);
}());