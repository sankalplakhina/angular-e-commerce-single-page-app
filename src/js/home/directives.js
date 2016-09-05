angular.module('homeView')

.directive('categoryCard', [function(){
	return {
		scope: {
			category: "=",
			homeData: "=",
			sortAsc: "=",
			addToCart: "="
		},
		restrict: "AE",
		replace: true,
		templateUrl: '/src/js/home/views/categoryCard.html',
		link: function(scope, iElm, iAttrs, controller) {
			// console.log("in directive's link function");
			scope.orderingFn = function(item){
				var itemObj = scope.homeData.details[item.id];
				if (itemObj && itemObj.price) {
					if (scope.sortAsc) {
						return itemObj.price;
					}
					else {
						return -itemObj.price;
					}
				}
				return false;
			};
		}
	};
}])

.directive('itemCard', [function(){
	return {
		scope: {
			item: "=",
			homeData: "=",
			addToCart: "="
		},
		restrict: "AE",
		replace: true,
		templateUrl: '/src/js/home/views/itemCard.html',
		link: function(scope, iElm, iAttrs, controller) {
			// console.log("in directive's link function");
		}
	};
}]);
