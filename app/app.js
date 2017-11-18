(function () {

    var app = angular.module('frontendDebugging', [
        'ui.router'
    ]);

    app.config(function($stateProvider, $urlRouterProvider) {

        $stateProvider.state('welcome', {
            url: '/welcome',
            templateUrl: 'app/welcome/welcome.html',
            controller: 'WelcomeController as welcome'
        });

        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'app/login/login.html',
            controller: 'LoginController as login'
        });

        $stateProvider.state('memory', {
            url: '/memory',
            templateUrl: 'app/memory/memory.html',
            controller: 'MemoryController as memory'
        });

        $urlRouterProvider.otherwise('/welcome');

    });

    app.controller('navController', function navController($scope, UserService) {
        var nav = this;

        nav.signOut = UserService.signOut;
        nav.authenticated = false;
        nav.userName = null;

        $scope.$watch(UserService.isLoggedIn, function(newVal) {
            if(typeof newVal === 'boolean') {
                nav.authenticated = newVal;
            }
        });

        $scope.$watch(UserService.getUserName, function(newVal) {
            nav.userName = newVal;
        });

    });

    // app.filter('orderByValue', function () {
    //     // custom value function for sorting
    //     function myValueFunction(schedule) {
    //         return schedule.score;
    //     }
    //
    //     return function (obj) {
    //         var array = [];
    //         Object.keys(obj).forEach(function (key) {
    //             // inject key into each object so we can refer to it from the template
    //             obj[key].name = key;
    //             array.push(obj[key]);
    //         });
    //         // apply a custom sorting function
    //         array.sort(function (a, b) {
    //             return myValueFunction(a) - myValueFunction(b);
    //         });
    //         return array;
    //     };
    // });

}());