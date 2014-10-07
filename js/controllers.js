$video1="";

angular.module('starter.controllers', ['ngCordova'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {})

.controller('HomeCtrl', function ($scope, $sce, $stateParams, $cordovaCapture) {

    $scope.captureVideo2 = function () {};

    $scope.playpause = function () {
        console.log("Video 1 Play");
        $video1= $(".video1").get(0);
        if($video1.paused)
        {
            $video1.play(); 
            $video1.playbackRate = 1;
        }
        else 
        {
            $video1.pause(); 
        }
        //console.log();
    };

    $scope.config = {
        sources: [
            {
                src: $sce.trustAsResourceUrl("videogular.mp4"),
                type: "video/mp4"
            },
            {
                src: $sce.trustAsResourceUrl("videogular.webm"),
                type: "video/webm"
            },
            {
                src: $sce.trustAsResourceUrl("videogular.ogg"),
                type: "video/ogg"
            }
    ],
        theme: {
            url: "styles/themes/default/videogular.css"
        }
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

.controller('LoginpageCtrl', function ($scope, $stateParams, $cordovaCapture) {
    $scope.autoHeight = window.innerHeight - 86;
})
    .controller('ExitCtrl', function ($scope, $stateParams, $cordovaCapture) {});