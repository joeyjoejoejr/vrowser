'use strict';

app.factory('normalModeListeners', function() {
  var numbers = [];
  var listener = new keypress.Listener();

  // Clear the count array when anything other than a number is pressed
  document.addEventListener("keyup", function (event) {
    if (event.keyCode < 48 || event.keyCode > 57) {
      numbers = [];
    }
  });

  var setupListeners = function(actions) {
    listener.simple_combo('j', function() { actions.scrollDown(null, numbers.join("") || "1") });
    listener.simple_combo('k', function() { actions.scrollUp(null, numbers.join("") || "1") });
    listener.simple_combo('ctrl d', function() { actions.scrollDown(0.5); });
    listener.simple_combo('ctrl u', function() { actions.scrollUp(0.5); });
    listener.simple_combo('ctrl f', function() { actions.scrollUp(1); });
    listener.simple_combo('ctrl b', function() { actions.scrollDown(1); });

    ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].forEach(function(num) {
      listener.simple_combo(num, function () { numbers.push(num) });
    });

    listener.simple_combo(':', function() { actions.changeMode("command"); });
  };

  var listen = function () {
    listener.listen();
  };
  var stopListening = function () {
    listener.stop_listening();
  }

  return {
    listen: listen,
    stopListening: stopListening,
    setupListeners: setupListeners
  }
});
