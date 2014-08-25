'use strict';

app.controller('MainController', ['$scope', 'normalModeListeners', '$sce',
    function($scope, normalModeListeners, $sce) {
      var modeListeners = {
        normal: normalModeListeners,
        command: { listen: function() { console.log("command mode") } }
      };
      $scope.vrowserControls = {
        defaultUrl: $sce.trustAsResourceUrl("http://google.com"),
        url: "",
        changeMode: function (mode) {
          $scope.$apply(function() {
            $scope.mode = mode;
          });
        }
      };

      $scope.mode = "normal";
      modeListeners.normal.setupListeners($scope.vrowserControls);
      modeListeners.normal.listen();

      $scope.$watch('mode', function (newMode, oldMode) {
        console.log(newMode);
        modeListeners[oldMode].stopListening();
        modeListeners[newMode].listen();
      });

      $scope.$watch('vrowserControls.url', function() {
        $scope.statusBar = "<Normal> " + $scope.vrowserControls.url;
      });
}]);
