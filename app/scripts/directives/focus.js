'use-strict';

app.directive('focus', ['$timeout', function($timeout) {
  return function(scope, element, attrs) {
    scope.$watch(attrs.focus, function (newValue) {
      $timeout(function () {
        newValue && element[0].focus();
      }, 100);
    });
  };
}]);
