(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('editableSelect', editableSelect);

    function editableSelect($timeout) {

        var template = [
            '<span class="editable outline-0" ng-hide="showField" ng-dblclick="edit($event)">{{valuesList[+modelValue]}}</span>',
            '<select class="editable-select outline-0" ng-show="showField" ng-blur="hideField()" ng-keydown="$event.keyCode === 27 && hideField()" ng-model="modelValue">',
            '<option ng-repeat="item in valuesList" value="{{$index}}">{{item}}</option>',
            '</select>'
        ].join(' ');

        return {
            restrict: 'A',
            scope: {
                modelValue: "=",
                valuesList: "="       // list of all select tag options
            },
            link: function (scope, el, attr) {

                scope.showField = false;
                scope.edit = edit;
                scope.hideField = hideField;


                function edit(e) {
                    scope.showField = true;
                    var inputEl = $(e.target).next();
                    inputEl.css('width', e.target.offsetWidth + 45 + 'px');

                    $timeout( function () {
                        inputEl.focus();
                    });
                }

                function hideField() {
                    scope.showField = false;
                }
            },
            template: template
        }
    }
}());
