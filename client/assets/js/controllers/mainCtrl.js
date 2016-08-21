var app = angular.module('mainCtrl', ['diseaseService']);


app.filter('source', function() {
    return function(value){
        return value.split("Source is").pop()
    }
});

app.controller('diseaseCtrl', function (Disease, $scope) {

    Disease.all()
        .success(function(data) {
            $scope.diseases = angular.fromJson(data.diseases);

            $scope.diseases.forEach(function(disease) {
                disease.more = disease.more.replace("Source is", "")
            });
        });


    $scope.currentPage = 1;
    $scope.pageSize = 5;
});

app.controller('individualDiseaseCtrl', function($scope, Disease, $routeParams) {

    Disease.get($routeParams.name)
        .success(function(data) {
            $scope.oneDisease = angular.fromJson(data);

            $scope.stripSource = function(address) {
                return address.substring(5);
            }
        });


    Disease.all()
        .success(function(data) {
            $scope.diseases = angular.fromJson(data.diseases);
        });
});


