'use strict';

app.factory('commandModeListeners', function() {
  var listener = new keypress.Listener();

  var setupListeners = function(actions) {
    listener.simple_combo('esc', function() { actions.changeMode('normal') });
    listener.simple_combo('ctrl c', function() { actions.changeMode('normal') });
    listener.simple_combo('enter', function() {
      // TODO: This is hacked in should be fixed
      var url = actions.commandText.split(" ")[1];
      actions.commandText = "";
      actions.changeAddress("http://" + url)
      actions.changeMode('normal')
    });
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
