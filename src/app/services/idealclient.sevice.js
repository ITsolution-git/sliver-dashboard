(function() {
    'use strict';

    angular
        .module('app.services')
        .service('idealclientService', idealclient);

    function idealclient() {
        var _idealClientSelects = {
            gender: ['Gender', 'Male', 'Female'],
            maritalStatus: ['Marital Status', 'Single', 'Married', 'Divorced', 'Widowed'], //TODO: service select data
            kids: ['Kids\' Age', 'None', 'Young', 'Teens',' Adults'],
            
            employment: ['Employment', 'Doesn’t Work', 'Established Entrepreneur', 'Small Entrepreneur', 'Senior Employed', 'Mid Level Employed', 'Junior Employed'],

            location: ['Location', 'City', 'Suburbs', 'Rural', 'Other'],
            home: ['Home', 'Condo', 'Apartment', 'House', 'Farm', 'Other'],
            transit: ['Transit', 'Car', 'Bike', 'Train', 'Walking', 'Planes', 'Other'],
            age: ['Age','11-20','21-30','31-40','41-50','51-60','61-70','71-80','81-90'],
            hobbies: ['Hobbies', 'Volunteering',  'Working Out', 'Shopping',  'Traveling',   'Sports',  'Reading',  'Arts & Culture'],
            reads: ['Reads', 'Business Book', 'Self Help Book', 'Magazine', 'Novel', 'Blog Posts',  'Newspaper']
        }
        this.getClientSliders = getClientSliders;
        this.calcIdealClient = calcIdealClient;

        ////////////////////////////

        function getClientSliders() {
            return _idealClientSelects;
        }


        function calcIdealClient(clients){
            var scores = {};
            var idealClient = {};
            _.each(clients, function(client){
                for (var key in client){
                    if (key != 'name') {
                        if (typeof scores[key] == 'undefined') {
                            scores[key] = {};
                        }
                        
                        if (typeof scores[key][client[key]] == 'undefined') {
                            scores[key][client[key]] = 1;
                        } else {
                            scores[key][client[key]] += 1;
                        }
                    }
                }
            });
            
            for (var key in scores) {
                var maxItemKey;
                var maxValue = 0;
                for (var item in scores[key]) {
                    if (scores[key][item] > maxValue) {
                        maxItemKey = item;
                        maxValue = scores[key][item];
                    } 
                }
                
                idealClient[key] = [];
                for (var item in scores[key]) {
                    if (scores[key][item] == maxValue) {
                        idealClient[key].push(item);
                    } 
                }
            }
            return idealClient;
        }
    }
}());