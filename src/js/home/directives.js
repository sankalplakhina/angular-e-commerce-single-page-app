angular.module('homeView')

.directive('itemCard', [function(){
	return {
		scope: false,
		template: '<div>itemCard</div>',
		link: function(scope, iElm, iAttrs, controller) {
			// console.log("in directive's link function");
		}
	};
}]);
