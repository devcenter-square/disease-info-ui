var app = angular.module('mainCtrl', ['diseaseService']);


app.filter('source', function () {
    return function (value) {
        if (value) return value.split("Source is").pop();
        return [];
    }
});

app.filter('hyphen', function () {
    return function (value) {
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
    $scope.dfactory = Disease;
    Disease.all()
        .success(function (data) {
            $scope.diseases = angular.fromJson(data.diseases);
            $scope.diseases.forEach(function (d) {
                $scope.dfactory.db.put("diseases", d, d.id);
            });
            //stor.add("diseases", $scope.diseases);
        }).error(function (err, obj) {
            //$scope.diseases = stor.get("diseases") || [];
            $scope.dfactory.db.from("diseases").list(1000).done(function (results) {
                $scope.diseases = results;
            }).fail(function (err, obj) {
                console.error(err, obj);
            });
            console.error(err, obj);
        });


    $scope.currentPage = 1;
    $scope.pageSize = 5;
});

app.controller('individualDiseaseCtrl', function ($scope, Disease, $routeParams) {
    function encodeName(name) {
        return (name || 'one-disease').toLowerCase().replace(/ /g, '-');
    }

    $scope.dfactory = Disease;

    Disease.get($routeParams.name)
        .success(function (data) {
            $scope.oneDisease = angular.fromJson(data);
            //console.log($scope.oneDisease);
            $scope.dfactory.db.put("diseases", $scope.oneDisease.disease, $scope.oneDisease.disease.id);
            //stor.add(encodeName($routeParams.name), $scope.oneDisease);
        }).error(function (err, obj) {
            /*$scope.oneDisease = stor.get(encodeName($routeParams.name));
            if (!$scope.oneDisease) {
                $scope.oneDisease = $scope.diseases.filter(function (disease) {
                    return disease.name.toLowerCase() == $routeParams.name.toLowerCase();
                })[0];
            }*/
            if ($scope.diseases) { //if diseases have been gotten from Diseases.all() promise
                $scope.oneDisease = {}
                $scope.oneDisease.disease = $scope.diseases.filter(function (disease) {
                    return disease.name.toLowerCase() == $routeParams.name.toLowerCase();
                })[0];
            }
            else {
                $scope.dfactory.db.from("diseases").list(1000).done(function (results) {
                    $scope.diseases = results;
                    $scope.oneDisease = {}
                    $scope.oneDisease.disease = $scope.diseases.filter(function (disease) {
                        return disease.name.toLowerCase() == $routeParams.name.toLowerCase();
                    })[0];
                }).fail(function (err, obj) {
                    console.error(err, obj);
                });
            }
            console.error(err, obj);
        });

    Disease.all()
        .success(function (data) {
            $scope.diseases = angular.fromJson(data.diseases);
        }).error(function (err, obj) {
            console.error(err, obj);
            //$scope.diseases = stor.get("diseases") || [];
            $scope.dfactory.db.from("diseases").list(1000).done(function (results) {
                $scope.diseases = results;
            }).fail(function (err, obj) {
                console.error(err, obj);
            });
        });
});


