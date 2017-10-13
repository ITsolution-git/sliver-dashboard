(function() {
    'use strict';

    angular
        .module('app.services')
        .service('mindsetService', mindsetService);

    function mindsetService() {
        var _sliders = [
            {
                name: 'I totally understand that accepting structure and accountability is necessary to succeed',
                left: 'I don\'t really think I need help',
                right: 'Please! I am so ready!',
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
                name: 'I will ask for help when I need it',
                left: 'Asking for help is really hard for me',
                right: 'I will ask for help!',
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
                name: 'I will show up for my SLAPexpert and SLAPmanager calls',
                left: 'I have a hard time sticking to routine',
                right: 'You can count on me',
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
                name: 'I will use SLAPschool and SLAPworld',
                left: 'Maybe',
                right: 'I am so excited to connect with the community and resources!',
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
                name: 'I will login to SLAPcenter a minimum of once a week and update my Actions and Results',
                left: 'Probably not',
                right: 'You bet!',
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

        var _stuckSliders = [
            {
                name: 'I know I am in charge of my business success',
                left: 'I am a victim of my circumstance',
                right: 'I take ownership of my reality',
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
                name: 'I ensure my daily time is spent on activities getting me results',
                left: 'I am so busy I don\'t have time to think',
                right: 'I am completely strategic',
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
                right: 'I am always a step ahead',
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
                name: 'I say no more than I say yes',
                left: 'I say Yes ALL the time',
                right: 'I say No ALL the time',
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
                left: 'I honestly don\'t know how I spend all my time and money',
                right: 'I have a time and money budget!',
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