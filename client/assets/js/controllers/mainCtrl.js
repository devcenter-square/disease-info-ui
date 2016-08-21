var app = angular.module('mainCtrl', ['diseaseService']);

app.controller('diseaseCtrl', function (Disease, $scope) {

    var vm = this;

    Disease.all()
        .success(function(data) {
            // bind the diseases that come back to vm.diseases

            $scope.diseases = angular.fromJson(data.diseases);

        });

    $scope.currentPage = 1;
    $scope.pageSize = 5;
});

app.controller('individualDiseaseCtrl', function($scope, Disease, $routeParams) {

    var vm = this;

    Disease.get($routeParams.name)
        .success(function(data) {
            $scope.oneDisease = angular.fromJson(data);
        });

    Disease.all()
        .success(function(data) {
            // bind the diseases that come back to vm.diseases
            $scope.diseases = angular.fromJson(data.diseases);
        });
});
