var app = angular.module('diseaseService', [])

app.factory('Disease', function($http) {

    var diseaseFactory = {};

    // get all diseases
    diseaseFactory.all = function() {
        return $http.get('https://disease-info-api.herokuapp.com/diseases/');
    };

    // get a single disease
    diseaseFactory.get = function(name) {
        return $http.get('https://disease-info-api.herokuapp.com/diseases/' + name);
    };

    return diseaseFactory;

});