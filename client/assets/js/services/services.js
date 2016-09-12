var app = angular.module('diseaseService', [])

app.factory('Disease', function($http) {

    var diseaseFactory = {};

    // get all diseases
    diseaseFactory.all = function() {
        return $http.get('https://disease-info-api.herokuapp.com/diseases/');
    };

    // get a single video
    diseaseFactory.get = function(name) {
        return $http.get('https://disease-info-api.herokuapp.com/diseases/' + name);
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