(function() {
    'use strict';

    angular
        .module('manage.emailtemplates.module')
        .controller('EmailtemplatesManageController', EmailtemplatesManageController);

    /* @ngInject */
    function EmailtemplatesManageController($scope, $state, pageService, NgTableParams, emailTemplateService) {

        $scope.cols = [
            {
                field: "name",
                title: "Name",
                show: true,
                format: 'raw',
                getValue: function (row) {
                    return '<a href="' + $state.href('emailtemplates.item', {emailtemplate_name: row['name']}) + '">' + row['name'] + '</a>';
                }
            },{
                field: "action",
                title: "",
                format: 'compile',
                getValue: function (row) {
                    return '<a class="btn btn-primary btn-sm" ui-sref="' + $state.href('emailtemplates.item', {emailtemplate_name: row['name']}) + '"><span class="glyphicon glyphicon-edit"></span></a>';
                    // return '<button class="btn btn-danger btn-sm" ng-click="delete(row)"><span class="glyphicon glyphicon-trash"></span></button>';
                }
            }
        ];

        function getValue(row) {
            return row[this.field];
        }

        $scope.list = new NgTableParams({},
            {
                getData: function (params) {
                    return emailTemplateService.list()
                        .then(function (response) {
                            // console.log(response.data);
                            return response.data.map(function(e) { return {name: e}; });
                        });
                }
            }
        );

        // $scope.delete = function(row) {
        //     emailtemplateService.delete(row).then(function() {
        //         $scope.list.reload();
        //     });
        // };

        pageService
            .reset()
            .addCrumb({name: 'Email Templates', path: 'emailtemplates.list'})
            .setPageTitle('Manage Email Templates');
    }
}());