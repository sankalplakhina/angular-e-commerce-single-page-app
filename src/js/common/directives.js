angular.module('commonViews')

.directive('appHeader', [function(){
	return {
		scope: {},
		restrict: "AE",
		replace: true,
		transclude: true,
		templateUrl: '/src/js/common/views/appHeader.html',
		link: function(scope, iElm, iAttrs, controller) {
			// console.log("in directive's link function");
		}
	};
}])

.directive('appFooter', [function(){
	return {
		scope: {},
		restrict: "E",
		replace: true,
		transclude: true,
		templateUrl: '/src/js/common/views/appFooter.html',
		link: function(scope, iElm, iAttrs, controller) {
			// console.log("in directive's link function");
		}
	};
}]);
