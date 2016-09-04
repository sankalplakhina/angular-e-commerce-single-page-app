angular.module('homeView')

.service('HomeDataSvc', ['$http', '$q', function($http, $q) {

    var service = this;
    
    var homeData = {},
        promise = null,
        deferred = $q.defer(),
        alreadyFetched = false;

    service.get = function() {

        if (alreadyFetched) {
            deferred.resolve(homeData);
        }
        else {
            if (!promise) {
                promise = $http.get('/api/products');
            }
            promise.then(function (res) {
                homeData = res.data;
                alreadyFetched = true;
                promise = null;
                deferred.resolve(homeData);
            });
        }
        return deferred.promise;
    };

}]);
