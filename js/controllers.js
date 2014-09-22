angular.module('starter.controllers', ['ngCordova'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };
})

.controller('HomeCtrl', function ($scope, $stateParams, $cordovaCapture) {
    
    $scope.captureVideo2 = function () {
        console.log("Sunny Leone");
    };
        
        $scope.captureVideo = function () {
        console.log("Sunny Leone");
        var options = {
            limit: 3,
            duration: 15
        };

        $cordovaCapture.captureVideo(options).then(function (videoData) {
            // Success! Video data is here
        }, function (err) {
            // An error occured. Show a message to the user
        });
    }
    $scope.autoHeight = window.innerHeight-43;
})

.controller('PlaylistCtrl', function($scope, $stateParams, $cordovaCapture) {
})
.controller('LoginpageCtrl', function($scope, $stateParams, $cordovaCapture) {
})
.controller('ExitCtrl', function($scope, $stateParams, $cordovaCapture) {
});