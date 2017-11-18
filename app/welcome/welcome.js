(function () {

    var app = angular.module('frontendDebugging');

    app.controller('WelcomeController', function WelcomeController($scope, UserService) {
        var welcome = this;

        welcome.hello = 'Hello from WelcomeController';
        welcome.authenticated = false;

        $scope.$watch(UserService.isLoggedIn, function(newVal) {
            if(typeof newVal === 'boolean') {
                welcome.authenticated = newVal;
            }
        });

    });


}());