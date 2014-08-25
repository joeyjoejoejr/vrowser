'use strict';

var webviewVrowserCommandsInjected = false;

(function() {
  if (!webviewVrowserCommandsInjected) {
    var commands = {
      scrollDown: function(amount) {
        document.body.scrollTop += amount;
      },
      scrollUp: function(amount) {
        document.body.scrollTop -= amount;
      },
      fullWindow: function() {
        return window.innerHeight;
      }
    };

    webviewVrowserCommandsInjected = true;
  }

  window.addEventListener('message', function(message) {
    if(message.origin === 'chrome-extension://nmmdhpppbilebpeolgcjjjgdbbcmidgb') {
      var amount;
      var data = JSON.parse(message.data);

      if (data.distance) {
        amount = commands.fullWindow() * data.distance ;
      } else {
        amount = 20 * data.mulitplier;
      }

      commands[data.command](amount);
    }
  });
})();
