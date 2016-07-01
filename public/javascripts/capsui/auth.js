/**
 * Created by tancw on 2016/6/23.
 */
//全局变量
app.constant('AUTH_EVENTS',{
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
});

app.constant('USER_ROLES', {
    all: '*',
    admin: 'admin',
    editor: 'editor',
    guest: 'guest'
})

//认让Service
app.factory('AuthService', function ($http, Session) {
    var authService = {};

    authService.login = function (credentials) {
        return $http
            .post('/login.do', credentials)
            .then(function (res) {
                Session.create(res.data.id, res.data.user.id,
                    res.data.user.role);
                return res.data.user;
            });
    };
    
    authService.logout = function () {
        Session.destroy();
    }

    authService.isAuthenticated = function () {
        return !!Session.userId;
    };

    authService.isAuthorized = function (authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }
        return (authService.isAuthenticated() &&
        authorizedRoles.indexOf(Session.userRole) !== -1);
    };
    return authService;
})

app.service('Session', function () {
    this.create = function (sessionId, userId, userRole,access_token) {
        this.id = sessionId;
        this.userId = userId;
        this.userRole = userRole;
        this.access_token = access_token;
    };
    this.destroy = function () {
        this.id = null;
        this.userId = null;
        this.userRole = null;
        this.access_token = null;
    };
    return this;
})

app.controller("layoutController",function ($scope,USER_ROLES,AuthService) {
    $scope.currentUser = null;
    $scope.userRoles = USER_ROLES;
    $scope.isAuthorized = AuthService.isAuthorized;
    $scope.setCurrentUser = function (user) {
        $scope.currentUser = user;
    };
})


app.controller('LoginController',function ($scope, $rootScope, AUTH_EVENTS, AuthService,$state) {
   $scope.credentials = {
       username:'',
       password:''
   };
    $scope.login = function () {
        AuthService.login($scope.credentials).then(function (user) {
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            $scope.setCurrentUser(user);
            $state.go('temps');
        },function () {
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        });
    };
    
    $scope.logout = function () {
        AuthService.logout().then(function () {
            $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        });
    }
});
