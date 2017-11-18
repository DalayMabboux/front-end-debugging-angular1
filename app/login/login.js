(function () {

    var app = angular.module('frontendDebugging');

    app.controller('LoginController', function LoginController(UserService, $state, $window) {
        var login = this;

        login.userName = '';
        login.password = '';

        if(UserService.isLoggedIn()) {
            $state.go('/welcome');
        }

        login.doLogin = function() {
            UserService.signIn(login.userName, login.password).then(function(authenticated) {
                if(authenticated) {
                    $state.go('welcome');
                } else {
                    $window.alert('Username or password wrong!');
                }
            });
        };

    });


}());