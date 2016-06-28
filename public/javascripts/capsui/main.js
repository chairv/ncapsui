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
        url: "/detail/:id",
        templateUrl: "html/detail.html",
        controller: 'TempDetailController'
    });
});

app.filter('formatJson', function () {
    return function (x) {
        console.info(x);
        return JsonUti.convertToString(x);
    }
});

app.controller('TempListController', function ($scope, $http) {
    $http.get('templist').success(function (response) {
        $scope.temps = response;
    });
});

app.controller('layoutController', function () {

});

app.controller('TempDetailController', function ($scope, $http, $stateParams) {
    $http.get('getTemp?id=' + $stateParams.id).success(function (response) {
        console.info(response);
        $scope.temp = response;
    });
});

