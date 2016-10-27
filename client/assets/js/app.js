


$(document).ready(function () {

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrolltop').fadeIn();
        } else {
            $('.scrolltop').fadeOut();
        }
    });

    $('.scroll').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

});

var app = angular.module('diseaseinfo', ['ngRoute', 'ngAnimate', 'mainCtrl', 'diseaseService', 'angular-loading-bar', 'angularUtils.directives.dirPagination']);

app.config(function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider

        .when('/', {
            templateUrl: './views/partials/home.html',
            controller: 'diseaseCtrl'
        })

        .when('/:name', {
            templateUrl: './views/partials/individualdisease.html',
            controller: 'individualDiseaseCtrl',
            controllerAs: 'individual'
        })

        .when('/:name/:sub', {
            templateUrl: './views/partials/individual-disease-sub.html',
            controller: 'individualDiseaseCtrl',
            controllerAs: 'individual'
        });
});

