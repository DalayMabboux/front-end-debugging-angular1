(function () {

    var app = angular.module('frontendDebugging');

    app.controller('MemoryController', function MemoryController($rootScope, UserService) {
        var memory = this;

        memory.userName = '';

        // just generating some big object to have an impact when this controller is not freed
        var documentAsJSON = JSON.stringify(document);
        memory.bigObject = [];
        for(var i=0; i<100000; i++) {
            memory.bigObject.push({
                index: i,
                someNumber: Math.random(),
                longString: documentAsJSON + i // making sure it doesn't reference the same string
            });
        }

        // leak
        $rootScope.$watch(UserService.getUserName, function(newVal) {
            memory.userName = newVal;
        });

    });


}());