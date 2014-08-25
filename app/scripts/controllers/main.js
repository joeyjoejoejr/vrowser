'use strict';

app.controller('MainController', ['$scope', 'normalModeListeners', 
  'commandModeListeners', '$sce',
  function($scope, normalModeListeners, commandModeListeners, $sce) {
    var modeListeners = {
      normal: normalModeListeners,
      command: commandModeListeners
    };

    $scope.vrowserControls = {
      commandText: '',
      defaultUrl: $sce.trustAsResourceUrl("http://google.com"),
      url: "",
      changeMode: function (mode) {
        $scope.$apply(function() {
          $scope.mode = mode;
        });
      },
      // TODO: This should create and show a new webview
      changeAddress: function(url) {
        $scope.$apply(function() {
          this.defaultUrl = $sce.trustAsResourceUrl(url);
        }.bind(this));
      }
    };

    $scope.mode = "normal";
    modeListeners.normal.setupListeners($scope.vrowserControls);
    modeListeners.command.setupListeners($scope.vrowserControls);
    modeListeners.normal.listen();

    $scope.$watch('mode', function (newMode, oldMode) {
      modeListeners[oldMode].stopListening();
      modeListeners[newMode].listen();
    });

    $scope.$watch('vrowserControls.url', function() {
      $scope.statusBar = "<" + mode + "> " + $scope.vrowserControls.url;
    });
  }
]);
