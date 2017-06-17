(function() {
    'use strict';

    angular
        .module('app.services')
        .service('actionplanService', actionplanService);

    function actionplanService() {
        var _defaultEvents = [
            {
                events: [
                    {name:'New Year\'s Day'},
                    {name:'King Day'},
                ],
                actionItems: [

                ]
            },
            {
                events: [
                    {name:'Valentine\'s Day'},
                    {name:'Family Day in Canada'},
                ],
                actionItems: [
                    
                ]
            },
            {
                events: [
                    {name:'Spring Break'}
                ],
                actionItems: [
                    
                ]
            },
            {
                events: [
                    {name:'US tax deadline'}
                ]
            },
            {
                events: [
                    {name:'May long weekend'},
                ],
                actionItems: [
                    
                ]
            },
            {
                events: [
                    {name:'Father\'s day'},
                    {name:'School Break'},
                ],
                actionItems: [
                    
                ]
            },
            {
                events: [
                    {name:'4th of July in US'}
                ],
                actionItems: [
                    
                ]
            },
            {
                events: [
                    {name:'School Starts'}
                ],
                actionItems: [
                    
                ]
            },
            {
                events: [
                    {name:'Holidays'}
                ],
                actionItems: [
                    
                ]
            },
            {
                events: [
                    {name:'Halloween'}
                ]
            },
            {
                events: [
                    {name:'US thanksgiving'}
                ],
                actionItems: [
                    
                ]
            },
            {
                events: [
                    {name:'Christmas'}
                ],
                actionItems: [
                    
                ]
            }
        ];
        var _defaultConnectingStrategies = [
            {id: 1, name: 'Connect Prep', video:'http://media.w3.org/2016/01/Emmy-Award.mp4', rating: 0, reason:''},
            {id: 2, name: 'Referrals', video:'http://media.w3.org/2016/01/Emmy-Award.mp4', rating: 0, reason:''},
            {id: 3, name: 'Partnerships', video:'http://media.w3.org/2016/01/Emmy-Award.mp4', rating: 0, reason:''},
            {id: 4, name: 'Hit List', video:'http://media.w3.org/2016/01/Emmy-Award.mp4', rating: 0, reason:''},
            {id: 5, name: 'Events', video:'http://media.w3.org/2016/01/Emmy-Award.mp4', rating: 0, reason:''},
            {id: 6, name: 'Media', video:'http://media.w3.org/2016/01/Emmy-Award.mp4', rating: 0, reason:''},
            {id: 7, name: 'Sepcial Deals', video:'http://media.w3.org/2016/01/Emmy-Award.mp4', rating: 0, reason:''},
            {id: 8, name: 'Online Connecting', video:'http://media.w3.org/2016/01/Emmy-Award.mp4', rating: 0, reason:''},
            {id: 9, name: 'Loyality', video:'http://media.w3.org/2016/01/Emmy-Award.mp4', rating: 0, reason:''},
            {id: 10, name: 'SLAPnap', video:'http://media.w3.org/2016/01/Emmy-Award.mp4', rating: 0, reason:''},
        ];

        var _monthLongNames = ["January", "February", "March", "April", "May","June", "July", "August", "September", "October","November", "December"]
        this.getDefaultEvents = getDefaultEvents;
        this.getMonthLongNames = getMonthLongNames;
        this.getNthQuaterMonths = getNthQuaterMonths;
        this.getDefaultConnectingStrategies = getDefaultConnectingStrategies;
        this.calculateTopStrategies = calculateTopStrategies;

        ////////////////////////////

        function getDefaultEvents() {
            return _defaultEvents;
        }

        function getMonthLongNames() {
            return  _monthLongNames;
        }

        function getNthQuaterMonths(startMonth, indexQut) {
            var months = [];
            months.push((+startMonth + 3 * (indexQut - 1) - 1) % 12);
            months.push((+startMonth + 3 * (indexQut - 1)) % 12);
            months.push((+startMonth + 3 * (indexQut - 1) + 1) % 12);
            return months;
        }

        function getDefaultConnectingStrategies() {
            return _defaultConnectingStrategies;
        }

        function calculateTopStrategies(stratigies){
            var topRated = [];
            for (var i = 5; i >= 0; i --) {
                var rated = _.filter(stratigies, {rating: i});
                if (rated.length != 0)
                    topRated = topRated.concat(rated);

                if ( topRated.length >= 4 )
                    break;
            }
            return topRated;
        }
    }
}());