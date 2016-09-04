angular.module('successView', [])

.controller('SuccessCntrlr', ['$scope', 'CartDataSvc', 'LoginSvc',
function($scope, CartDataSvc, LoginSvc){

	$scope.correctSession = LoginSvc.getloginStatus();
	
	$scope.sizeOfObj = Object.keys;

	$scope.cartData = CartDataSvc.get().cartData;
	$scope.cartCalcs = CartDataSvc.get().cartCalcs;

}]);
