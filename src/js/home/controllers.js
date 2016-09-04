angular.module('homeView', [])

.controller('HomeCntrlr', ['$scope', 'HomeDataSvc', function($scope, HomeDataSvc){
	
	var TAX_PERCENT = 0.5;
	
	$scope.STOCK_LIMIT = 10;
	$scope.sizeOfObj = Object.keys;
	$scope.cartData = {};
	$scope.cartCalcs = {};
	$scope.homeData = {};
	
	HomeDataSvc.get().then(function(homeData){
		$scope.homeData.categories = homeData.categories;
		$scope.homeData.details = homeData.details
	});

	$scope.sortAsc = true;
	$scope.sortDataByPrice = function(){
		$scope.sortAsc = !$scope.sortAsc;
	};

	$scope.orderingFn = function(item){
		if ($scope.homeData.details[item.id] && $scope.homeData.details[item.id].price) {
			if ($scope.sortAsc) {
				return $scope.homeData.details[item.id].price;
			}
			else {
				return -$scope.homeData.details[item.id].price;
			}
		}
		return false;
	};

	$scope.addToCart = function(item) {
		var product = $scope.homeData.details[item.id];
		if (product.in_cart) {
			// already in cart, just update quantity
			return $scope.increaseQty(product);
		}
		product.in_cart = true;
		product.qty = ++product.qty;
		$scope.cartData[item.id] = product;
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
