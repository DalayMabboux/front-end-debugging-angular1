(function () {

    var app = angular.module('frontendDebugging');

    app.factory('UserService', function UserService($http, $window) {

        var LOCALSTORAGE_KEY = 'storedLogin';

        var authenticated = false;
        var userName = null;

        init();

        function init() {
            var storedSession = $window.localStorage.getItem(LOCALSTORAGE_KEY);
            var parsedStoredSession;
            if (storedSession) {
                try {
                    parsedStoredSession = JSON.parse(storedSession);
                    authenticated = parsedStoredSession.authenticated;
                    userName = parsedStoredSession.userName;
                } catch (e) {
                    // remove broken session
                    $window.localStorage.removeItem(LOCALSTORAGE_KEY);
                }
            }
        }

        function isLoggedIn() {
            return authenticated;
        }

        function signOut() {
            authenticated = false;
            userName = null;
            $window.localStorage.removeItem(LOCALSTORAGE_KEY);
        }

        function signIn(loginName, password) {
            return $http.get('resources/authentication/' + loginName + '.json').then(function (response) {
                authenticated = response.data.authenticated;
                if (authenticated) {
                    userName = loginName;
                    $window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(new Session(userName, authenticated)));
                }
                return authenticated;
            });
        }

        function getUserName() {
            return userName;
        }

        function Session(userName, authenticated) {
            this.userName = userName;
            this.authenticated = authenticated;
        }

        return {
            signOut: signOut,
            signIn: signIn,
            isLoggedIn: isLoggedIn,
            getUserName: getUserName
        };
    });


}());