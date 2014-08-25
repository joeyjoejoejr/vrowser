'use strict';

var listener = new window.keypress.Listener();
var webview = $('webview')[0];

var sendCommand = function(command) {
  var message = JSON.stringify({ command: command });
  webview.contentWindow.postMessage(message, '*');
};

webview.addEventListener('loadcommit', function(e) {
  $('.status-bar span').text("<Normal> " + e.url);
});

webview.addEventListener('loadstop', function () {
  webview.executeScript({ file: 'scripts/commands.js' }, function(response) {
    if (!response || !response.length) {
      console.warn('Failed to inject Vrowser commands');
    }
  });
});

// Movement Keys
listener.simple_combo('j', function() { sendCommand('scrollDownOne'); });
listener.simple_combo('k', function() { sendCommand('scrollUpOne'); });
listener.simple_combo('ctrl d', function() { sendCommand('scrollDownHalf'); });
listener.simple_combo('ctrl u', function() { sendCommand('scrollUpHalf'); });
listener.simple_combo('ctrl f', function() { sendCommand('scrollUpFull'); });
listener.simple_combo('ctrl b', function() { sendCommand('scrollDownFull'); });

// Command Keys
listener.simple_combo(':', function() { console.log(e); });
