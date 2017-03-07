(function () {
    'use strict';

    angular
        .module('app.filters')
        .filter('value', valueFilter);

    function valueFilter() {
        var parseString = function (input) {
            return input
                .replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
                .replace(/^\./, '') // strip a leading dot
                .split('.');
        };

        function getValue(object, propertyArray, defaultValue) {
            var value = object;

            for (var i = 0, n = propertyArray.length; i < n; ++i) {
                if (angular.isUndefined(value)){
                    return defaultValue;
                }
                var key = propertyArray[i];
                if (key in value) {
                    value = value[key];
                } else {
                    return defaultValue;
                }
            }

            return value;
        }

        // использование из js $filter('value')(obj,'part3[0].name')
        // использование из шаблона {{ obj | value:'part3[0].name' }}

        return function (object, pathString, defaultValue) {
            return getValue(object, parseString(pathString), defaultValue);
        }
    }
})();