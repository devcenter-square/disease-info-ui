var app = angular.module('diseaseService', [])

app.factory('Disease', function($http) {

    var diseaseFactory = {};

    // get all diseases
    diseaseFactory.all = function() {
        return $http.get('https://disease-info-api.herokuapp.com/');
    };

    // get a single disease
    diseaseFactory.get = function(name) {
        return $http.get('https://disease-info-api.herokuapp.com/' + name);
    };

    var schema = {
        stores: [{
            name: "diseases",
            indexes: [{
                keyPath: 'id'
            }]
        }]
    }

    diseaseFactory.db = new ydn.db.Storage("disease_info", schema);

    return diseaseFactory;

});