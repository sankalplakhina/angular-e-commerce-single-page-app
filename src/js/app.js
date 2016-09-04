angular.module('ecommerceApp', ['ngRoute', 'commonViews', 'homeView'])

.config(["$routeProvider", "$locationProvider", "$httpProvider",
function($routeProvider, $locationProvider, $httpProvider) {

    $routeProvider
        .when("/", {
            templateUrl: "/src/js/home/views/index.html",
            controller: "HomeCntrlr"
        })
        .when("/home", {
            templateUrl: "/src/js/home/views/index.html",
            controller: "HomeCntrlr"
        })
        .otherwise({
            redirectTo: '/'
        });

    // enabling html5Mode for pushstate ('#'-less URLs)
    $locationProvider.html5Mode(true);
}])

.run(["$rootScope", function ($rootScope) {

    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        document.getElementsByTagName('body')[0].scrollTop = 0;
    });

}]);
