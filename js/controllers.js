$video1 = "";
var video1 = 0;

angular.module('starter.controllers', ['ngCordova'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {})

.controller('HomeCtrl', function ($scope, $sce, $stateParams, $cordovaCapture, $ionicSideMenuDelegate, $ionicScrollDelegate, $location) {

    $scope.video1 = {};
    var editmode = false;
    $(".video1edit").show();
    $(".video1nonedit").hide();

    //CREATE NEW CANVAS FUNCTION
    var newCanvas = function () {
        //define and resize canvas

        $("#content").height($(".video1").height());
        var canvas = '<canvas id="canvas" width="' + $("#content").width() + '" height="' + ($(".video1").height()) + '"></canvas>';
        $("#content").html(canvas);

        // setup canvas
        ctx = document.getElementById("canvas").getContext("2d");
        ctx.strokeStyle = color;
        ctx.lineWidth = 5;

        // setup to trigger drawing on mouse or touch
        $("#canvas").drawTouch();
        $("#canvas").drawPointer();
        $("#canvas").drawMouse();
    };

    //Pencil
    var ctx, color = "#000";
    //$ionicSideMenuDelegate.canDragContent(false);
    $scope.getpencil = function () {
        //check if entering edit or non-edit mode
        if (editmode == true) {
            //NON-EDIT MODE
            $(".video1edit").show();
            $(".video1nonedit").hide();
            editmode = false;
            $ionicSideMenuDelegate.canDragContent(true);
            newCanvas();
            $("#canvas").hide();
        } else {
            //EDIT MODE
            $(".video1edit").hide();
            $(".video1nonedit").show();
            editmode = true;
            $ionicSideMenuDelegate.canDragContent(false);
            newCanvas();
            
        };
    };

    $scope.otherswipe = function () {
        console.log("Got it");
        return false;
    };

    // prototype to	start drawing on touch using canvas moveTo and lineTo
    $.fn.drawTouch = function () {
        var start = function (e) {
            e = e.originalEvent;
            ctx.beginPath();
            x = e.changedTouches[0].pageX;
            y = e.changedTouches[0].pageY - 44;
            ctx.moveTo(x, y);
        };
        var move = function (e) {
            e.preventDefault();
            e = e.originalEvent;
            x = e.changedTouches[0].pageX;
            y = e.changedTouches[0].pageY - 44;
            ctx.lineTo(x, y);
            ctx.stroke();
        };
        $(this).on("touchstart", start);
        $(this).on("touchmove", move);
    };

    // prototype to	start drawing on pointer(microsoft ie) using canvas moveTo and lineTo
    $.fn.drawPointer = function () {
        var start = function (e) {
            e = e.originalEvent;
            ctx.beginPath();
            x = e.pageX;
            y = e.pageY - 44;
            ctx.moveTo(x, y);
        };
        var move = function (e) {
            e.preventDefault();
            e = e.originalEvent;
            x = e.pageX;
            y = e.pageY - 44;
            ctx.lineTo(x, y);
            ctx.stroke();
        };
        $(this).on("MSPointerDown", start);
        $(this).on("MSPointerMove", move);
    };

    // prototype to	start drawing on mouse using canvas moveTo and lineTo
    $.fn.drawMouse = function () {
        var clicked = 0;
        var start = function (e) {
            clicked = 1;
            ctx.beginPath();
            x = e.pageX;
            y = e.pageY - 44;
            ctx.moveTo(x, y);
        };
        var move = function (e) {
            if (clicked) {
                x = e.pageX;
                y = e.pageY - 44;
                ctx.lineTo(x, y);
                ctx.stroke();
            }
        };
        var stop = function (e) {
            clicked = 0;
        };
        $(this).on("mousedown", start);
        $(this).on("mousemove", move);
        $(window).on("mouseup", stop);
    };



    $scope.appclass = "has-header";
    $scope.scroller = false;

    $scope.video1.seek = 0;
    $scope.video1.speed = 50;
    $scope.changeclass = function () {
        console.log($scope.appclass);
        $scope.appclass = 'edit-class';
        console.log($scope.appclass);
        $scope.scroller = false;

        window.addEventListener("touchmove", function (event) {
            // no more scrolling
            event.preventDefault();
        }, false);
    };

    //Pinch Zoom Logic

    var newscale = 0;
    var myElement = document.getElementById('myElement');

    var mc = new Hammer.Manager(myElement);
    var iniscale = 1;
    var webscale = 1;
    // create a pinch and rotate recognizer
    // these require 2 pointers
    var pinch = new Hammer.Pinch();
    var inipoints = {
        x1: 0,
        x2: 0,
        y1: 0,
        y2: 0
    };
    var disnew = 1;
    var disini = 1;
    mc.add([pinch]);
    //var newscale = 1;
    mc.on("pinch", function (ev) {
        var videowidth = $(".video1").width();
        var videoheight = $(".video1").height();
        console.log(ev.pointers);
        var touch = ev.pointers;
        //myElement.textContent += ev.distance + " ";
        var newpoints = {
            x1: touch[0].clientX,
            x2: touch[1].clientX,
            y1: touch[0].clientY,
            y2: touch[1].clientY
        };
        var mindis = 10;
        if (Math.abs(disnew - disini) < 10) {
            disnew = Math.pow((Math.pow(newpoints.x1 - newpoints.x2, 2)) + (Math.pow(newpoints.y1 - newpoints.y2, 2)), 0.5);
            //disini=Math.pow((Math.pow(inipoints.x1-inipoints.x2,2))+(Math.pow(inipoints.y1-inipoints.y2,2)),0.5);
            //$(".video1").css("-webkit-transform","scale("+(disnew/disini)*iniscale+")");
            if (ev.scale > 1) {
                $(".video1").css("-webkit-transform", "scale(" + (iniscale + (ev.scale - 1)) + ")");
                webscale = iniscale + (ev.scale - 1);
            } else {
                $(".video1").css("-webkit-transform", "scale(" + (iniscale + (1 - ev.scale)) + ")");
                webscale = iniscale + (ev.scale - 1);
            }
        } else {
            //iniscale=(disnew/disini);
            iniscale = webscale;

            inipoints = {
                x1: touch[0].clientX,
                x2: touch[1].clientX,
                y1: touch[0].clientY,
                y2: touch[1].clientY
            };
            disini = Math.pow((Math.pow(inipoints.x1 - inipoints.x2, 2)) + (Math.pow(inipoints.y1 - inipoints.y2, 2)), 0.5);

        }

    });



    //Video Actions
    $video1 = $(".video1").get(0);

    //Changing Video Speed
    $scope.onchangevideospeed = function (video) {
        $video1.playbackRate = video.speed / 50;
    };

    //Video Seeker
    var changevideo1seeker = function () {
        $(".video1seek").val(($video1.currentTime) / ($video1.duration) * 100);
        //console.log(($video1.currentTime) / ($video1.duration) * 100);
        $scope.video1.seek = ($video1.currentTime) / ($video1.duration) * 100;
        console.log($scope.video1.seek);
        console.log($video1.currentTime);
    };

    //caling video seeker function every second.
    $video1.ontimeupdate = changevideo1seeker;

    //To show and hide play and pause button
    $(".video1play").show();
    $(".video1pause").hide();

    //function called when video ended
    var videoend = function () {
        console.log("Video Ends");
        $(".video1pause").hide();
        $(".video1play").show();
        $scope.video1.playpause = false;
    };
    $video1.onended = videoend;

    $scope.captureVideo2 = function () {};

    //manually changing video seeker
    $scope.onchangevideo1seek = function () {
        $video1.currentTime = $scope.video1.seek * $video1.duration / 100;
    };



    //play and pause function
    $scope.playpause = function () {
        console.log($video1.paused);
        if ($video1.paused) {
            $(".video1pause").show();
            $(".video1play").hide();
            //$scope.video1.playpause = true;
            $video1.playbackRate = 1;
            $scope.video1.speed = 50;
            $video1.play();

        } else {

            $(".video1pause").hide();
            $(".video1play").show();
            $video1.pause();
        }
    };

    //forward function
    $scope.forward = function () {
        $video1 = $(".video1").get(0);
        var time = $video1.currentTime;
        $video1.currentTime = time + 5;
    };

    //reset video
    $scope.resetvideo1 = function () {
        $video1.currentTime = 0;
        $(".video1pause").hide();
        $(".video1play").show();
        $video1.pause();
    };

    //Capture button function
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
    
    //ADD VIDEO
    $scope.addvideo = function()
    {
        $location.path("app/home");
    };
})

.controller('LoginpageCtrl', function ($scope, $stateParams, $cordovaCapture) {
    $scope.autoHeight = window.innerHeight - 86;
})
    .controller('ExitCtrl', function ($scope, $stateParams, $cordovaCapture) {});