(function() {
    'use strict';

    angular
        .module('app.services')
        .service('mindsetService', mindsetService);

    function mindsetService(apiService) {
        var _sliders = [
            {
                name: 'I Know I Am In Charge Of My Bussiness Success',
                left: 'i am a victim of circumstance',
                right: 'i am SO IN CHARGE!!',
                value: 0,
                options: {
                    floor: -5,
                    ceil: 5,
                    showSelectionBarFromValue: 0,
                    showTicks: true,
                    hidePointerLabels: true,
                    hideLimitLabels: true
                }
            },{
                name: 'every day i evaluate my Actions to see if they are gettin my results',
                left: 'What/My actions = my results?',
                right: 'I know exactly what to do',
                value: 0,
                options: {
                    floor: -5,
                    ceil: 5,
                    showSelectionBarFromValue: 0,
                    showTicks: true,
                    hidePointerLabels: true,
                    hideLimitLabels: true
                }
            },{
                name: 'I am proactive, not reactive',
                left: 'I can never catch my breath',
                right: 'I run my day and my life',
                value: 0,
                options: {
                    floor: -5,
                    ceil: 5,
                    showSelectionBarFromValue: 0,
                    showTicks: true,
                    hidePointerLabels: true,
                    hideLimitLabels: true
                }
            },{
                name: 'I say no more then I say yes.',
                left: 'What does no mean?',
                right: 'No is my favorite word!',
                value: 0,
                options: {
                    floor: -5,
                    ceil: 5,
                    showSelectionBarFromValue: 0,
                    showTicks: true,
                    hidePointerLabels: true,
                    hideLimitLabels: true
                }
            },{
                name: 'I spend my time and money well',
                left: 'I don\'t even know how I spend my time and money',
                right: 'Go it!',
                value: 0,
                options: {
                    floor: -5,
                    ceil: 5,
                    showSelectionBarFromValue: 0,
                    showTicks: true,
                    hidePointerLabels: true,
                    hideLimitLabels: true
                }
            }
        ];

        var _stuckSliders = null;

        this.getSliders = getSliders;
        this.getStuckSliders = getStuckSliders;

        ////////////////////////////

        function getSliders() {
            return _sliders;
        }

        function getStuckSliders() {
            return  _stuckSliders;
        }
    }
}());