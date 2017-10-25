(function() {
    'use strict';

    angular
        .module('app.services')
        .service('idealclientService', idealclient);

    function idealclient() {
        var _idealClientSelects = {
            gender: ['Gender', 'Male', 'Female'],
            maritalStatus: ['Marital Status', 'Single', 'Married', 'Divorced', 'Widowed'], //TODO: service select data
            kids: ['Kids\' Age', 'No Children', 'Young Kids', 'Teen Kids',' Grown Children'],
            
            employment: ['Employment', 'Doesn’t Work', 'owns a big business', 'owns a small business', 'works a senior level job', 'works a mid level job', 'works a junior level job'],

            location: ['Location', ' the City', ' the suburbs', 'somewhere Rural'],
            home: ['Home', 'Condo', 'Apartment', 'House', 'Farm', 'Other'],
            transit: ['Transit', 'Car', 'Biking', 'Train', 'Walking', 'Flying', 'Subway'],
            age: ['Age','11-20','21-30','31-40','41-50','51-60','61-70','71-80','81-90'],
            hobbies: ['Hobbies', 'Volunteer', 'Work Out', 'Shop', 'Travel', 'Play Sports', 'Read', 'See Film/Theater/Art', 'Watch Sports'],
            reads: ['Reads', 'Business Books', 'Self Help Books', ' Magazines', 'Novels', 'Blogs',  'the News']
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