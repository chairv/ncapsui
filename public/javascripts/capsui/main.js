/**
 * Created by tancw on 2016/6/27.
 */
var app = angular.module('app', ["ui.router"]);

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/temps");
    $stateProvider.state('temps', {
        url: "",
        templateUrl: 'html/temps.html',
        controller: 'TempListController'
    }).state('detail', {
        url: "/detail",
        params: {
            _id: null,
            title: null,
            content: null,
            example: null
        },
        templateUrl: "html/detail.html",
        controller: 'TempDetailController'
    });
});

app.controller('TempListController', function ($scope, $http) {
    $http.get('templist').success(function (response) {
        $scope.temps = response;
    });
});

app.controller('layoutController', function () {

});
app.controller('TempDetailController', function ($scope, $stateParams) {
    console.info($stateParams);
});

