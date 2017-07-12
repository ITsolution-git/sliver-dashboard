(function () {
    'use strict';

    angular
        .module('app.services')
        .service('excuteItemService', excuteItemService);

    /* @ngInject */
    function excuteItemService($q, apiService, $rootScope) {
        var me = this;

        // --- vars ---
        me.excuteItems = null;
        me.defaultActionsBeforeStart     = [
            'Input all active Sales Opportunities for each of your revenue streams',
            'Go through all Action Items for Q1 and add any relevant notes and adjust Due Dates',
            'Do your daily Pause & Reflect to ground yourself and get ready for the year ahead!'
        ];

        me.emptySalesItem = {
            type: 'sales',
            title: '',
            notes: '',
            dueDate: moment().format($rootScope.dateFormat),
            progress: 0,
            saleUnit: 0
        };

        me.reflextionData = {
            'week': [
            
                {
                    id: 1,
                    emotion: 'Motivated & Energized',
                    description1: 'We’re thrilled to hear you are feeling motivated and energized! How great! Let’s capture what’s helping you feel so effective! Spend 5 minutes reflecting on the past week.',
                    description2: 'Narrowing our focus helps us work more effectively and feel more successful.  And who doesn’t want to feel successful! Let it be habit-forming! Do more of what works and less of whatever doesn’t. You’ll work smarter and smarter every week, and your actions will create the results you want.',
                    description3: 'Now, spend 5 minutes in action! Do one of these activities RIGHT NOW so that next week will be even better!',
                    icon: '😫',
                    qas: [
                        {
                            question: 'What worked well last week? What can you do more of? ',
                            answer: ''
                        },
                        {
                            question: 'Is there anything you should do less of next week? ',
                            answer: ''
                        },
                        {
                            question: 'What can you do next week to build on this week’s successes? ',
                            answer: ''
                        }
                    ],
                    actions:[
                        {
                            title: 'Keep making decisions in alignment with your SLAPstatement - audit your calendar for next week now so you continue the momentum',
                            added: false
                        },
                        {
                            title: 'Post your Post It Note in a few extra places!',
                            added: false
                        },
                        {
                            title: 'Watch Living SLAP Day to Day for renewed inspiration',
                            added: false
                        }
                    ]
                    
                },
                {
                    id: 2,
                    emotion: 'Detemined & Focused',
                    description1: 'We’re thrilled to hear you are feeling determined and focused!  How great!  Spend 5 minutes figuring out what worked so well last week.',
                    description2: 'What in particular worked so well well last week?',
                    description3: 'Now, spend 5 minutes in action! Do one of these activities RIGHT NOW so that next week will be just as good!',
                    icon: '😫',
                    qas: [
                        {
                            question: 'What in particular worked so well well last week?',
                            answer: ''
                        },
                        {
                            question: 'What can you do more of?  Is there anything you should do less of next week?',
                            answer: ''
                        },
                        {
                            question: 'What can you do next week to build on this week’s successes?',
                            answer: ''
                        }
                    ],
                    actions:[
                        {
                            title: 'Keep making decisions in alignment with your SLAPstatement by auditing your calendar for next week now so you continue the momentum.',
                            added: false
                        },
                        {
                            title: 'Post your Post It Note in a few extra places! Learn how here!',
                            added: false
                        },
                        {
                            title: 'Watch Living SLAP Day to Day (click here) for renewed inspiration',
                            added: false
                        }
                    ]
                    
                },
                {
                    id: 3,
                    emotion: 'Hopeful On Track',
                    description1: 'We’re thrilled to hear you’re feeling hopeful and on track! How great!  Let’s figure out what exactly what went well so you can make it happen again!  Spend 5 minutes here.',
                    description2: 'Success builds on itself and becomes a habit. Reinforce what’s working by doing more of it, and do less of what isn’t. Practice living in alignment with your SLAPstatement. It’s great that you are feeling hopeful and on track. Let’s build on that!',
                    description3: 'Spend 5 minutes in action so next week will be even better! Do one of these activities RIGHT NOW!',
                    icon: '😫',
                    qas: [
                        {
                            question: 'What did you do this week that helped you feel that way? What should you do more of to keep the momentum?',
                            answer: ''
                        },
                        {
                            question: 'Were you more focused? ',
                            answer: ''
                        },
                        {
                            question: 'Did you manage your calendar better?  How did you protect yourself from distraction?',
                            answer: ''
                        }
                    ],
                    actions:[
                        {
                            title: 'Keep making decisions in alignment with your SLAPstatement - audit your calendar for next week now so you continue the momentum',
                            added: false
                        },
                        {
                            title: 'Post your Post It Note in a few extra places!',
                            added: false
                        },
                        {
                            title: 'Watch Living SLAP Day to Day (click here) for renewed inspiration',
                            added: false
                        }
                    ]
                    
                },
                {
                    id: 4,
                    emotion: 'Distracted & Unfocused',
                    description1: 'We’re sorry you felt distracted and unfocused this week!  Take 5 minutes to answer these reflection questions to get re-focused for next week.',
                    description2: 'You are not alone!  All business owners feel unfocused at some point (or maybe many points!)  The surprising thing about distraction is how it eats time – first there’s the time you spend thinking and worrying about the problem, and then there’s the time you spend on the side project, and then there’s the overall slowdown, the sluggishness that creeps into all your activities and makes you less productive. \n The best thing you can do is remove the source of distraction as quickly as possible.  You’ll be amazed at how quickly your focus and “full strength” productivity, even your joy in your work, will return once that distraction is removed. ',
                    description3: 'Now, spend 5 minutes in action! The best way to combat distraction is to get back in action. Do one of these activities RIGHT NOW so that next week will be better.',
                    icon: '😫',
                    qas: [
                        {
                            question: 'Why are you feeling distracted? Is it something happening in your personal life? a side project is eating up your mental energy? Do you have too many competing priorities?  Have you lost focus on your Ideal Client?',
                            answer: ''
                        },
                        {
                            question: 'How much time do you think was wasted/lost due to distraction last week?',
                            answer: ''
                        },
                        {
                            question: 'How many Action Items did you have for this month? How many of those did you complete? What got in the way of completing the rest of them?  Were they poorly written? Too big to tackle? Did you not know exactly how to do them?',
                            answer: ''
                        }
                    ],
                    actions:[
                        {
                            title: 'Remove the source of distraction as quickly as possible, hopefully this week!  Go to ACT and enter a new Action Item called Remove Distraction. Then make a plan to do exactly that.',
                            added: false
                        },
                        {
                            title: 'If you can’t remove the source of distraction, you need to work around it.  Commit to completing three specific action items next week that will move your business forward. Go to ACT and identify the three best actions you can take to make progress toward your quarterly goal.',
                            added: false
                        },
                        {
                            title: 'Free choice – What else can you do to next month more successful? Add it to your Action Items for this month.',
                            added: false
                        }
                    ]
                    
                },
                {
                    id: 5,
                    emotion: 'Anxious & Worried About Money',
                    description1: 'We’re sorry your feeling anxious and worried about money. Worrying can paralyze us from taking the right actions. Spend 5 minutes reflecting on your past week to see if we can alleviate some of that.',
                    description2: 'Worrying can paralyze us from taking the right actions. And feeling isolated with our worries makes it worse. Find someone to talk to who always encourages you. Call us!',
                    description3: 'Now, spend 30 minutes in action! Let’s reduce your worries about money by working on generating some! Do at least one of these activities RIGHT NOW so that next week will be better.',
                    icon: '😫',
                    qas: [
                        {
                            question: 'Are you feeling worried about money because revenues aren’t coming in? Are you feeling worried about money because expenses are creeping up? ',
                            answer: ''
                        },
                        {
                            question: 'Are you feeling worried because your Connecting Strategy doesn’t seem to be working? Because you haven’t started your quarterly Connecting Strategy? Because you hate your Connecting Strategy or don’t know how to do some of it? ',
                            answer: ''
                        },
                        {
                            question: 'Are you feeling worried because time is passing too quickly and you aren’t getting enough done?',
                            answer: ''
                        }
                    ],
                    actions:[
                        {
                            title: 'Commit to cutting your expenses by 10% by the end of the month.  It will feel great to make a start. Enter the appointment with yourself right now, so you can make it happen.      ',
                            added: false
                        },
                        {
                            title: 'Take 3 things out of your calendar for next week, and use those time slots to do things that will generate revenue.    ',
                            added: false
                        },
                        {
                            title: 'Create your own Action Item that moves you forward!',
                            added: false
                        }
                    ]
                    
                },
                {
                    id: 6,
                    emotion: 'Tired & Burned Out',
                    description1: 'We’re sorry you felt burnt out. Let’s see if we can re-fuel you for next week. Spend 5 minutes reflecting on last week.',
                    description2: 'If our business is burning us out, we need to find a way to get back to the passion we originally had for our business. When we’re exhausted, nothing feels fun or worthwhile. AND we can’t be efficient or effective.',
                    description3: 'Spend 5 minutes in action so next week will be better. Do one of these activities RIGHT NOW!',
                    icon: '😫',
                    qas: [
                        {
                            question: 'Are you feeling tired and burnt out because your work isn’t producing good results?  Because of something outside of work?  Because your work isn’t fun anymore?',
                            answer: ''
                        },
                        {
                            question: 'How long have you been feeling this way?  What was the trigger?',
                            answer: ''
                        },
                        {
                            question: 'Is there anything you can do to improve the situation?',
                            answer: ''
                        }
                    ],
                    actions:[
                        {
                            title: 'Take the weekend off to recharge your batteries. Don’t think about work. Don’t talk about work. Do something relaxing and fun and with friends who love you and make you laugh!',
                            added: false
                        },
                        {
                            title: 'Take 3 non-urgent things out of your calendar for next week, and use those times to take a walk around the block or call a friend, or brainstorm creatively.',
                            added: false
                        },
                        {
                            title: 'Commit to one change that will help you feel healthier – find 30 minutes per day for exercise or meditation; replace one unhealthy snack with a healthier option; or go to sleep half an hour earlier every night next week.',
                            added: false
                        }
                    ]
                    
                },
                {
                    id: 7,
                    emotion: 'Too Busy & Overwhelmed',
                    description1: 'We’re sorry you felt too busy and overwhelmed! Take 5 minutes to answer these reflection questions to get re-focused for next week.',
                    description2: 'When we feel too busy is usually when we need the structure of SLAP even more than usual. Practice SLAPmethodology every day. Whenever someone asks you for a minute of your time or a dollar of your money, ask yourself whether you will have an opportunity to discuss your “what”?  Will you be in front of your Ideal Client?  Is it in alignment with the scale of your business?  And, will it get you closer to your One Year Goal?',
                    description3: 'Now, spend 5 minutes doing one of these activities RIGHT NOW so that next week will be better.',
                    icon: '😫',
                    qas: [
                        {
                            question: 'What kept you so busy last week?  Business or personal?  Were your efforts productive or unproductive? ',
                            answer: ''
                        },
                        {
                            question: 'Did you stay truly in alignment with your SLAP or did you do things you “hoped might lead you to someone who might know someone who could be your Ideal Client?”',
                            answer: ''
                        },
                        {
                            question: 'What would have made last week more successful? What didn’t happen because you were so busy?',
                            answer: ''
                        }
                    ],
                    actions:[
                        {
                            title: 'Take 3 things out of your calendar for next week, that won’t lead directly to sales. You can do it!  If you find more than 3, even better. Say NO more than YES next week.',
                            added: false
                        },
                        {
                            title: 'Watch “Living SLAP Day to Day” to get back into the SLAPmindset and remind yourself how scarce time and money are, how to make the best use of both. Click here to go directly to the video.',
                            added: false
                        },
                        {
                            title: 'Edit your Action Items so that every action item is crystal clear to you – you know how to do it, it is broken down into its bite-size components, it is well described, and can be accomplished in 15 or 20 minutes.',
                            added: false
                        }
                    ]
                
                }
            ],
            month: [
            
                {
                    id: 1,
                    emotion: 'Motivated & Energized',
                    description1: 'We’re thrilled to hear you are feeling motivated and energized!  How great! Spend 25 minutes thinking back over the last month with these questions.',
                    description2: 'Narrowing our focus helps us work more effectively and feel more successful.  And who doesn’t want to feel successful! Let it be habit-forming! Do more of what works and less of whatever doesn’t. You’ll work smarter and smarter every week, and your actions will create the results you want.',
                    description3: 'Now, spend 30 minutes in action! It’s great that you are so motivated and you’ve had a successful month. Set yourself up for another successful month next month by doing one of these activities right now!',
                    icon: '😫',
                    qas: [
                        {
                            question: 'What worked well last month?',
                            answer: ''
                        },
                        {
                            question: 'What can you do more of?  Is there anything you should do less of next month? What can you do next month to build on this month’s successes?',
                            answer: ''
                        },
                        {
                            question: 'What did you learn last month about yourself? About your Ideal Client? About your sales process? About this Connecting Strategy?',
                            answer: ''
                        }
                    ],
                    actions:[
                        {
                            title: 'Break your Action Items into smaller pieces. It’s so much easier to get things done when they are clearly described, and “bite sized”. Add enough detail to your to-do list so that you can easily look at it and say, I can do that right now!',
                            added: false
                        },
                        {
                            title: 'Set a measurable benchmark for next month to stay on track. How will you know that this month is moving your closer to your quarterly goal?  What’s the key activity that must happen to set you up to reach your sales goal?',
                            added: false
                        },
                        {
                            title: 'Set a measurable benchmark for next month to stay on track. How will you know that this month is moving your closer to your quarterly goal?  What’s the key activity that must happen to set you up to reach your sales goal?  ',
                            added: false
                        },
                        {
                            title: 'If there is anything about your Connecting Strategy that you don’t know how to do, check out the resources in Learn, or ask Pat for help. ',
                            added: false
                        }
                    ]
                    
                },
                {
                    id: 2,
                    emotion: 'Detemined & Focused',
                    description1: 'We’re thrilled to hear you are feeling determined and focused!  How great!  Spend 25 minutes thinking back over the past month and answering these questions: ',
                    description2: 'Narrowing our focus helps us work more effectively and feel more successful. And who doesn’t want to feel successful! Let it be habit-forming! Do more of what works and less of whatever doesn’t, so that you are working smarter and smarter every week and your actions will create the results you want.',
                    description3: 'Now, spend 30 minutes in action right now! It’s great that you are so motivated and you’ve had a successful month.  Set yourself up for another successful month next month by doing one of these activities right now!      ',
                    icon: '😫',
                    qas: [
                        {
                            question: 'What in particular worked well last month?',
                            answer: ''
                        },
                        {
                            question: 'What can you do more of?  Is there anything you should do less of next month? What can you do next month to build on this month’s successes?',
                            answer: ''
                        },
                        {
                            question: 'What did you learn last month about yourself?  About your Ideal Client?  About your sales process?  About this Connecting Strategy?',
                            answer: ''
                        }
                    ],
                    actions:[
                        {
                            title: 'Break your Action Items into smaller pieces.  It’s so much easier to get things done when they are clearly described, and “bite sized”.  Add enough detail to your to-do list so that you can easily look at it and say, I can do that right now!  You’ll make more progress if your action items are precise and focused enough that you can get them done in 15 minutes to an hour',
                            added: false
                        },
                        {
                            title: 'Set a measurable benchmark for next month to stay on track.  How will you know that this month is moving your closer to your quarterly goal?  What’s the key activity that must happen to set you up to reach your sales goal?',
                            added: false
                        },
                        {
                            title: 'If there is anything about your Connecting Strategy that you don’t know how to do, check out the resources in Learn, or ask Pat for help.',
                            added: false
                        }
                    ]
                    
                },
                {
                    id: 3,
                    emotion: 'Hopeful On Track',
                    description1: 'We’re so glad to hear you are feeling hopeful and on track. Let’s figure out what exactly what went well so you can make it happen again!  Spend 25 minutes here. Be sure to reflect on the whole month, not just the past week or so!',
                    description2: 'Success builds on itself and becomes a habit. Reinforce what’s working by doing more of it, and do less of what isn’t. Practice living in alignment with your SLAPstatement. It’s great that you are feeling hopeful and on track. Let’s build on that!',
                    description3: 'Spend 30 minutes in action so next month will be even better! Set yourself up for another successful month next month by doing at least one of these activities right now!   ',
                    icon: '😫',
                    qas: [
                        {
                            question: 'What did you do this month that helped you feel that way? What should you do more of to keep the momentum?',
                            answer: ''
                        },
                        {
                            question: 'How did you keep yourself moving forward this month?  Were you more focused?  Did you manage your calendar better?  How did you protect yourself from distraction?',
                            answer: ''
                        },
                        {
                            question: 'What was the highlight of last month?  What was your major learning?',
                            answer: ''
                        }
                    ],
                    actions:[
                        {
                            title: 'Break your Action Items into smaller pieces.  It’s so much easier to get things done when they are clearly described, and “bite sized”.  Add enough detail to your to-do list so that you can easily look at it and say, I can do that right now!   ',
                            added: false
                        },
                        {
                            title: 'Set a measurable benchmark for next month to stay on track.  How will you know that this month is moving your closer to your quarterly goal?  What’s the key activity that must happen to set you up to reach your sales goal?',
                            added: false
                        },
                        {
                            title: 'Watch Living SLAP Day to Day',
                            added: false
                        }
                    ]
                    
                },
                {
                    id: 4,
                    emotion: 'Distracted & Unfocused',
                    description1: 'We’re sorry to that you’re feeling distracted and unfocused. Spend 25 minutes getting back on track by answering these questions. Be sure to think back over the whole month, not just the past week',
                    description2: 'You are not alone!  All business owners experience this at some point (or maybe many points!) The surprising thing about distraction is how it eats time – first there’s the time you spend thinking and worrying about the problem, and then there’s the time you spend on the side project, and then there’s the overall slowdown, the sluggishness that creeps into all your activities and makes you less productive. \nThe best thing you can do is remove the source of distraction as quickly as possible. You’ll be amazed at how quickly your focus and “full strength” productivity, even your joy in your work, will return once that distraction is removed. The thing about spending a whole month distracted is how it shortens your quarter and can hurt your chances of reaching your quarterly goal. Let’s figure out how to get you back on track so next month is productive, and maybe can make up for this month.',
                    description3: 'Now, spend 30 minutes in action! The best medicine to combat distraction is to get back in action. Do at least three of these activities RIGHT NOW so that next month will be better.',
                    icon: '😫',
                    qas: [
                        {
                            question: 'Why are you feeling distracted?  Is it something happening in your personal life? a side project is eating up your mental energy? Do you have too many competing priorities?  Have you lost focus on your Ideal Client?',
                            answer: ''
                        },
                        {
                            question: 'How much time do you think was wasted/lost due to distraction in the last month?',
                            answer: ''
                        },
                        {
                            question: 'How many Action Items did you have for this month? How many of those did you complete? What got in the way of completing the rest of them?  Were they poorly written? Too big to tackle?  Did you not know exactly how to do them?',
                            answer: ''
                        },
                        {
                            question: 'What was your biggest learning this month?',
                            answer: ''
                        }
                    ],
                    actions:[
                        {
                            title: 'Remove the source of distraction as quickly as possible, hopefully this week!  Go to ACT and enter a new Action Item called Remove Distraction. Then make a plan to do exactly that.',
                            added: false
                        },
                        {
                            title: 'Set a monthly benchmark for next month. What absolutely must happen if you are to reach your quarterly goal?',
                            added: false
                        },
                        {
                            title: 'Improve your action items.  Go into ACT, roll forward any action items from last month that you didn’t complete. Then edit the list so that every action item is crystal clear to you – you know how to do it, it is broken down into its bite-size components, it is well described, and can be accomplished in one hour or less.',
                            added: false
                        },
                        {
                            title: 'If removing the source of distraction is out of your control, work around it by regaining a sense of progress. Commit to completing three specific action items next week to move your business forward. Go to ACT and identify the three best actions you can take toward achieving your quarterly goal.',
                            added: false
                        }
                    ]
                    
                },
                {
                    id: 5,
                    emotion: 'Anxious & Worried About Money',
                    description1: 'So, you’re feeling anxious and worried about money. Let’s see if we can alleviate some of that!  Spend 25 minutes thinking back over the past month and answering these questions. (Be sure think back over the whole month, not just the past week!)',
                    description2: 'Worrying can paralyze us from taking the right actions. And if we don’t reach our financial goals, that can make us even more worried. The cash flow-capacity catch22 can feel even worse than usual when we are worried. On the flip side, reaching our goals is the best medicine for combating worry – success is the best revenge! Can you use your worry to fuel productive action?',
                    description3: 'Now, spend 30 minutes in action! Let’s reduce your worries about money by working on generating some!  Do at least one of these activities RIGHT NOW so that next month will be better.',
                    icon: '😫',
                    qas: [
                        {
                            question: 'Are you feeling worried about money because revenues aren’t coming in? Are you feeling worried about money because expenses are creeping up?',
                            answer: ''
                        },
                        {
                            question: 'Are you feeling worried because your Connecting Strategy doesn’t seem to be working? Are you feeling worried because time is passing too quickly and you aren’t getting enough done?',
                            answer: ''
                        },
                        {
                            question: 'How did worrying affect your productivity this month? ',
                            answer: ''
                        }
                    ],
                    actions:[
                        {
                            title: 'Get closer to sales by reviewing your Action Items: commit to doing at least 3 things that will lead directly to sales. Be sure to break your Action Items into bite-sized, achievable tasks so you can actually get them done during your busy days.',
                            added: false
                        },
                        {
                            title: 'Get closer to your Ideal Client: Book yourself a one-hour appointment to brainstorm at least 20 new ideas of ways you can meet your Ideal Client, all the places s/he hangs out. Then, choose 3 to implement next month and put those right in your Action Items.',
                            added: false
                        },
                        {
                            title: 'Spend less money: find 3 ways you can spend less money next week.  Bring your lunch to work. Walk instead of taking a taxi.  Make your own coffee or tea instead of going to Starbucks. Invite clients to your office rather than meeting at a restaurant.',
                            added: false
                        }
                    ]
                    
                },
                {
                    id: 6,
                    emotion: 'Tired & Burned Out',
                    description1: 'We’re sorry you felt burnt out. Let’s see if we can give you some fuel for next month. Spend 25 minutes thinking back over the last month with these reflection questions. ',
                    description2: 'You may be parenting your business for the wrong phase. When our businesses are “babies”, they need our attention every minute. They cannot do anything on their own and we have to make every single decision. But as our businesses grow, they need to develop some independence from us. If we continue to treat them as babies, as miniature extensions of ourselves, they can’t thrive. Maybe you are involved in too many decisions?  Maybe you  are micromanaging? Maybe you are overly focused on elements of the business that should run smoothly by now? Or maybe your business is in a crisis, a crunch time of some sort, an important growth challenge, and your otherwise “grown up” business requires your significant attention right now but you haven’t noticed? Sometimes we have to be more hands-on “parents”, just for a short time. What’s happening in your business right now?',
                    description3: 'Spend 30 minutes in action so next month will be better. Do at least one of these activities RIGHT NOW!',
                    icon: '😫',
                    qas: [
                        {
                            question: 'Are you feeling tired and burnt out because your work isn’t producing good results? Has your business moved into a new phase but you haven’t changed the way you think about it, treat it? Are you feeling tired and burnt out because your work isn’t fun anymore?',
                            answer: ''
                        },
                        {
                            question: 'Are you feeling tired and burnt out because of something outside of work?',
                            answer: ''
                        },
                        {
                            question: 'How long have you been feeling this way?  What was the trigger? Is there anything you can do to improve the situation?',
                            answer: ''
                        }
                    ],
                    actions:[
                        {
                            title: 'Make a list of everything your business “needs” right now. Which things are you not providing to your business?  What things are you doing that are not right for this phase, that you can stop doing?',
                            added: false
                        },
                        {
                            title: 'If burn out is sapping your energy and enjoyment of your work, you may be saying YES when you should be saying NO. Do a calendar audit and see what you can take out of your schedule for next month.',
                            added: false
                        },
                        {
                            title: 'If you’ve lost the sense that your work is meaningful, spend some time reminding yourself why you started the business originally. What impact did you hope to have?  Who did you hope to help?  Have you gotten away from your original mission?  Spend an hour figuring out how to recapture that sense of mission.',
                            added: false
                        },
                        {
                            title: 'Commit to 3 specific changes that will improve your situation: make one change related to your health; make one change to create more connection with friends and family; and make one change to improve your time management at work.   ',
                            added: false
                        }
                    ]
                    
                },
                {
                    id: 7,
                    emotion: 'Too Busy & Overwhelmed',
                    description1: 'So, you are feeling too busy and overwhelmed. Spend 25 minutes thinking back over the past month and answering these questions. Be sure think back over the whole month, not just the past week!',
                    description2: 'When you feel too busy is exactly when you need the structure of SLAP the most. Growth is good, but doesn’t always feel good or go smoothly. If you didn’t reach your goal this month, don’t panic!  You can get back into action and get back on track.',
                    description3: 'Spend 30 minutes in action so next month will be better. Do at least one of these activities RIGHT NOW!',
                    icon: '😫',
                    qas: [
                        {
                            question: 'Are you too busy with work-related things or personal/ extracurricular/ volunteer activities?  Are you busy with things that are making you money or costing you money?',
                            answer: ''
                        },
                        {
                            question: 'Did you commit to projects that don’t move you closer to your One Year Goal and closer to your Ideal Client?  How much time did you actually spend on business development last month?  How much time, looking back, did you “waste”?',
                            answer: ''
                        },
                        {
                            question: 'Is being busy a way of procrastinating on things you don’t want to do, don’t know how to do, or are afraid to do? What are those things?',
                            answer: ''
                        }
                    ],
                    actions:[
                        {
                            title: 'Review your Action Items for next month and decide whether these are the best things to do, to move you quickly toward your Quarterly Goal. Edit that list until you have a powerful set of bite-sized action items and book the time into your calendar to get those things done!  ',
                            added: false
                        },
                        {
                            title: 'Set a specific benchmark for next month, something that will demonstrate that you are on track. Then, review your Action Items for next month and commit to the ones that will move you fastest toward sales. Break the action items down into their smallest “bite sized” parts so they are easy to tackle. Reach out to Pat if there is anything you don’t know how to do.',
                            added: false
                        },
                        {
                            title: 'List all the things you are too busy with. Identify the things that aren’t urgent and necessary and stop doing those. Exit gracefully from volunteer commitments you no longer have time for, if you are committed to reaching your financial goal. Then identify the things someone else can do for you, and make a plan to outsource or delegate those. With what’s left, figure out which things must be done during business hours, which can be done after hours, and create blocks of uninterrupted time to be more productive. ',
                            added: false
                        }
                    ]
                
                }
            ],
            quater:[
            
                {
                    id: 1,
                    emotion: 'Motivated & Energized',
                    description1: 'Congratulations!  Feeling motivated and energized at the end of a quarter is a fantastic! That is really exciting and sets you up for success next quarter too!  (But don’t coast.)  Spend 25 minutes thinking back over the whole quarter with these questions. Don’t forget to think all the way back to the start of the quarter, not just the past week or month!',
                    description2: 'Narrowing our focus helps us work more effectively and feel more successful.  And who doesn’t want to feel successful! Let it be habit-forming! Do more of what works and less of whatever doesn’t. You’ll work smarter and smarter every week, and your actions will create the results you want.',
                    description3: 'Now, spend 30 minutes in action! It’s great that you are so determined and that you’ve had a successful quarter. Set yourself up for another great quarter by doing at least one of these activities RIGHT NOW!',
                    icon: '😫',
                    qas: [
                        {
                            question: 'What did you do this quarter that helped you feel that way? How did you keep yourself moving forward this month?  Were you more focused?  Did you manage your calendar better?  How did you protect yourself from distraction?',
                            answer: ''
                        },
                        {
                            question: 'What was the highlight of the quarter?  What was your major learning?',
                            answer: ''
                        },
                        {
                            question: 'What really worked for you this quarter?  Did you work well?  Did the Connecting Strategy work well?  Both?  Would you use this Connecting Strategy again? Why or why not?  What would you do to improve the implementation?  Was this the best time of year for this strategy?',
                            answer: ''
                        }
                    ],
                    actions:[
                        {
                            title: 'Reward yourself to keep your motivation high for next quarter! What special treat can you give yourself as a pat on the back?',
                            added: false
                        },
                        {
                            title: 'Summarize what worked best last quarter and ideas for using that strategy again next SLAP year ',
                            added: false
                        },
                        {
                            title: 'Get started on next quarter by reviewing all the info for your next strategy in Learn!  ',
                            added: false
                        },
                        {
                            title: 'Make your new Post It Note.',
                            added: false
                        }
                    ]
                    
                },
                {
                    id: 2,
                    emotion: 'Detemined & Focused',
                    description1: 'Congratulations! Feeling determined and focused at the end of a quarter is a great accomplishment!  We’re so proud of you! Spend 25 minutes thinking back over the whole quarter and answering these questions. Don’t forget to think all the way back to the start of the quarter, not just the past week or month!',
                    description2: 'Narrowing our focus helps us work more effectively and feel more successful. And who doesn’t want to feel successful! Let it be habit-forming! Do more of what works and less of whatever doesn’t. You’ll work smarter and smarter every week, and your actions will create the results you want.',
                    description3: 'Now, spend 30 minutes in action! It’s great that you are so motivated and you’ve had a successful quarter.  Set yourself up for another successful quarter by doing one of these activities RIGHT NOW!  ',
                    icon: '😫',
                    qas: [
                        {
                            question: 'What did you do this quarter that helped you feel that way? How did you keep yourself moving forward this month?  Were you more focused?  Did you manage your calendar better?  How did you protect yourself from distraction?',
                            answer: ''
                        },
                        {
                            question: 'What was the highlight of the quarter?  What was your major learning?',
                            answer: ''
                        },
                        {
                            question: 'What really worked for you this quarter?  Did you work well?  Did the Connecting Strategy work well?  Both?  Would you use this Connecting Strategy again? Why or why not?  What would you do to improve the implementation?  Was this the best time of year for this strategy?',
                            answer: ''
                        }
                    ],
                    actions:[
                        {
                            title: 'Reward yourself to keep your motivation high for next quarter! What special treat can you give yourself as a pat on the back?  ',
                            added: false
                        },
                        {
                            title: 'Get started on next quarter by reviewing all the info for your next strategy in Learn! ',
                            added: false
                        },
                        {
                            title: 'Make your new Post It Note.    ',
                            added: false
                        }
                    ]
                    
                },
                {
                    id: 3,
                    emotion: 'Hopeful On Track',
                    description1: 'Congratulations!  Feeling hopeful and on track at the end of a quarter is a great accomplishment!  We’re so proud of you! Spend 25 minutes answering these questions, thinking back over the whole quarter. Be sure the reflect on the entire quarter, not just the past week or month.',
                    description2: 'Success builds on itself and becomes a habit. Reinforce what’s working by doing more of it, and do less of what isn’t. Practice living in alignment with your SLAPstatement. It’s great that you are feeling hopeful and on track. Let’s build on that!',
                    description3: 'Now, spend 30 minutes in action! Do at least one of these activities RIGHT NOW so that next quarter will be even better.',
                    icon: '😫',
                    qas: [
                        {
                            question: 'What did you do this quarter that helped you feel that way? How did you keep yourself moving forward this month?  Were you more focused?  Did you manage your calendar better?  How did you protect yourself from distraction?',
                            answer: ''
                        },
                        {
                            question: 'What was the highlight of the quarter?  What was your major learning?',
                            answer: ''
                        },
                        {
                            question: 'What really worked for you this quarter?  Did you work well?  Did the Connecting Strategy work well?  Both?  Would you use this Connecting Strategy again? Why or why not?  What would you do to improve the implementation?  Was this the best time of year for this strategy?',
                            answer: ''
                        },
                        {
                            question: 'Did you reach your financial goal?  Why or why not?',
                            answer: ''
                        }
                    ],
                    actions:[
                        {
                            title: 'Reward yourself to keep your motivation high for next quarter! What’s one thing you can do for yourself as a “pat on the back” for all your hard work?',
                            added: false
                        },
                        {
                            title: 'Get started on next quarter by reviewing all the info for your next strategy in Learn!  Make your new Post It Note.   ',
                            added: false
                        },
                        {
                            title: 'Stay connected to othe SLAPsters! Sign up for a SLAPschool event!',
                            added: false
                        }
                    ]
                    
                },
                {
                    id: 4,
                    emotion: 'Distracted & Unfocused',
                    description1: 'We’re sorry to that you’re feeling distracted and unfocused. Spend 25 minutes getting back on track by answering these questions. Be sure to think back over the whole month, not just the past week.',
                    description2: 'You are not alone!  All business owners experience this at some point (or maybe many points!)  The surprising thing about distraction is how it eats time – first there’s the time you spend thinking and worrying about the problem, and then there’s the time you spend on the side project, and then there’s the overall slowdown, the sluggishness that creeps into all your activities and makes you less productive. \nThe best thing you can do is remove the source of distraction as quickly as possible.  You’ll be amazed at how quickly your focus and “full strength” productivity, even your joy in your work, will return once that distraction is removed.  If you didn’t reach your goal this quarter, don’t panic!  You can get back into action and get back on track.',
                    description3: 'Now, spend 30 minutes in action! The best medicine to combat distraction is to get back in action.  Do at least three of these activities RIGHT NOW so that next quarter will be better.',
                    icon: '😫',
                    qas: [
                        {
                            question: 'What is the source of the distraction? Is it something happening in your personal life? A side project is eating up your mental energy? Do you you have too many competing priorities? Have you have lost focus on your Ideal Client? What is it?',
                            answer: ''
                        },
                        {
                            question: 'How much time do you think was wasted/lost due to distraction this quarter?',
                            answer: ''
                        },
                        {
                            question: 'Thinking about your Connection Strategy – how successfully did you implement it?  Did you actually use the strategy?  Did you do it well?  Was this the right time of year to do it?  Should you use it again in the future?  How would you do it differently?',
                            answer: ''
                        },
                        {
                            question: 'Did you reach your quarterly goal?  Why or why not?',
                            answer: ''
                        }
                    ],
                    actions:[
                        {
                            title: 'Remove the source of distraction as quickly as possible, hopefully this week!  Go to ACT and enter a new Action Item for the new month called Remove Distraction.  Then make a plan to do exactly that.',
                            added: false
                        },
                        {
                            title: 'Update your dashboards.  See how much progress you actually made.  Enter your sales for the past quarter and check off your completed action items.',
                            added: false
                        },
                        {
                            title: 'If you didn’t hit your financial goal last quarter, you need to make up those sales somehow.  Commit to how many of those units you can add to your quarterly goal for the upcoming quarter.  Make your Post It Note for the new quarter.',
                            added: false
                        },
                        {
                            title: 'If removing the source of distraction is out of your control, work around it by regaining a sense of progress.  Commit to completing three specific action items next week, to will move your business forward.  Go to ACT and identify the three best actions you can take toward achieving your quarterly goal.',
                            added: false
                        }
                    ]
                    
                },
                {
                    id: 5,
                    emotion: 'Anxious & Worried About Money',
                    description1: 'We’re so sorry to hear you are feeling anxious and worried about money. Let’s see if we can alleviate some of that. Spend 25 minutes answering these questions. Don’t forget to think all the way back to the start of the quarter, not just the past week or month!',
                    description2: 'Worrying can paralyze us from taking the right actions. And if we don’t reach our financial goals, that can make us even more worried. The cash flow-capacity catch22 can feel even worse than usual when we are worried. On the flip side, reaching our goals is the best medicine for combating worry – success is the best revenge! Can you use your worry to fuel productive action? ',
                    description3: 'Now, spend 30 minutes in action! Let’s reduce your worries about money by working on generating some! Do at least one of these activities RIGHT NOW so that next quarter will be better.',
                    icon: '😫',
                    qas: [  
                        {
                            question: 'What is worrying you and when did it start? What have you tried so far, in terms of improving the situation? What other ideas do you have for reducing your worry? ',
                            answer: ''
                        },
                        {
                            question: 'In thinking about your business and your SLAP, how did you do this quarter?  Did you reach your financial goal?  Did you not work or did this Connecting Strategy not work? ',
                            answer: ''
                        },
                        {
                            question: 'Did you complete a large percentage or only a few of your Action Items?  Did you not have time? Not have the energy? Not know what to do or how to do it? What else got in the way this quarter?',
                            answer: ''
                        }
                    ],
                    actions:[
                        {
                            title: 'Commit to cutting your expenses by 10% by the end of next month. It will feel great to make a start. Create a calendar appointment with yourself for next week, to review your overall expenses and make a plan to reducing them. Consider fixed overhead expenses and also variable expenses. Can you renegotiate with vendors?',
                            added: false
                        },
                        {
                            title: 'Expenses don’t hurt as much when higher revenues are coming in. Can you raise prices or reduce discounts on any of your products/services? Even a small increase multiplied by many clients paying it, can make a big difference to your bank account.',
                            added: false
                        },
                        {
                            title: 'Spend 3 hours brainstorming all the ways you can meet your Ideal Client -- all the places s/he hangs out. Make a list of at least 20 new ideas and prioritize 3 that can most quickly lead to revenues.',
                            added: false
                        }
                    ]
                    
                },
                {
                    id: 6,
                    emotion: 'Tired & Burned Out',
                    description1: 'We’re so sorry to hear you are feeling exhausted and burned out. Let’s see if we can shift that for next quarter. Spend 25 minutes answering these questions. Don’t forget to think all the way back to the start of the quarter, not just the past week or month!',
                    description2: 'Burn out is the feeling that your work isn’t fun anymore, that your efforts aren’t paying off, and that you can’t continue working this hard for too much longer. Something’s got to give! Reconnect to the passion in your business; what impact do you want to have. Why do you care? What are you willing to sacrifice/invest to reach your ultimate goal? \n You may be parenting your business for the wrong phase. When our businesses are “babies”, they need our attention every minute. They cannot do anything on their own and we have to make every single decision. But as our businesses grow, they need to develop some independence from us. If we continue to treat them as babies, as miniature extensions of ourselves, they can’t thrive. Maybe you are involved in too many decisions? Maybe you are micromanaging?  Maybe you are overly focused on elements of the business that should run smoothly by now?  Or maybe your business is in a crisis, a crunch time of some sort, an important growth challenge, and your otherwise “grown up” business requires your significant attention right now but you haven’t noticed?  Sometimes we have to be more hands-on “parents”, just for a short time. What’s happening in your business right now?',
                    description3: 'Spend 30 minutes in action re-igniting your passion and spark for your business. Do at least one of these activities RIGHT NOW!',
                    icon: '😫',
                    qas: [
                        {
                            question: 'When did that start?  Is it a build-up of working too hard or did something specific change about your business that led to this feeling?',
                            answer: ''
                        },
                        {
                            question: 'You’ve been working really hard, is that work producing results?  Can you see any way out, any way to work less, work smarter, delegate more? ',
                            answer: ''
                        },
                        {
                            question: 'Did you reach your financial goal this quarter?  Why or why not?',
                            answer: ''
                        },
                        {
                            question: 'Did your Connection Strategy for this quarter work well for you?  Did you work well this quarter? Did your Ideal Client respond well?  What would you differently if you had it to do over again?',
                            answer: ''
                        }
                    ],
                    actions:[
                        {
                            title: 'Spend a half hour writing about your initial passion for your business. When you first started it, what impact did you want to have? Why do you care? What are you willing to sacrifice/invest to reach your ultimate goal?',
                            added: false
                        },
                        {
                            title: 'Ask 5 friends to meet you for lunch or drinks so you can vent and receive affirmation. ',
                            added: false
                        },
                        {
                            title: 'Connect with your 5 best clients, current and former, and find out what they love about working with you. Print out their responses and hang them where you can see them every day.',
                            added: false
                        }
                    ]
                    
                },
                {
                    id: 7,
                    emotion: 'Too Busy & Overwhelmed',
                    description1: 'We’re so sorry to hear you are feeling too busy and overwhelmed!  Spend 25 minutes answering these questions. Don’t forget to think all the way back to the start of the quarter, not just the past week or month!',
                    description2: 'Not all busy is good. Are you busy with the right things?  Are you busy with growth but it doesn’t feel as exciting and great as you expected growth to feel?  When we feel too busy is usually when we need the structure of SLAP even more than usual. Practice SLAP methodology every day. Whenever someone asks you for a minute of your time or a dollar of your money, ask yourself whether you will have an opportunity to discuss your “what”?  Will you be in front of your Ideal Client?  Is it in alignment with the scale of your business?  And, will it get you closer to your One Year Goal? ',
                    description3: 'Spend 30 minutes in action so next month will be better! Do at least one of these activities RIGHT NOW! ',
                    icon: '😫',
                    qas: [
                        {
                            question: 'When did you start to feel too busy and overwhelmed?  Did something specific change about your business that made you so much busier?',
                            answer: ''
                        },
                        {
                            question: 'Is all your hard work producing results?  Can you see any way out, any way to work less, work smarter, delegate more? ',
                            answer: ''
                        },
                        {
                            question: 'Did your Connection Strategy for this quarter work well for you?  Did you work well this quarter? Did your Ideal Client respond well?  What would you differently if you had it to do over again?',
                            answer: ''
                        },
                        {
                            question: 'Did you reach your financial goal this quarter? Why or why not?',
                            answer: ''
                        }
                    ],
                    actions:[
                        {
                            title: 'Reconnect to the passion in your business; what impact do you want to have; why do you care; what are you willing to sacrifice/invest to reach your ultimate goal? Spend half an hour writing down all your thoughts about this.   ',
                            added: false
                        },
                        {
                            title: 'Ask 5 friends to meet you for lunch or drinks so you can vent and receive affirmation.  ',
                            added: false
                        },
                        {
                            title: 'Connect with your 5 best clients, current and former, and find out what they love about working with you. Print out their responses and hang them where you can see them every day.',
                            added: false
                        }
                    ]
                
                }
            ],
        };
        me.emptyReflextion = function (emotion) {
            var feeling = _.find(me.reflextionData, {emotion: emotion});
            return {
                type: 'reflextion',
                title: '',
                notes: '',
                dueDate: moment().format($rootScope.dateFormat),
                progress: 0,
                feeling: feeling
            }
        };

        // --- methods ---

        me.loadExcuteItems = function (refresh) {
            var deferred = $q.defer();
            
            // if (!refresh && me.excuteItems) {
            //     deferred.resolve(me.excuteItems);
            // } else {
                apiService.rest.all('excuteItems').getList().then(function (excuteItems) {
                    $rootScope.$broadcast('excuteItemsEvent');
                    me.excuteItems = excuteItems.data;

                    deferred.resolve(me.excuteItems);
                });
            // }
            
            return deferred.promise;
        };

        me.createItem = function (item) {
            return me.rest().post(item).then(function (excuteItem) {
                $rootScope.$broadcast('excuteItemsEvent');
                return excuteItem;
            });
        }

        me.createBulk = function(items) {
            return $q.all(items.map(function (item){
                return me.rest().post(item);
            }));
        }

        me.rest = function () {
            return apiService.rest.all('excuteItems')
        };

    }
})();