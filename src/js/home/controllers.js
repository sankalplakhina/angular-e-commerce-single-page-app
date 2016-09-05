angular.module('homeView', [])

.controller('HomeCntrlr', ['$scope', 'HomeDataSvc', '$timeout', 'LoginSvc', '$location', 'CartDataSvc',
function($scope, HomeDataSvc, $timeout, LoginSvc, $location, CartDataSvc){
	
	var TAX_PERCENT = 0.5;
	
	$scope.STOCK_LIMIT = 10;
	$scope.sizeOfObj = Object.keys;
	$scope.sortAsc = true;

	// getting data from services and binding them to scope by reference
	$scope.correctSession = LoginSvc.getloginStatus();

	$scope.cartData = CartDataSvc.get().cartData;
	$scope.cartCalcs = CartDataSvc.get().cartCalcs;
	
	$scope.homeData = {};
	HomeDataSvc.get().then(function(homeData){
		$scope.homeData.categories = homeData.categories;
		$scope.homeData.details = homeData.details
	});

	$scope.sortDataByPrice = function(){
		$scope.sortAsc = !$scope.sortAsc;
	};

	$scope.addToCart = function(itemObj) {

		var product = itemObj;
		if (product.in_cart) {
			// already in cart, just update quantity
			return $scope.increaseQty(product);
		}
		product.in_cart = true;
		product.qty = ++product.qty;
		$scope.cartData[itemObj.id] = product;
		return calculateTotal();
	};

	$scope.increaseQty = function(itemObj) {
		if (itemObj.qty === $scope.STOCK_LIMIT) {
			return;
		}
		itemObj.qty = ++itemObj.qty;
		return calculateTotal();
	};

	$scope.decreaseQty = function(itemObj) {
		itemObj.qty = --itemObj.qty;
		if (itemObj.qty === 0) {
			itemObj.in_cart = false;
			delete $scope.cartData[itemObj.id];
		}
		return calculateTotal();
	};

	function calculateTotal () {
		var cartData = $scope.cartData;
		var cartCalcs = $scope.cartCalcs;
		
		cartCalcs.subtotal = 0;
		
		if ($scope.sizeOfObj(cartData).length) {
			angular.forEach(cartData, function(itemData, itemId){
				cartCalcs.subtotal += (itemData.qty * itemData.price);
			});
		}
		cartCalcs.taxAmt = TAX_PERCENT * cartCalcs.subtotal;
		cartCalcs.totalAmt = cartCalcs.subtotal + cartCalcs.taxAmt;
	};

}]);
