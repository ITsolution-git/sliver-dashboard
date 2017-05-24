(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('editableText', editableText);

    function editableText($timeout) {

        var template = [
            '<span class="aqua-green editable outline-0" ng-hide="showInput" ng-dblclick="edit($event)">{{modelValue}}</span>',
            '<input type="text" class="editable-input outline-0" ng-show="showInput" ng-blur="hideInput()" ng-keydown="$event.keyCode === 27 && hideInput()" ng-model="modelValue">'
        ].join(' ');

        return {
            restrict: 'A',
            scope: {
                modelValue: "="
            },
            link: function (scope, el, attr) {

                scope.showInput = false;
                scope.edit = edit;
                scope.hideInput = hideInput;


                function edit(e) {
                    scope.showInput = true;
                    var inputEl = $(e.target).next();
                    inputEl.css('width', e.target.offsetWidth + 20 + 'px');

                    $timeout( function () {
                        inputEl.focus();
                    });
                }

                function hideInput() {
                    scope.showInput = false;
                }
            },
            template: template
        }
    }
}());