angular.module('starter.controllers', ['ngCordova'], ['ngTouch'])

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
    };
        
        $scope.captureVideo = function () {
        var options = {
            limit: 1,
            duration: 15
        };

        $cordovaCapture.captureVideo(options).then(function (videoData) {
            $scope.path = videoData.fullPath;
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