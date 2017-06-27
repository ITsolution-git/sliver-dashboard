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

        me.emptySalesItem = {
            type: 'sales',
            title: '',
            notes: '',
            dueDate: moment().format($rootScope.dateFormat),
            progress: 0,
            saleUnit: 0
        };

        me.reflextionData = [
            {
                emotion: 'Motivated & Engaged',
                description: 'description1',
                qas: [
                    {
                        question: 'question1',
                        answer: ''
                    },
                    {
                        question: 'question2',
                        answer: ''
                    }
                ],
                actions:[
                    {
                        title: 'Reward yourselfffdd',
                        added: false
                    },
                    {
                        title: 'Reward yourselfffdd',
                        added: false
                    }
                ]
                
            },
            {
                emotion: 'Detemined & Focused',
                description: 'description1',
                qas: [
                    {
                        question: 'question1',
                        answer: ''
                    },
                    {
                        question: 'question2',
                        answer: ''
                    }
                ],
                actions:[
                    {
                        title: 'Reward yourselfffdd',
                        added: false
                    },
                    {
                        title: 'Reward yourselfffdd',
                        added: false
                    }
                ]
                
            },
            {
                emotion: 'Hopeful On Track',
                description: 'description1',
                qas: [
                    {
                        question: 'question1',
                        answer: ''
                    },
                    {
                        question: 'question2',
                        answer: ''
                    }
                ],
                actions:[
                    {
                        title: 'Reward yourselfffdd',
                        added: false
                    },
                    {
                        title: 'Reward yourselfffdd',
                        added: false
                    }
                ]
                
            },
            {
                emotion: 'Distracted & Unfocused',
                description: 'description1',
                qas: [
                    {
                        question: 'question1',
                        answer: ''
                    },
                    {
                        question: 'question2',
                        answer: ''
                    }
                ],
                actions:[
                    {
                        title: 'Reward yourselfffdd',
                        added: false
                    },
                    {
                        title: 'Reward yourselfffdd',
                        added: false
                    }
                ]
                
            },
            {
                emotion: 'Anxious & Worried About Money',
                description: 'description1',
                qas: [
                    {
                        question: 'question1',
                        answer: ''
                    },
                    {
                        question: 'question2',
                        answer: ''
                    }
                ],
                actions:[
                    {
                        title: 'Reward yourselfffdd',
                        added: false
                    },
                    {
                        title: 'Reward yourselfffdd',
                        added: false
                    }
                ]
                
            },
            {
                emotion: 'Tired & Burned Out',
                description: 'description1',
                qas: [
                    {
                        question: 'question1',
                        answer: ''
                    },
                    {
                        question: 'question2',
                        answer: ''
                    }
                ],
                actions:[
                    {
                        title: 'Reward yourselfffdd',
                        added: false
                    },
                    {
                        title: 'Reward yourselfffdd',
                        added: false
                    }
                ]
                
            },
            {
                emotion: 'Too Busy & Overwhelmed',
                description: 'description1',
                qas: [
                    {
                        question: 'question1',
                        answer: ''
                    },
                    {
                        question: 'question2',
                        answer: ''
                    }
                ],
                actions:[
                    {
                        title: 'Reward yourselfffdd',
                        added: false
                    },
                    {
                        title: 'Reward yourselfffdd',
                        added: false
                    }
                ]
                
            },
        ];
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
            
            if (!refresh && me.excuteItems) {
                deferred.resolve(me.excuteItems);
            } else {
                apiService.rest.all('excuteItems').getList().then(function (excuteItems) {
                    $rootScope.$broadcast('excuteItemsEvent');
                    me.excuteItems = excuteItems.data;

                    deferred.resolve(me.excuteItems);
                });
            }
            
            return deferred.promise;
        };

        me.creatItem = function (item) {
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