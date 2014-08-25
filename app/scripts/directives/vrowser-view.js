'use-strict';

app.directive('vrowserView', function() {
  return {
    restrict: 'E',
    template: '<webview src="{{controls.defaultUrl}}"></webview>',
    scope: {
      controls: "=",
    },
    link: function(scope, element, attr) {
      var webview = element.children('webview')[0];

      webview.addEventListener('loadcommit', function () {
        scope.$apply(function() {
          scope.controls.url = this.src;
        }.bind(this));
      });

      webview.addEventListener('loadstop', function () {
        webview.executeScript({ file: 'scripts/commands.js' }, function(response) {
          if (!response || !response.length) {
            console.warn('Failed to inject Vrowser commands');
          }
        });

        scope.controls.scrollUp = function (distance, multiplier) {
          var message = JSON.stringify({
            command: "scrollUp",
            distance: distance,
            mulitplier: parseInt(multiplier, 10)
          });
          webview.contentWindow.postMessage(message, "*");
        };

        scope.controls.scrollDown = function (distance, multiplier) {
          var message = JSON.stringify({
            command: "scrollDown",
            distance: distance,
            mulitplier: parseInt(multiplier, 10)
          });
          webview.contentWindow.postMessage(message, "*");
        };
      });
    }
  };
});
