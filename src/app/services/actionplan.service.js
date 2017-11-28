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
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Review all the resources available for Connect Prep in SLAPschool, especially Getting Started Guide'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Review all Action Items for this Quarter and confirm that they are complete, have enough detail and show the full summary of activities that need to be done in order to hit this year\'s Goals\n'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Do a brand audit (using SLAPschool Template) to understand what words, styles, colours and symbols you feel most represent your brand'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Determine if you need to redesign or adjust your Logo. If not, check this off! If so, add to Creative Brief'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Determine if you need to redesign or adjust your Website If not, check this off! If so, add to Creative Brief'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Determine if you need to redesign or adjust your Business Cards. If not, check this off! If so, add to Creative Brief'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Determine if you need to redesign or adjust your Marketing Materials. If not, check this off! If so, add to Creative Brief'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Determine if you need to redesign or adjust your Social Media Images. If not, check this off! If so, add to Creative Brief'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Determine if you need to redesign or adjust your Book Cover. If not, check this off!  If so, add to Creative Brief'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Determine if you need to redesign or adjust your Pitch Deck. If not, check this off!  If so, add to Creative Brief'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Determine if you need to redesign or adjust your Company Swag. If not, check this off!  If so, add to Creative Brief'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Determine if you need to redesign or adjust your Contracts and Invoices. If not, check this off! If so, add to Creative Brief'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Put together a basic creative brief (using SLAPschool Template) to give to potential designers and vendors outlining your vision, needs, budget and timeline'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Finalize budget that you are comfortable spending, based on volume of work that needs to be done'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Research and ask at least 3 vendors for proposals (look for recommended resources in SLAPworld)'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Receive vendor proposal #1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Receive vendor proposal #2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Receive vendor proposal #3'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Finalize Vendor to do the creative work and sign final agreement'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Finalize timeline for the work to get done (less than 60 day timeline to completion)'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Check Progress against quarterly goal. Do gut check and add more action items if needed to increase activity necessary to hit quarterly goals.'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Write all copy that will be needed for a new website'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Write all copy that will be needed for new marketing materials'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Write all copy that will be needed for new Pitch Decks'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Put together any/all content and specific copy for any other pieces being designed'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Meet with designer weekly to review work, give feedback and ensure project stays on track (recurring action item until complete)'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Do an internal audit and ensure that any changes on internal docs or processes that represent your business to your Ideal Client are also in alignment with your new brand'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Adjust everyone in your company’s Email Signature to align with new brand'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Adjust everyone in your company’s Phone Voicemail Message to align with new brand'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Check Progress against quarterly goal. Do gut check and add more action items if needed to increase activity necessary to hit quarterly goals.'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Meet with designer weekly to review work, give feedback and ensure project stays on track (recurring action item until complete)'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Provide designer with feedback so that he/she can make final edits and tweaks'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Sign off on all work created for you!'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Coordinate printing of any printed materials'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Upload any materials that need to go on your website and/or social channels'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Organize development of any additional materials created'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Send out announcement email / posts celebrating and sharing the new brand and why you made the changes you did! (using SLAPschool Template)'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Review Quarterly Goals and adjust the next quarter’s Action Items and Quarterly Goals if there is any activity or results you need to make up in the next quarter and/or if there are learnings from this quarter that impact how you are thinking about next quarter.'}
                    ],

                ]

            },
            {
                strategyId: 2,
                actions: [
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Review all the resources available for Referrals in SLAPschool, especially Getting Started Guide'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Review all Action Items for this Quarter and confirm that they are complete, have enough detail and show the full summary of activities that need to be done in order to hit this year\'s Goals'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Set up a spreadsheet to track the 100 people you are going to ask for Referrals from (using SLAPschool Template)'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Go through network and create a list of 25 people who are from your close friends & family network and who you would feel comfortable asking for help from. Put them into your Referral Tracking Spreadsheet.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Go through network and create a list of 25 people who are from your close client and vendor network and who you would feel comfortable asking for help from. Put them into your Referral Tracking Spreadsheet.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Go through network and create a list of 25 people who are from your teachers / advisors / doctors / care network and who you would feel comfortable asking for help from. Put them into your Referral Tracking Spreadsheet.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Go through network and create a list of 25 people who are from your business / industry acquaintance network and who you would feel comfortable asking for help from. Put them into your Referral Tracking Spreadsheet.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Ensure your Referral Tracker has contact information for each of the 100 people you will be reaching out to.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Write first email that you will send to all 100 contacts explaining your growth goals and asking for help (using SLAPschool Template)'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Send out email to 50 people on the list and start to track their responses.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Write a standard and very simple introduction email of yourself to any referrals that your 100 give you so that you can easily respond to referrals in an efficient manner (using SLAPschool Template)'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Follow up with every referral received in Month 1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Check Progress against quarterly goal. Do gut check and add more action items if needed to increase activity necessary to hit quarterly goals.'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Send out emails to remaining 50 people on the list and start to track their responses'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Send second follow up to anyone from first 50 who have not responded (using SLAPschool Template)'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Send second follow up to anyone from second 50 who have not responded (using SLAPschool Template)'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Continue to follow up with every Referral received from your 100 contacts'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Ensure you have received a minimum number of Referrals to hit your goals. Do increased follow up and/or add more people to your list of 100 in order to get the volume of Referrals that you need.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Check Progress against quarterly goal. Do gut check and add more action items if needed to increase activity necessary to hit quarterly goals.'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Send a third and final email to all 100 people on your list as a final prompt / ask (using SLAPschool Template)'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Actively cultivate Referrals and do follow up with Referrals #1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Actively cultivate Referrals and do follow up with Referrals #2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Actively cultivate Referrals and do follow up with Referrals #3'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Actively cultivate Referrals and do follow up with Referrals #4'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Buy thank you cards'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Write out thank you cards to everyone on your list of 100 who took the time and energy to send you a referral'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Mail out thank you cards'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Review Quarterly Goals and adjust the next quarter’s Action Items and Quarterly Goals if there is any activity or results you need to make up in the next quarter and/or if there are learnings from this quarter that impact how you are thinking about next quarter.'}
                    ],

                ]

            },
            {
                strategyId: 3,
                actions: [
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Review all the resources available for Partnerships in SLAPschool, especially Getting Started Guide'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Review all Action Items for this Quarter and confirm that they are complete, have enough detail and show the full summary of activities that need to be done in order to hit this year\'s Goals'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Set up a Partner Tracker (using SLAPschool Template)'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Do research and put together a list of 10 companies/organizations/people who have a big network of your Ideal Client. Add them all to the Partner Tracker.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Do research and put together a list of 10 companies/organizations/people who have a big network of your Ideal Client. Add them all to the Partner Tracker.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Do research and put together a list of 10 companies/organizations/people who have a big network of your Ideal Client. Add them all to the Partner Tracker.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Do research and put together a list of 10 companies/organizations/people who have a big network of your Ideal Client. Add them all to the Partner Tracker.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Do any additional needed research to find the right contact name, email and phone number for all 40 Partners on your list.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Send out an intro email to all 40 Partners in your Partner Tracker'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Follow Up on all 40 Partners with a phone call within 2-3 days of the original email assuming they have not emailed back yet.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Connect with all 40 Partners on your list via social media (LinkedIn, Facebook etc)'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Follow all 40 of your Partners on Twitter, Instagram and/or any other social media they use'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Sign up for all 40 of your Partner’s newsletters, website content, blogs or any other way you can learn about them, understand their work and/or be up to date on what they are working on'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Check Progress against quarterly goal. Do gut check and add more action items if needed to increase activity necessary to hit quarterly goals.'}

                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Email all 40 Partners a second time (using SLAPschool Template)'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Call all 30 Partners who are not in your Top 10 and try to get in touch - Round 1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Call all 30 Partners who are not in your Top 10 and try to get in touch - Round 2'},
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
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Check Progress against quarterly goal. Do gut check and add more action items if needed to increase activity necessary to hit quarterly goals.'}

                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Send third email to all Partners you still have not got a response from (using SLAPschool Template)'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Review all Action Items for this Quarter and confirm that they are complete, have enough detail and show the full summary of activities that need to be done in order to hit this year\'s Goals'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Send a thank you note, book or some sort of small “gift” to any of the 40 Partners who you have spoken to so far. Invest time and energy and money so that this feels extremely thoughtful and relationship building when they receive it'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Create a 2 hour block in your calendar each month for the next 6 months to follow up with any of the 40 Partners that you still have not heard from'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Review Quarterly Goals and adjust the next quarter’s Action Items and Quarterly Goals if there is any activity or results you need to make up in the next quarter and/or if there are learnings from this quarter that impact how you are thinking about next quarter.'}

                    ]
                ]
            },

            {
                strategyId: 4,
                actions: [
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Review all the resources available for Hit List in SLAPschool, especially Getting Started Guide'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Review all Action Items for this Quarter and confirm that they are complete, have enough detail and show the full summary of activities that need to be done in order to hit this year\'s Goals\n'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Set up a Hit List Tracker (using SLAPschool Template)'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Do research and put together a list of 10 companies/organizations/people who are your PERFECT Ideal Client.  Add them all to the Hit List Tracker.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Do research and put together a list of 10 companies/organizations/people who are your PERFECT Ideal Client.  Add them all to the Hit List Tracker.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Do research and put together a list of 10 companies/organizations/people who are your PERFECT Ideal Client.  Add them all to the Hit List Tracker.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Do research and put together a list of 10 companies/organizations/people who are your PERFECT Ideal Client.  Add them all to the Hit List Tracker.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Do research and put together a list of 10 companies/organizations/people who are your PERFECT Ideal Client.  Add them all to the Hit List Tracker.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Do any additional needed research to find the right contact name, email and phone number for all 50 Leads on your list.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Send out an intro email to all 50 Leads in your Hit List Tracker'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Follow Up on all 50 Leads with a phone call within 2-3 days of the original email (assuming they have not emailed back yet).'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Connect with all 50 Leads on your list via social media (LinkedIn, Facebook etc)'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Follow all 50 of your Leads on Twitter, Instagram and/or any other social media they use'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Sign up for all 50 of your Leads newsletters, website content, blogs or any other way you can learn about them, understand their work and/or be up to date on what they are working on'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Check Progress against quarterly goal.   Do gut check and add more action items if needed to increase activity necessary to hit quarterly goals.'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Email all 50 Leads a second time (using SLAPschool Template)'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Call all 40 Leads who are not in your Top 10 and try to get in touch - Round 1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Call all 40 Leads who are not in your Top 10 and try to get in touch - Round 2'},
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
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Check Progress against quarterly goal. Do gut check and add more action items if needed to increase activity necessary to hit quarterly goals.'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Send third email to all Leads you still have not got a response from (using SLAPschool Template)'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Send a thank you note, book or some sort of small “gift” to any of the 50 Leads who you have spoken to so far.   Invest time and energy and money so that this feels extremely thoughtful and relationship building when they receive it'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Create a 2 hour block in your calendar each month for the next 6 months to follow up with any of the 50 Leads that you still have not heard from'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Review all Action Items for this Quarter and confirm that they are complete, have enough detail and show the full summary of activities that need to be done in order to hit this year\'s Goals'}
                    ],

                ]

            },
            {
                strategyId: 5,
                actions: [
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Review all the resources available for Events in SLAPschool, especially Getting Started Guide'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Review all Action Items for this Quarter and confirm that they are complete, have enough detail and show the full summary of activities that need to be done in order to hit this year\'s Goals'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Do research and make a list of at least five events happening this quarter that your Ideal Client will be at.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Sign up for Event #1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Sign up for Event #2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Sign up for Event #3'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Do research and make a list of all Major Events happening around the world within the next year that your Ideal Client will be at - conferences, trade shows, summits etc'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Create a brief budget for each Major Event that your Ideal Client will be at and explore the opportunities and potential investment required to attend those events, sponsor those events and/or participate in any other real way'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Pick at least one Major Event to, at the very least attend and at the very most partner with or speak at'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Call major event organizers and see if you can set up a meeting to discuss how you could collaborate with them for this event'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Think of one event idea that you could host that your Ideal Client would find valuable and enjoyable'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Pick a date to host an Ideal Client Event in the 3rd month of this Quarter'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Check Progress against quarterly goal. Do gut check and add more action items if needed to increase activity necessary to hit quarterly goals.'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Attend Event #1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Attend Event #2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Attend Event #3'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Confirm how you will be involved in Major Event and start to put plans into motion'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Create Action Items for each individual thing you need to do in order to get ready for the Major Event you will participate in'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Put together invite list for the event you will host'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Finalize Venue for the event you will host'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Send out invites for the event you will host with at least 30 days notice'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Put together program and agenda for the event your will host'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Put together food and beverage plan for the event you will host'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Finalize plan for how you will connect this event you will host to the needs you can solve for your Ideal Client who attends'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Check Progress against quarterly goal. Do gut check and add more action items if needed to increase activity necessary to hit quarterly goals.'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Host your Event'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Do deep follow up with each attendee'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Follow up with every person you met at Event #1 that you attended'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Follow up with every person you met at Event #2 that you attended'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Follow up with every person you met at Event #3 that you attended'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Do second round of follow up to all contacts from Event you hosted and Events you attended'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Put all contacts from all events into your CRM and/or contact tracking resource to continue to stay in touch'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Do thoughtful third round of follow up with anyone you have not yet heard back from'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Review Quarterly Goals and adjust the next quarter’s Action Items and Quarterly Goals if there is any activity or results you need to make up in the next quarter and/or if there are learnings from this quarter that impact how you are thinking about next quarter'}

                    ],

                ]

            },
            {
                strategyId: 6,
                actions: [
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Review all the resources available for Media in SLAPschool, especially Getting Started Guide'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Review all Action Items for this Quarter and confirm that they are complete, have enough detail and show the full summary of activities that need to be done in order to hit this year\'s Goals'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Develop story idea #1: Opinion Angle'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Develop story idea #2: Top 10 Tips Angle'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Develop story idea #3: Expert Angle'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Write a first draft of each story'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Get feedback on each copy from at least 3 people who can give you objective feedback on what is interesting and compelling and where you could edit and adjust'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Edit and finalize Opinion Angle'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Edit and finalize Top 10 Tips Angle'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Edit and finalize Expert Angle'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Develop your press kit: Bio'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Develop your press kit: Headsot'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Set up a Media Tracker (using SLAPschool Template)'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Build a list of a minimum of 25 Publications that you can think of that your Ideal Client listens to / watches'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Do research to find specific journalists and/or contacts who are interested in your topic and area of expertise'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Outreach #1 to each media contact with press kit and story ideas'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Outreach #1 to each media contact with press kit and story ideas - call'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Check Progress against quarterly goal. Do gut check and add more action items if needed to increase activity necessary to hit quarterly goals.'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Outreach #2 to each media contact - email'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Outreach #2 to each media contact - phone'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Set up calls and “pitch” conversations where you talk to the media and share your passion for what you do'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Outreach #3 - Do another round of follow up by both email and phone to any media contacts you have not heard from. Try to send them a new idea or pitch as a way to try to get their attention'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Follow up diligently with anyone you have heard from'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Check Progress against quarterly goal. Do gut check and add more action items if needed to increase activity necessary to hit quarterly goals.'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Outreach #4 to each media contact - email'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Outreach #4 to each media contact - phone'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Send thank you notes to any media contacts who have featured you or expressed interest in doing so'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Continue presenting relevant story ideas to media contacts who have not featured you'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Distribute any media coverage/links to your network via an email'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Upload any media coverage you received on your website to add to your credibility'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Update bio with any media coverage received so that it adds to future credibility'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Send an email with a link to any and all media coverage received to all media you have been pitching throughout the quarter as media likes to cover what other media have been covering'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Review Quarterly Goals and adjust the next quarter’s Action Items and Quarterly Goals if there is any activity or results you need to make up in the next quarter and/or if there are learnings from this quarter that impact how you are thinking about next quarter.'}
                    ],

                ]

            },
            {
                strategyId: 7,
                actions: [
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Review all the resources available for Special Deals in SLAPschool, especially Getting Started Guide'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Review all Action Items for this Quarter and confirm that they are complete, have enough detail and show the full summary of activities that need to be done in order to hit this year\'s Goals'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Decide on the Special Deal you want to offer. Think of something amazing you can offer that has added value and exclusivity'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Decide how many people to offer the Special Deal, and who they are'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Decide on timing of the Special Deal - when you will announce it and how long it will be available for so that there is enough time to get traction, but also a short enough period of time to create real urgency'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Create marketing copy describing the Special Deal'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Outreach #1 of Special Deal to prospects who you are making it available to'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Check Progress against quarterly goal. Do gut check and add more action items if needed to increase activity necessary to hit quarterly goals.'}
                    ],

                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Follow up #1 to all Special Deal prospects'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Follow up #2 to all Special Deal prospects'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'If not enough prospects are taking the Special Deal, decide whether to sweeten the deal or expand your list of prospects'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Follow up with anyone who has shown interest in your Special Deal and ensure you move them towards the close'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Evaluate your conversion rates - are people showing interest? If they are showing interest - are they buying at a healthy conversion rate?  Tweak strategy based on current realities and what is working or not working'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Check Progress against quarterly goal. Do gut check and add more action items if needed to increase activity necessary to hit quarterly goals.'}
                    ]
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Follow up #3 to prospects'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Announce that deal is sold out or nearly sold out to increase urgency'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Release stories of people who got the Special Deal and how great it was for them out on social media, company blog and an email newsletter to create awareness for even those who did not get access to or act on the Special Deal'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Make a hot list of opportunities that have surfaced from this campaign and follow up directly with individuals or groups of people who showed interest in the Special Deal but have not yet converted to a close.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Spend significant time creatively closing the pipeline - look at your goals for Sign Ups and your Actuals and come up with at least 3 ideas to close that gap.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Implement creative final push for Sign Ups Idea #1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Implement creative final push for Sign Ups Idea #2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Implement creative final push for Sign Ups Idea #3'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Review Quarterly Goals and adjust the next quarter’s Action Items and Quarterly Goals if there is any activity or results you need to make up in the next quarter and/or if there are learnings from this quarter that impact how you are thinking about next quarter.'}
                    ],

                ]

            },
            {
                strategyId: 8,
                actions: [
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Review all the resources available for Online Connecting in SLAPschool, especially Getting Started Guide'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Review all Action Items for this Quarter and confirm that they are complete, have enough detail and show the full summary of activities that need to be done in order to hit this year\'s Goals'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Sign up for Hootsuite or a similar service to manage your online activity'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Book 1 hour every second day into your calendar (literally!) to update social accounts, respond to messages and maintain a strong online presence for this quarter'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Identify social media platform that your Ideal Client hangs out on most'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Identify social media platform that your Ideal Client hangs out on second most'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Create one 10 day content campaign idea (webinar, content, images) for social media platform #1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Create one 10 day  content campaign idea (webinar, content, images) for social media platform #2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Implement 10 day content campaign idea for social media platform #1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Implement 10 day content campaign idea for social media platform #2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Install Google Analytics'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Install Blog functionality into your website'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Block off two hours in your calendar every two weeks to write a meaningful blog post'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Watch trends in followers, views, likes and traffic to website - based on those trends confirm what is working or not to further inform your strategy'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Check Progress against quarterly goal.   Do gut check and add more action items if needed to increase activity necessary to hit quarterly goals.'}
                    ],
                        [
                            {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Hire someone to work with you for the next 6 months to optimize your SEO'},
                            {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Build and finalize SEO strategy with vendor'},
                            {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Confirm agreement and sign with vendor'},
                            {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Put all Action Items for the SEO agreement into SLAP with deadlines to ensure you track this investment well'},
                            {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Put together a very affordable ($250 or less) paid advertising campaign on social media platform #1'},
                            {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Put together a very affordable ($250 or less) paid advertising campaign on social media platform #2'},
                            {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Watch trends in followers, views, like and traffic to site - based on those trends confirm what is working or not to further inform your strategy'},
                            {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Write first bi-weekly blog post and post'},
                            {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Write second bi-weekly blog post and post'},
                            {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Create a bi-weekly recurring Action Item to write and post a blog post for all months left in your SLAP year'},
                            {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Check Progress against quarterly goal.   Do gut check and add more action items if needed to increase activity necessary to hit quarterly goals.'}
                        ],
                        [
                            {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Based on everything done in Month 1 and Month 2 make a list of all types of content that your Ideal Client responded best to'},
                            {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Based on everything done in Month 1 and Month 2 make a list of which platforms/formats your Ideal Client responded best to'},
                            {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'With the information from Month 1 and Month 2 in hand build out a basic, sustainable online strategy for the next six months'},
                            {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Put ALL Action Items from your six month strategy into your SLAP so you can track each item'},
                            {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'With insight on what your Ideal Client responds to - review all website copy on your website and make copy updates so that it speaks directly to your Ideal Client'},
                            {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Review Quarterly Goals and adjust the next quarter’s Action Items and Quarterly Goals if there is any activity or results you need to make up in the next quarter and/or if there are learnings from this quarter that impact how you are thinking about next quarter.'}
                        ],

                    ]

            },
            {
                strategyId: 9,
                actions: [
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Review all the resources available for Loyalty in SLAPschool, especially Getting Started Guide'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Review all Action Items for this Quarter and confirm that they are complete, have enough detail and show the full summary of activities that need to be done in order to hit this year\'s Goals'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Set up a Loyalty Tracker'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'List your top 20 clients and/or referral partners.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Think carefully about each person. What can you do for them to thank them for the value they’ve brought to you?'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Determine “random act of kindness” for each person'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Implement Random Act of Kindness to client #1'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Implement Random Act of Kindness to client #2'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Implement Random Act of Kindness to client #3'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Implement Random Act of Kindness to client #4'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Implement Random Act of Kindness to client #5'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Check Progress against quarterly goal. Do gut check and add more action items if needed to increase activity necessary to hit quarterly goals.'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Implement Random Act of Kindness to client #6'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Implement Random Act of Kindness to client #7'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Implement Random Act of Kindness to client #8'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Implement Random Act of Kindness to client #9'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Implement Random Act of Kindness to client #10'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Implement Random Act of Kindness to client #11'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Implement Random Act of Kindness to client #12'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Implement Random Act of Kindness to client #13'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Implement Random Act of Kindness to client #14'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Check Progress against quarterly goal. Do gut check and add more action items if needed to increase activity necessary to hit quarterly goals.'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Implement Random Act of Kindness to client #15'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Implement Random Act of Kindness to client #16'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Implement Random Act of Kindness to client #17'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Implement Random Act of Kindness to client #18'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Implement Random Act of Kindness to client #19'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Implement Random Act of Kindness to client #20'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Review Quarterly Goals and adjust the next quarter’s Action Items and Quarterly Goals if there is any activity or results you need to make up in the next quarter and/or if there are learnings from this quarter that impact how you are thinking about next quarter.'}
                    ],

                ]

            },
            {
                strategyId: 10,
                actions: [
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Check in on business reality - how is your business doing as you take this SLAPnap?  Are you sustaining despite not being focused on business development? Do a review to find out and add in any urgent action items if needed in the short term.'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Check in on business reality - how is your business doing as you take this SLAPnap?  Are you sustaining despite not being focused on business development? Do a review to find out and add in any urgent action items if needed in the short term.'}
                    ],
                    [
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Check in on business reality - how is your business doing as you take this SLAPnap?  Are you sustaining despite not being focused on business development? Do a review to find out and add in any urgent action items if needed in the short term.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Look ahead to the next Quarter as you come out of your SLAPnap - review your Actions and Goals and do a Pause & Reflect to get your head back in the game.'},
                        {type: 'action', dueDate: new Date(), progress: 0, feeling: null, notes: '', title:'Block 15 minutes a week into your calendar for the next 3 months to help you invest the time you need to re-develop the SLAPhabits you probably lost in the last 3 months!'}
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
            {
                id: 1,
                name: 'Connect Prep',
                video:'',
                rating: 0,
                reason:'',
                trainig: {
                    videos: [
                        'http://content.jwplatform.com/videos/cQ78Uar8-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/8eLSteNQ-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/cfJt2wPt-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/hIrUfWcP-GL1ajTKI.mp4',
                        'http://content.jwplatform.com/videos/UwPJgBZn-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/EVbdckoz-LQ8oa9pv.mp4',
                    ],
                    books: ['first-book']}
            },
            {
                id: 2,
                name: 'Referrals',
                video:'http://content.jwplatform.com/videos/Oju0w8U8-CZ1S4g0I.mp4',
                rating: 0,
                reason:'',
                trainig: {
                    videos: [
                        'http://content.jwplatform.com/videos/uCpea9S5-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/ZqxAzjKP-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/r4ScfBG2-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/qUCrOHLg-GL1ajTKI.mp4',
                        'http://content.jwplatform.com/videos/pZ2e8qmp-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/wwaTndJ5-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/VwkPnU6Z-LQ8oa9pv.mp4'
                    ],
                    books: [
                        'first-book'
                    ]
                }
            },
            {
                id: 3,
                name: 'Partnerships',
                video:'http://content.jwplatform.com/videos/W9nOxJ5M-CZ1S4g0I.mp4',
                rating: 0,
                reason:'',
                trainig: {
                    videos: [
                        'http://content.jwplatform.com/videos/w2bRrWe3-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/lSuGpIod-GL1ajTKI.mp4',
                        'http://content.jwplatform.com/videos/RabDr2hv-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/iQcooHtu-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/4EgDjddo-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/Cc6R4FFP-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/BA5F03yh-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/OB5VMxdA-LQ8oa9pv.mp4'
                    ],
                    books: [
                        'first-book'
                    ]
                }
            },
            {
                id: 4,
                name: 'Hit List',
                video:'http://content.jwplatform.com/videos/NX9P49PE-CZ1S4g0I.mp4',
                rating: 0,
                reason:'',
                trainig: {
                    videos: [
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        ''
                    ],
                    books: [
                        'first-book'
                    ]
                }
            },
            {
                id: 5,
                name: 'Events',
                video:'http://content.jwplatform.com/videos/NOM9ntVR-CZ1S4g0I.mp4',
                rating: 0,
                reason:'',
                trainig: {
                    videos: [
                        'http://content.jwplatform.com/videos/HxASNP8Q-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/vYDhS2Fg-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/9GReoI6J-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/BipnPBhG-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/oTJHl1RR-GL1ajTKI.mp4',
                        'http://content.jwplatform.com/videos/ECPeo4L9-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/kd35KBbo-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/JMFjhN4U-LQ8oa9pv.mp4',
                    ],
                    books: [
                        'first-book'
                    ]
                }
            },
            {
                id: 6,
                name: 'Media',
                video:'http://content.jwplatform.com/videos/1LDN7hzb-CZ1S4g0I.mp4',
                rating: 0,
                reason:'',
                trainig: {
                    videos: [
                        'http://content.jwplatform.com/videos/4MPLVmlx-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/4dtI7MO5-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/Re6Gboar-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/O0JhQYmz-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/teVU7NZb-GL1ajTKI.mp4',
                        'http://content.jwplatform.com/videos/2SfZQezz-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/xeMf9uOa-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/nig7CYBh-LQ8oa9pv.mp4'
                    ],
                    books: [
                        'first-book'
                    ]
                }
            },
            {
                id: 7,
                name: 'Special Deals',
                video:'http://content.jwplatform.com/videos/uVYTE4Kq-CZ1S4g0I.mp4',
                rating: 0,
                reason:'',
                trainig: {
                    videos: [
                        'http://content.jwplatform.com/videos/acWVTDXi-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/7qnvcRxp-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/mb5vDgM1-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/NJv7Kgsq-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/quccYCOE-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/7D1anqtS-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/VB9sj48Z-GL1ajTKI.mp4',
                    ],
                    books: [
                        'first-book'
                    ]
                }
            },
            {
                id: 8,
                name: 'Online Connecting',
                video:'http://content.jwplatform.com/videos/891qCjsf-CZ1S4g0I.mp4',
                rating: 0,
                reason:'',
                trainig: {
                    videos: [
                        'http://content.jwplatform.com/videos/UIKOt7fz-GL1ajTKI.mp4',
                        'http://content.jwplatform.com/videos/UJ0ZYypc-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/UU5QZ9MN-GL1ajTKI.mp4',
                        'http://content.jwplatform.com/videos/ozhAbLET-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/eP9RKlEu-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/NCXfXUS8-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/Iz6FytOt-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/REhbIkcM-LQ8oa9pv.mp4'
                    ],
                    books: [
                        'first-book'
                    ]
                }
            },
            {
                id: 9,
                name: 'Loyalty',
                video:'http://content.jwplatform.com/videos/mwVZPB6K-CZ1S4g0I.mp4',
                rating: 0,
                reason:'',
                trainig: {
                    videos: [
                        'http://content.jwplatform.com/videos/6DwX7lsR-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/JSikeYAg-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/2Q3N48qV-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/vn4Ibd1U-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/UVqpE3ss-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/fpCxljPt-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/o8TOFXCS-LQ8oa9pv.mp4',
                        'http://content.jwplatform.com/videos/8LZ6H2V1-GL1ajTKI.mp4',
                    ],
                    books: [
                        'first-book'
                    ]
                }
            },
            {
                id: 10,
                name: 'SLAPnap',
                video:'http://content.jwplatform.com/videos/sG2Jy0bq-CZ1S4g0I.mp4',
                rating: 0,
                reason:'',
                trainig: {
                    videos: [
                        'http://content.jwplatform.com/videos/Iv7BB8zD-vTkf1oei.mp4',

                    ],
                    books: [
                        'first-book'
                    ]
                }
            },
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

            var startQuater = moment({year: +startDate.year + ((+startDate.month + 3 * (indexQut - 1) - 1) / 12), month:months[0], day: 1 });
            var endQuater = moment({year: +startDate.year + ((+startDate.month + 3 * (indexQut - 1) + 1) / 12), month:months[2], day: 1 }).endOf('month');
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