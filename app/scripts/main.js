'use strict';

// Listens for the app launching then creates the window

chrome.app.runtime.onLaunched.addListener(function() {
    var win = chrome.app.window.create('vrowser.html', {
        id: 'main',
    });
});
