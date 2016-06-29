/**
 * Created by tancw on 2016/6/27.
 */
var app = angular.module('app', ["ui.router", "ngCookies"]);

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

app.service('$base', function () {
    return this;
});

app.filter('formatJson', function () {
    return function (x) {
        return JsonUti.convertToString(x);
    }
});

app.filter('orderByTemp', function () {
    return function (x) {
        var temp = {};
        if (typeof x == 'object') {
            temp.touser = '你的openid';
            temp.template_id = '{{template_id}}';
            temp.url = 'http://www.ittun.com';
            temp.data = x.data;
        }
        return temp;
    }
});

app.controller('TempListController', function ($scope, $http) {
    $http.get('templist').success(function (response) {
        $scope.temps = response;
    });
});

app.controller('layoutController', function ($scope, $http, $cookies,$state) {
    $scope.access_token = $cookies.get('access_token');
    $scope.temps;

    if ($scope.access_token) {
        $http.get('loadUserTemp?access_token=' + $scope.access_token).success(function (data) {
            $scope.temps = data.temps;
        });
    }

    $scope.loadTemp = function () {
        $scope.loadResult = '';
        $http.get('loadTemp?access_token=' + $scope.access_token).success(function (response) {
            if (response.data.errcode) {
                $scope.loadResult = response.data;
            } else {
                $scope.temps = response.data.template_list;
                $cookies.put("access_token", $scope.access_token);
            }
        });
    }

    $state.go('temps');
});

app.controller('TempDetailController', function ($scope, $http, $stateParams) {
    $http.get('getTemp?id=' + $stateParams.id).success(function (response) {
        $scope.temp = response;
    });
});

