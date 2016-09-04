angular.module('commonViews')

.service('CartDataSvc', ['$http', function($http) {

    var service = this;
    
    var cartData = {};
    var cartCalcs = {};
    
    service.get = function() {
    	return {
    		cartData: cartData,
    		cartCalcs: cartCalcs
    	};
    };

}])

.service('LoginSvc', ['$http', function($http) {

    var service = this;

    var loginData = {
    	status: false
    };
    
    service.validateAuthentication = function(postBody) {
    	return $http.post('/api/auth/login', postBody)
    		   .success(function(res){
    		   		loginData.status = res.status;
    		   });
    };

    service.getloginStatus = function(){
    	return loginData.status;
    };

}]);
