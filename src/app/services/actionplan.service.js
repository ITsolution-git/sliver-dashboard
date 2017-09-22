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
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Set up a spreadsheet to track the 100 people you are going to ask for Referrals from (using SLAPschool Template).'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Go through network and create a list of 25 people who are from your close friends & family network and who you would feel comfortable asking for help from. Put them into your Referral Tracking Spreadsheet.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Go through network and create a list of 25 people who are from your close client and vendor network and who you would feel comfortable asking for help from. Put them into your Referral Tracking Spreadsheet.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Go through network and create a list of 25 people who are from your teachers / advisors / doctors / care network and who you would feel comfortable asking for help from. Put them into your Referral Tracking Spreadsheet.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Go through network and create a list of 25 people who are from your business / industry acquaintance network and who you would feel comfortable asking for help from. Put them into your Referral Tracking Spreadsheet.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Ensure your Referral Tracker has contact information for each of the 100 people you will be reaching out to.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Write first email that you will send to all 100 contacts explaining your growth goals and asking for help (using SLAPschool Template)'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Send out email to 50 people on the list and start to track their responses.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Write a standard and very simple introduction email of yourself to any referrals that your 100 give you so that you can easily respond to referrals in an efficient manner (using SLAPschool Template).'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Follow up with every referral received in Month 1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Check Progress against quarterly goal.   Do gut check and add more action items if needed to increase activity necessary to hit quarterly goals.'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Send out emails to remaining 50 people on the list and start to track their responses.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Send second follow up to anyone from first 50 who have not responded (using SLAPschool Template).'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Send second follow up to anyone from second 50 who have not responded (using SLAPschool Template).'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Continue to follow up with every Referral received from your 100 contacts.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Ensure you have received a minimum number of Referrals to hit your goals.   Do increased follow up and/or add more people to your list of 100 in order to get the volume of Referrals that you need.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Check Progress against quarterly goal.   Do gut check and add more action items if needed to increase activity necessary to hit quarterly goals.'},
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Send a third and final email to all 100 people on your list as a final prompt / ask (using SLAPschool Template)'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Actively cultivate Referrals and do follow up with Referrals #1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Actively cultivate Referrals and do follow up with Referrals #2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Actively cultivate Referrals and do follow up with Referrals #3'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Actively cultivate Referrals and do follow up with Referrals #4'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Buy thank you cards'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Write out thank you cards to everyone on your list of 100 who took the time and energy to send you a referral.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Mail out thank you cards'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Review Quarterly Goals and adjust the next quarter’s Action Items and Quarterly Goals if there is any activity or results you need to make up in the next quarter and/or if there are learnings from this quarter that impact how you are thinking about next quarter.'}
                    ],

                ]

            },
            {
                strategyId: 3,
                actions: [
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Set up a Partner Tracker (using SLAPschool Template)'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Do research and put together a list of 10 companies/organizations/people who have a big network of your Ideal Client.  Add them all to the Partner Tracker.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Do research and put together a list of 10 companies/organizations/people who have a big network of your Ideal Client.  Add them all to the Partner Tracker.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Do research and put together a list of 10 companies/organizations/people who have a big network of your Ideal Client.  Add them all to the Partner Tracker.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Do research and put together a list of 10 companies/organizations/people who have a big network of your Ideal Client.  Add them all to the Partner Tracker.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Do any additional needed research to find the right contact name, email and phone number for all 40 Partners on your list.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Send out an intro email to all 40 Partners in your Partner Tracker'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Follow Up on all 40 Partners with a phone call within 2-3 days of the original email assuming they have not emailed back yet.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Connect with all 40 Partners on your list via social media (LinkedIn, Facebook etc)'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Follow all 40 of your Partners on Twitter, Instagram and/or any other social media they use'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Sign up for all 40 of your Partner’s newsletters, website content, blogs or any other way you can learn about them, understand their work and/or be up to date on what they are working on'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Check Progress against quarterly goal.   Do gut check and add more action items if needed to increase activity necessary to hit quarterly goals.'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Email all 40 Partners a second time (using SLAPschool Template)'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Call all 30 Partners who are not in your Top 10 and try to get in touch  - Round 1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Call all 30 Partners who are not in your Top 10 and try to get in touch  - Round 2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Identify your Top 10 from the list of 40 and come up with a creative way to get in touch with Partner #1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Identify your Top 10 from the list of 40 and come up with a creative way to get in touch with Partner #2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Identify your Top 10 from the list of 40 and come up with a creative way to get in touch with Partner #3'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Identify your Top 10 from the list of 40 and come up with a creative way to get in touch with Partner #4'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Identify your Top 10 from the list of 40 and come up with a creative way to get in touch with Partner #5'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Identify your Top 10 from the list of 40 and come up with a creative way to get in touch with Partner #6'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Identify your Top 10 from the list of 40 and come up with a creative way to get in touch with Partner #7'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Identify your Top 10 from the list of 40 and come up with a creative way to get in touch with Partner #8'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Identify your Top 10 from the list of 40 and come up with a creative way to get in touch with Partner #9'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Identify your Top 10 from the list of 40 and come up with a creative way to get in touch with Partner #10'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Check Progress against quarterly goal.   Do gut check and add more action items if needed to increase activity necessary to hit quarterly goals.'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Send third email to all Partners you still have not got a response from (using SLAPschool Template)'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Send a thank you note, book or some sort of small “gift” to any of the 40 Partners who you have spoken to so far.   Invest time and energy and money so that this feels extremely thoughtful and relationship building when they receive it'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Create a 2 hour block in your calendar each month for the next 6 months to follow up with any of the 40 Partners that you still have not heard from'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Review Quarterly Goals and adjust the next quarter’s Action Items and Quarterly Goals if there is any activity or results you need to make up in the next quarter and/or if there are learnings from this quarter that impact how you are thinking about next quarter.'}

                    ]
                ]
            },

            {
                strategyId: 4,
                actions: [
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Set up a Hit List Tracker (using SLAPschool Template)'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Do research and put together a list of 10 companies/organizations/people who are your PERFECT Ideal Client.  Add them all to the Hit List Tracker.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Do research and put together a list of 10 companies/organizations/people who are your PERFECT Ideal Client.  Add them all to the Hit List Tracker.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Do research and put together a list of 10 companies/organizations/people who are your PERFECT Ideal Client.  Add them all to the Hit List Tracker.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Do research and put together a list of 10 companies/organizations/people who are your PERFECT Ideal Client.  Add them all to the Hit List Tracker.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Do research and put together a list of 10 companies/organizations/people who are your PERFECT Ideal Client.  Add them all to the Hit List Tracker.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Do any additional needed research to find the right contact name, email and phone number for all 50 Leads on your list.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Send out an intro email to all 50 Leads in your Hit List Tracker'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Follow Up on all 50 Leads with a phone call within 2-3 days of the original email assuming they have not emailed back yet.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Connect with all 50 Leads on your list via social media (LinkedIn, Facebook etc)'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Follow all 50 of your Leads on Twitter, Instagram and/or any other social media they use'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Sign up for all 50 of your Leads newsletters, website content, blogs or any other way you can learn about them, understand their work and/or be up to date on what they are working on'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Check Progress against quarterly goal.   Do gut check and add more action items if needed to increase activity necessary to hit quarterly goals.'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Email all 50 Leads a second time (using SLAPschool Template)'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Call all 40 Leads who are not in your TOp 10 and try to get in touch - Round 2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Identify your Top 10 from the list of 50 and come up with a creative way to get in touch with Lead #1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Identify your Top 10 from the list of 50 and come up with a creative way to get in touch with Lead #2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Identify your Top 10 from the list of 50 and come up with a creative way to get in touch with Lead #3'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Identify your Top 10 from the list of 50 and come up with a creative way to get in touch with Lead #4'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Identify your Top 10 from the list of 50 and come up with a creative way to get in touch with Lead #5'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Identify your Top 10 from the list of 50 and come up with a creative way to get in touch with Lead #6'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Identify your Top 10 from the list of 50 and come up with a creative way to get in touch with Lead #7'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Identify your Top 10 from the list of 50 and come up with a creative way to get in touch with Lead #8'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Identify your Top 10 from the list of 50 and come up with a creative way to get in touch with Lead #9'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Identify your Top 10 from the list of 50 and come up with a creative way to get in touch with Lead #10'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Check Progress against quarterly goal.   Do gut check and add more action items if needed to increase activity necessary to hit quarterly goals.'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Send third email to all Leads you still have not got a response from (using SLAPschool Template)'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Send a thank you note, book or some sort of small “gift” to any of the 50 Leads who you have spoken to so far.   Invest time and energy and money so that this feels extremely thoughtful and relationship building when they receive it'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Create a 2 hour block in your calendar each month for the next 6 months to follow up with any of the 50 Leads that you still have not heard from'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Review Quarterly Goals and adjust the next quarter’s Action Items and Quarterly Goals if there is any activity or results you need to make up in the next quarter and/or if there are learnings from this quarter that impact how you are thinking about next quarter.'}
                    ],

                ]

            },
            {
                strategyId: 5,
                actions: [
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Check Progress against quarterly goal.   Do gut check and add more action items if needed to increase activity necessary to hit quarterly goals.'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Check Progress against quarterly goal.   Do gut check and add more action items if needed to increase activity necessary to hit quarterly goals.'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Review Quarterly Goals and adjust the next quarter’s Action Items and Quarterly Goals if there is any activity or results you need to make up in the next quarter and/or if there are learnings from this quarter that impact how you are thinking about next quarter.'}
                    ],

                ]

            },
            {
                strategyId: 6,
                actions: [
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Check Progress against quarterly goal. Do gut check and add more action items if needed to increase activity necessary to hit quarterly goals.'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Check Progress against quarterly goal. Do gut check and add more action items if needed to increase activity necessary to hit quarterly goals.'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Review Quarterly Goals and adjust the next quarter’s Action Items and Quarterly Goals if there is any activity or results you need to make up in the next quarter and/or if there are learnings from this quarter that impact how you are thinking about next quarter.'}
                    ],

                ]

            },
            {
                strategyId: 7,
                actions: [
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Check Progress against quarterly goal.   Do gut check and add more action items if needed to increase activity necessary to hit quarterly goals'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Check Progress against quarterly goal.   Do gut check and add more action items if needed to increase activity necessary to hit quarterly goals.'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Review Quarterly Goals and adjust the next quarter’s Action Items and Quarterly Goals if there is any activity or results you need to make up in the next quarter and/or if there are learnings from this quarter that impact how you are thinking about next quarter.'}
                    ],

                ]

            },
            {
                strategyId: 8,
                actions: [
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Check Progress against quarterly goal.   Do gut check and add more action items if needed to increase activity necessary to hit quarterly goals.'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Check Progress against quarterly goal.   Do gut check and add more action items if needed to increase activity necessary to hit quarterly goals.'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Review Quarterly Goals and adjust the next quarter’s Action Items and Quarterly Goals if there is any activity or results you need to make up in the next quarter and/or if there are learnings from this quarter that impact how you are thinking about next quarter.'}
                    ],

                ]

            },
            {
                strategyId: 9,
                actions: [
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Check Progress against quarterly goal.   Do gut check and add more action items if needed to increase activity necessary to hit quarterly goals.'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Check Progress against quarterly goal.   Do gut check and add more action items if needed to increase activity necessary to hit quarterly goals.'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Review Quarterly Goals and adjust the next quarter’s Action Items and Quarterly Goals if there is any activity or results you need to make up in the next quarter and/or if there are learnings from this quarter that impact how you are thinking about next quarter.'}
                    ],

                ]

            },
            {
                strategyId: 10,
                actions: [
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Check Progress against quarterly goal. Update Quarterly Goals based on revenue that was closed during this month'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Check Progress against quarterly goal. Update Quarterly Goals based on revenue that was closed during this month'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Review Quarterly Goals and adjust the next quarter’s Action Items and Quarterly Goals if there is any activity or results you need to make up in the next quarter and/or if there are learnings from this quarter that impact how you are thinking about next month'}
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