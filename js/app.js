//Data
var cities = [
    {
        city : 'India',
        desc : 'This is the best country in the world!',
        lat : 40.010859,
        long : -105.169075
    },
    {
        city : 'New Delhi',
        desc : 'The Heart of India!',
        lat : 28.500000,
        long : 77.250000
    },
    {
        city : 'Mumbai',
        desc : 'Bollywood city!',
        lat : 19.000000,
        long : 72.90000
    },
    {
        city : 'Kolkata',
        desc : 'Howrah Bridge!',
        lat : 22.500000,
        long : 88.400000
    },
    {
        city : 'Chennai  ',
        desc : 'Kathipara Bridge!',
        lat : 13.000000,
        long : 80.250000
    }
];

//Angular App Module and Controller
var sampleApp = angular.module('mapsApp', []);

sampleApp.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
        .when("/", {
            templateUrl: "views/map.html",
            controller: "MapCtrl"
        })
        .otherwise ({
        redirectTo: "/"
    });

});
