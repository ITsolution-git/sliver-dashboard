(function() {
    'use strict';

    angular
        .module('app.services')
        .service('actionplanService', actionplanService);

    function actionplanService() {
        var _defaultActionItems = [
            {
                strategyId: 1,
                actions: [
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Connect Prep Month1-1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Connect Prep Month1-2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Connect Prep Month1-3'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Connect Prep Month2-1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Connect Prep Month2-2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Connect Prep Month2-3'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Connect Prep Month3-1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Connect Prep Month3-2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Connect Prep Month3-3'}
                    ],

                ] 

            },
            {
                strategyId: 2,
                actions: [
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Referrals Month1-1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Referrals Month1-2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Referrals Month1-3'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Referrals Month1-1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Referrals Month1-2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Referrals Month1-3'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Referrals Month1-1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Referrals Month1-2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Referrals Month1-3'}
                    ],

                ] 

            },
            {
                strategyId: 3,
                actions: [
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Partnerships Month1-1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Partnerships Month1-2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Partnerships Month1-3'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Partnerships Month2-1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Partnerships Month2-2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Partnerships Month2-3'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Partnerships Month3-1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Partnerships Month3-2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Partnerships Month3-3'}
                    ],

                ] 

            },
            {
                strategyId: 4,
                actions: [
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Hit List Month1-1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Hit List Month1-2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Hit List Month1-3'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Hit List Month1-1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Hit List Month1-2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Hit List Month1-3'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Hit List Month1-1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Hit List Month1-2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Hit List Month1-3'}
                    ],

                ] 

            },
            {
                strategyId: 5,
                actions: [
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Events Month1-1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Events Month1-2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Events Month1-3'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Events Month1-1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Events Month1-2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Events Month1-3'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Events Month1-1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Events Month1-2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Events Month1-3'}
                    ],

                ] 

            },
            {
                strategyId: 6,
                actions: [
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Media Month1-1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Media Month1-2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Media Month1-3'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Media Month1-1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Media Month1-2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Media Month1-3'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Media Month1-1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Media Month1-2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Media Month1-3'}
                    ],

                ] 

            },
            {
                strategyId: 7,
                actions: [
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Sepcial Deals Month1-1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Sepcial Deals Month1-2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Sepcial Deals Month1-3'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Sepcial Deals Month1-1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Sepcial Deals Month1-2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Sepcial Deals Month1-3'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Sepcial Deals Month1-1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Sepcial Deals Month1-2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Sepcial Deals Month1-3'}
                    ],

                ] 

            },
            {
                strategyId: 8,
                actions: [
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Online Connecting Month1-1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Online Connecting Month1-2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Online Connecting Month1-3'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Online Connecting Month1-1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Online Connecting Month1-2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Online Connecting Month1-3'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Online Connecting Month1-1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Online Connecting Month1-2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Online Connecting Month1-3'}
                    ],

                ] 

            },
            {
                strategyId: 9,
                actions: [
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Loyality Month1-1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Loyality Month1-2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Loyality Month1-3'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Loyality Month1-1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Loyality Month1-2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Loyality Month1-3'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Loyality Month1-1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Loyality Month1-2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Loyality Month1-3'}
                    ],

                ] 

            },
            {
                strategyId: 10,
                actions: [
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'SLAPnap Month1-1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'SLAPnap Month1-2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'SLAPnap Month1-3'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'SLAPnap Month2-1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'SLAPnap Month2-2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'SLAPnap Month2-3'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'SLAPnap Month3-1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'SLAPnap Month3-2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'SLAPnap Month3-3'}
                    ],

                ] 

            },
        ]
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
        this.getNthQuater = getNthQuater;
        this.getDefaultConnectingStrategies = getDefaultConnectingStrategies;
        this.calculateTopStrategies = calculateTopStrategies;
        this.getDefaultActionsByStrategy = getDefaultActionsByStrategy;

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

        function getNthQuater(startDate, indexQut) {
            var months = [];
            months.push((+startDate.month + 3 * (indexQut - 1) - 1) % 12);
            months.push((+startDate.month + 3 * (indexQut - 1)) % 12);
            months.push((+startDate.month + 3 * (indexQut - 1) + 1) % 12);

            var startQuater = moment({year: startDate.year + ((+startDate.month + 3 * (indexQut - 1) - 1) / 12), month:months[0], day: 1 });
            var endQuater = moment({year: startDate.year + ((+startDate.month + 3 * (indexQut - 1) + 1) / 12), month:months[2], day: 1 }).endOf('month');
            return {
                months: months,
                start: startQuater,
                end: endQuater,
                nth: indexQut
            };
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

        function getDefaultActionsByStrategy(id) {
            var itemMonth = _.find(_defaultActionItems, {strategyId: id});
            return itemMonth;
        }
    }
}());