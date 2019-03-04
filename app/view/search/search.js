'use strict';

const APIKEY = '194333f5b09188fbda8c4a3bbfea30b2';
const url = `http://api.openweathermap.org/data/2.5/group?id={{ids}}&units=metric&appid=${APIKEY}`;

// Helper function to clear any errors
function clearErrorMessage($scope) {
    $scope.errorMessage = '';
}

// Helper function to get n number of random samples
function getRandom(arr, n) {
    let result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        const x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

// Filter city IDs
function getCityIds(cities) {
    return cities.map((city) => city.id);
}

angular

    .module('weatherApp.search', ['ngRoute', 'ngTable'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'view/search/search.html',
            controller: 'SearchCtrl'
        });
    }])

    .controller('SearchCtrl', ['$http', '$scope', '$window', 'NgTableParams', function ($http, $scope, $window, NgTableParams) {

        $scope.cityDataSuccess = false;
        let cityList = [];

        // Grab the city data sample
        $http({
            method: 'GET',
            url: 'data/city-list.json'
        }).then(function success(response) {
            cityList = response.data;
            $scope.cityDataSuccess = true; // `ng-show` the form if `true`
        }, function error() {
            $scope.errorMessage = 'There was a problem retreving the city data.';
        });

        // Set default value
        $scope.cityNumber = 10;

        // On button click
        $scope.getWeather = function () {

            // Clear any errors
            clearErrorMessage($scope, $window);

            const randomCities = getRandom(cityList, $scope.cityNumber);
            const randomCitiesIds = getCityIds(randomCities).join();

            const randomCitiesUrl = url.replace('{{ids}}', randomCitiesIds);

            console.log(randomCitiesIds)

            // Make the http request and handle the response
            $http({
                method: 'GET',
                url: randomCitiesUrl
            }).then(function success(response) {
                $scope.tableParams = new NgTableParams({ count: 5 }, { counts: [5, 10, 20], dataset: response.data.list });
            }, function error() {
                $scope.errorMessage = 'There was a problem retreving the weather data.';
            });

        };

    }]);
