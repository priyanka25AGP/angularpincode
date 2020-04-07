/** Initialize angular app **/

var App = angular.module('pinCodes', ['ngRoute']);

//some global selector
App.$body = $('body');
App.$document = $(document);

App.config([
    '$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl'
            });
    }
]);

