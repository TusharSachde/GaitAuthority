angular.module('starter.controllers', ['ngCordova'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
})

.controller('HomeCtrl', function ($scope, $stateParams, $cordovaCapture) {
    
    $scope.captureVideo2 = function () {
    };
        
        $scope.captureVideo = function () {
            
       var options = {
            limit: 1,
            duration: 15
        };
            
      /*  var captureSuccess = function(mediaFiles) {
            var path = mediaFiles[0].fullPath;
            console.log(path);
        };
        var captureError = function(error) {
            console.log("error code"+error);
        };*/

        $cordovaCapture.captureVideo(options).then(function (mediaFiles) {
            $scope.path = mediaFiles[0].fullPath;
            console.log($scope.path);
        }, function (err) {
            // An error occured. Show a message to the user
        });
    }
})

.controller('LoginpageCtrl', function($scope, $stateParams, $cordovaCapture) {
    $scope.autoHeight = window.innerHeight-86;
})
.controller('ExitCtrl', function($scope, $stateParams, $cordovaCapture) {
});