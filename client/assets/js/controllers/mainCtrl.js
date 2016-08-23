var app = angular.module('mainCtrl', ['diseaseService']);


app.filter('source', function() {
    return function(value){
        return value.split("Source is").pop()
    }
});

app.controller('diseaseCtrl', function (Disease, $scope, $localStorage) {

    Disease.all()
        .success(function(data) {
            $scope.diseases = angular.fromJson(data.diseases);

        });


    $scope.currentPage = 1;
    $scope.pageSize = 5;
});

app.controller('individualDiseaseCtrl', function($scope, Disease, $routeParams) {

    Disease.get($routeParams.name)
        .success(function(data) {
            $scope.oneDisease = angular.fromJson(data);
        });


    Disease.all()
        .success(function(data) {
            $scope.diseases = angular.fromJson(data.diseases);
        });
});


