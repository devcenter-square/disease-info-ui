var app = angular.module('mainCtrl', ['diseaseService']);


app.filter('source', function() {
    return function (value) {
        if (value) return value.split("Source is").pop();
        return [];
    }
});

app.filter('hyphen', function() {
    return function(value){
        if (value) return value.split("/").pop("-");
        return [];
    }
});

app.filter('diseasesFilter', function () {
    return function (items, search) {
        if (!search) return items;
        return items.filter(function (element, index, array) {
            return element.name._looksLikeItContains(search) > 0.3;
        }).sort(function (a, b) {
            return b.name._looksLikeItContains(search) - a.name._looksLikeItContains(search);
        });
    }
});

app.controller('diseaseCtrl', function (Disease, $scope) {

    Disease.all()
        .success(function(data) {
            $scope.diseases = angular.fromJson(data.diseases);
            stor.add("diseases", $scope.diseases);
        }).error(function (err, obj) {
            console.error(err, obj);
            $scope.diseases = stor.get("diseases") || [];
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
        }).error(function (err, obj) {
            console.error(err, obj);
            $scope.diseases = stor.get("diseases") || [];
        });
});


