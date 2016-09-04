angular.module('homeView')

.directive('someCard', [function(){
	return {
		scope: {},
		template: '/<div>someCard</div>',
		link: function(scope, iElm, iAttrs, controller) {
			console.log("in directive's link function");
		}
	};
}]);
