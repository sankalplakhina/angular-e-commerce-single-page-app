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
}])

.directive('checkoutBtn', ['LoginSvc', '$timeout', '$location', function(LoginSvc, $timeout, $location){
	return {
		scope: {
			cartCalcs: "="
		},
		restrict: "AE",
		replace: true,
		templateUrl: '/src/js/common/views/checkoutBtn.html',
		link: function(scope, iElm, iAttrs, controller) {
			// console.log("in directive's link function");
			scope.correctSession = LoginSvc.getloginStatus();
			scope.openCheckoutWindow = function(){
				if (scope.cartCalcs.totalAmt) {
					// Open modal window after initialising it 

					var modalData = initUserDetailModal(); 
					scope.userDetailModal.style.display = "block";
					scope.userDetailModal.style.paddingLeft = "0px";
					$timeout(function(){
						scope.userDetailModal.appear = true;
					}, 200);
				}
			};

			scope.closeCheckoutWindow = function(){
				scope.userDetailModal.appear = false;
				$timeout(function(){
					initUserDetailModal();
				}, 200);
			};

			function initUserDetailModal () {
			    scope.userDetailModal = {
			        userObj: null,
			        appear: false,
			        style: {
			        	display: 'none'
			        }
			    };
			    return scope.userDetailModal;
			}

			scope.validateAuthentication = function(){

					LoginSvc.validateAuthentication(scope.userDetailModal.userObj)
					.then(
					function(res){
						var status = res.data.status;
						if (status) {
							$location.path('/success');
						}
						else {
							alert('Wrong credentials. Try again');
						}
					}, 
					function(err){
						console.log('Something went wrong', err);
					});
			}
		}
	}
}]);
