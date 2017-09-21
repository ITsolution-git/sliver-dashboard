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
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Special Deals Month1-1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Special Deals Month1-2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Special Deals Month1-3'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Special Deals Month1-1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Special Deals Month1-2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Special Deals Month1-3'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Special Deals Month1-1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Special Deals Month1-2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Special Deals Month1-3'}
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
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Loyalty Month1-1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Loyalty Month1-2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Loyalty Month1-3'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Loyalty Month1-1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Loyalty Month1-2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Loyalty Month1-3'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Loyalty Month1-1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Loyalty Month1-2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Loyalty Month1-3'}
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
                    {name:'Martin Luther King Day (US)'},
                    {name:'International Party at Work Day'},
                ],
                actionItems: [

                ]
            },
            {
                events: [
                    {name:'Valentine\'s Day'},
                    {name:'Family Day in Canada'},
                    {name:'Black History Month'},
                ],
                actionItems: [
                    
                ]
            },
            {
                events: [
                    {name:'International Women\'s Day'},
                    {name:'Earth Hour'},
                ],
                actionItems: [
                    
                ]
            },
            {
                events: [
                    {name:'April Fool\'s!'},
                    {name:'Season\'s Change'},
                    {name:'Tax Day  (US)'},
                    {name:'Easter & Passover'},
                ]
            },
            {
                events: [
                    {name:'Mother\'s Day'},
                    {name:'Ramadan'},
                ],
                actionItems: [
                    
                ]
            },
            {
                events: [
                    {name:'Father\'s day'}
                ],
                actionItems: [
                    
                ]
            },
            {
                events: [
                    {name:'International Day of Friendship'},
                    {name:'Independence Day (US)'}, 
                    {name:'Canada Day (Canada)'},
                ],
                actionItems: [
                    
                ]
            },
            {
                events: [
                    {name:'Vacation season'}
                ],
                actionItems: [
                    
                ]
            },
            {
                events: [
                    {name:'Season\'s Change'},
                    {name:'Back to School'},
                    {name:'Rosh Hashanah and Yom Kippur'},
                ],
                actionItems: [
                    
                ]
            },
            {
                events: [
                    {name:'Breast Cancer Awareness Month'},
                    {name:'Thanksgiving (Canada)'},
                    {name:'Diwali'},
                    {name:'Halloween'},
                    {name:'Sukkot'},
                ]
            },
            {
                events: [
                    {name:'Thanksgiving (US)'},
                    {name:'Remembrance Day (Canada)'},
                ],
                actionItems: [
                    
                ]
            },
            {
                events: [
                    {name:'Christmas'},
                    {name:'Hanukkah'},
                    {name:'Kwanzaa'},
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
            {id: 7, name: 'Special Deals', video:'http://media.w3.org/2016/01/Emmy-Award.mp4', rating: 0, reason:''},
            {id: 8, name: 'Online Connecting', video:'http://media.w3.org/2016/01/Emmy-Award.mp4', rating: 0, reason:''},
            {id: 9, name: 'Loyalty', video:'http://media.w3.org/2016/01/Emmy-Award.mp4', rating: 0, reason:''},
            {id: 10, name: 'SLAPnap', video:'http://media.w3.org/2016/01/Emmy-Award.mp4', rating: 0, reason:''},
        ];

        var _monthLongNames = ["January", "February", "March", "April", "May","June", "July", "August", "September", "October","November", "December"];
        var _monthShortNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
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
                nth: indexQut,
                monthsString: _monthShortNames[months[0]] + ', ' + _monthShortNames[months[1]] + ', ' + _monthShortNames[months[2]]
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