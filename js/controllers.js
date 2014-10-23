$video1 = "";
var video1 = 0;

angular.module('starter.controllers', ['ngCordova'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {})

.controller('HomeCtrl', function ($scope, $sce, $stateParams, $cordovaCapture, $ionicSideMenuDelegate, $ionicScrollDelegate, $location) {

    $scope.video1 = {};


    //Variable for Video Actions
    $video1 = $(".video1").get(0);

    $scope.editmode = [false, false, false];
    /*$scope.editmode.video1 = false;
    $scope.editmode.comparevideo1 = false;
    $scope.editmode.comparevideo2 = false;*/
    console.log($scope.editmode[2]);

    $(".video1edit").show();
    $(".video1nonedit").hide();

    //CREATE NEW CANVAS FUNCTION
    var newCanvas = function (vid, content, editn, canvase) {
        //define and resize canvas
        console.log(canvase);
        if (vid == "both") {
            vid = ".comparevideo1";
        };
        $(content).height($(vid).height());
        var canvas = '<canvas id="' + canvase + '" width="' + $(content).width() + '" height="' + ($(vid).height()) + '"></canvas>';
        $(content).html(canvas);

        // setup canvas
        ctx = document.getElementById(canvase).getContext("2d");
        ctx.strokeStyle = color;
        ctx.lineWidth = 5;

        // setup to trigger drawing on mouse or touch
        $("#" + canvase).drawTouch();
        $("#" + canvase).drawPointer();
        $("#" + canvase).drawMouse();
    };

    //Pencil
    var ctx, color = "#000";
    //$ionicSideMenuDelegate.canDragContent(false);
    $scope.getpencil = function (vid, playbtn, pausebtn, editn, edit, nonedit, content, canvas) {
        if (vid == "both") {
            $(".comparevideo1").get(0).pause();
            $(".comparevideo2").get(0).pause();
            $(".video1play").show();
            $(".video1pause").hide();
            $(".video2play").show();
            $(".video2pause").hide();
        } else {
            $vid = $(vid).get(0);
            $vid.pause();
            $(pausebtn).hide();
            $(playbtn).show();
        };
        //$video1.pause();


        //check if entering edit or non-edit mode
        if ($scope.editmode[editn] == true) {
            //NON-EDIT MODE
            $(edit).show();
            $(nonedit).hide();
            $scope.editmode[editn] = false;
            $ionicSideMenuDelegate.canDragContent(true);
            newCanvas(vid, content, editn, canvas);
            $("#" + canvas).hide();
        } else {
            //EDIT MODE
            $(edit).hide();
            $(nonedit).show();
            $scope.editmode[editn] = true;
            $ionicSideMenuDelegate.canDragContent(false);
            newCanvas(vid, content, editn, canvas);

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





    //Changing Video Speed
    $scope.onchangevideospeed = function (vid, speed) {
        var $video = $(vid).get(0);
        $video.playbackRate = speed / 50;
    };

    //Video Seeker
    /*var changevideo1seeker = function () {
        $(".video1seek").val(($video1.currentTime) / ($video1.duration) * 100);
        //console.log(($video1.currentTime) / ($video1.duration) * 100);
        $scope.video1.seek = ($video1.currentTime) / ($video1.duration) * 100;
        console.log($scope.video1.seek);
        console.log($video1.currentTime);
    };*/

    /*var changecomparevideo1seeker = function () {
        $vid = $(".comparevideo1").get(0);
        $(".comparevideo1seek").val(($vid.currentTime) / ($vid.duration) * 100);
        $scope.comparevideo1.seek = ($vid.currentTime) / ($vid.duration) * 100;
    };*/

    //caling video seeker function every second.

    //$video1.ontimeupdate = changevideo1seeker;

    //compare video 2
    //$(".comparevideo2").get(0).ontimeupdate = changecomparevideo1seeker ;



    /*    //function called when video ended
    var videoend = function () {
        console.log("Video Ends");
        $(".video1pause").hide();
        $(".video1play").show();
        $scope.video1.playpause = false;
    };
    $video1.onended = videoend;*/

    $scope.captureVideo2 = function () {};

    //manually changing video seeker
    $scope.onchangevideoseek = function (vid, seek, editn, editbtn, noneditbtn, content, canvas) {
        $video = $(vid).get(0);
        $video.currentTime = seek * $video.duration / 100;

        //MAKE NEW CANVAS AND HIDE CURRENT CANVAS
        if ($scope.editmode[editn] == true) {
            $(editbtn).show();
            $(noneditbtn).hide();
            if (editn == 1) {
                vid = "both";
            };
            newCanvas(vid, content, editn, canvas);
            $("#" + canvas).hide();
            $scope.editmode[editn] = false;
        };

    };



    //play and pause function
    $scope.playpause = function (vid, speed, playbtn, pausebtn, editn, editbtn, noneditbtn, content, canvas) {
        var $video = $(vid).get(0);
        if ($video.paused) {
            //EDIT OPTIONS
            if ($scope.editmode[editn] == true) {
                $(editbtn).show();
                $(noneditbtn).hide();
                if (editn == 1) {
                    vid = "both";
                };
                newCanvas(vid, content, editn, canvas);
                $("#" + canvas).hide();
                $scope.editmode[editn] = false;
            };
            //VIDEO BUTTON OPTIONS
            $(pausebtn).show();
            $(playbtn).hide();
            //$scope.video1.playpause = true;
            //VIDEO ACTIONS
            $video.playbackRate = 1;
            $video.play();
            //ADJUST SPEED TO NORMAL
            $(speed).val(50);


        } else {
            //VIDEO BUTTON ACTIONS
            $(pausebtn).hide();
            $(playbtn).show();
            //VIDEO ACTIONS
            $video.pause();
        }
    };

    //forward function
    $scope.forward = function () {
        $video1 = $(".video1").get(0);
        var time = $video1.currentTime;
        $video1.currentTime = time + 5;
    };

    //reset video
    $scope.resetvideo = function (vid, playbtn, pausebtn, editn, editbtn, noneditbtn, content, canvas) {
        $video = $(vid).get(0);
        $video.currentTime = 0;
        $(pausebtn).hide();
        $(playbtn).show();
        $video.pause();
        if ($scope.editmode[editn] == true) {
            $(editbtn).show();
            $(noneditbtn).hide();
            if (editn == 1) {
                vid = "both";
            };
            newCanvas(vid, content, editn, canvas);
            $("#" + canvas).hide();
            $scope.editmode[editn] = false;
        };
    };
    $scope.path = "";
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
    };

    //ADD VIDEO
    $scope.addvideo = function () {
//        $scope.resetvideo(".video1");
//        $video1.playbackRate = 1;
//        $(".video1edit").show();
//        $(".video1nonedit").hide();
//        newCanvas(".video", "#content", 0, "canvas");
//        $("#canvas").hide();
//        editmode = false;
        $location.path("app/home");
    };
    //console.log("ng video 1 seek is"+ngvideo1.seek);
})

//CONTROLLER FOR THE VIDEO IN THE "RECORD" PAGE
.controller('RecordSeekCtrl', function ($scope, $stateParams) {
    //To show and hide play and pause button
    $(".video1play").show();
    $(".video1pause").hide();

    console.log("SEEK CONTROLLER");
    $scope.ngvideo1 = {};
    $scope.ngvideo1.seek = 0;
    $video1 = $(".video1").get(0);
    var video1seekupdate = function () {
        $(".video1seek").val(($video1.currentTime) / ($video1.duration) * 100);
        //console.log(($video1.currentTime) / ($video1.duration) * 100);
        $scope.ngvideo1.seek = ($video1.currentTime) / ($video1.duration) * 100;
        console.log($scope.ngvideo1.seek);
        console.log($video1.currentTime);
    };
    $video1.ontimeupdate = video1seekupdate;

    //function called when video ended
    var videoend = function () {
        console.log("Video Ends");
        $(".video1pause").hide();
        $(".video1play").show();
        $scope.video1.playpause = false;
    };
    $video1.onended = videoend;
})

//CONTROLLER FOR VIDEO 1 IN THE HOME PAGE
.controller('compare1Ctrl', function ($scope, $stateParams, $cordovaCapture) {
    $scope.ngcomparevideo1 = {};
    $scope.ngcomparevideo1.seek = 0;

    //To show and hide play and pause button
    $(".video1play").show();
    $(".video1pause").hide();

    console.log("seek contrl");

    $comparevideo1 = $(".comparevideo1").get(0);
    var comparevideo1seekupdate = function () {
        $(".comparevideo1seek").val(($comparevideo1.currentTime) / ($comparevideo1.duration) * 100);
        console.log(($comparevideo1.currentTime) / ($comparevideo1.duration) * 100);
        $scope.ngcomparevideo1.seek = (($comparevideo1.currentTime) / ($comparevideo1.duration) * 100);
    };
    $comparevideo1.ontimeupdate = comparevideo1seekupdate;

    //function called when video ended
    var videoend = function () {
        console.log("Video Ends");
        $(".video1pause").hide();
        $(".video1play").show();
        $scope.video1.playpause = false;
    };
    $comparevideo1.onended = videoend;
})

//CONTROLLER FOR VIDEO 2 IN THE HOME PAGE
.controller('compare2Ctrl', function ($scope, $stateParams, $cordovaCapture) {
    //To show and hide play and pause button
    $(".video2play").show();
    $(".video2pause").hide();

    console.log("seek contrl");
    $scope.ngcomparevideo2 = {};
    $scope.ngcomparevideo2.seek = 0;

    $comparevideo2 = $(".comparevideo2").get(0);
    var comparevideo2seekupdate = function () {
        $(".comparevideo2seek").val(($comparevideo2.currentTime) / ($comparevideo2.duration) * 100);
        console.log(($comparevideo2.currentTime) / ($comparevideo2.duration) * 100);
        $scope.ngcomparevideo2.seek = (($comparevideo2.currentTime) / ($comparevideo2.duration) * 100);
    };
    $comparevideo2.ontimeupdate = comparevideo2seekupdate;

    //function called when video ended
    var videoend = function () {
        console.log("Video Ends");
        $(".video2pause").hide();
        $(".video2play").show();
    };
    $comparevideo2.onended = videoend;
})

//Controller to control the edit button at the beggining
.controller('editbtnCtrl', function ($scope, $stateParams) {
    console.log("EDIT BUTTON CTRL");
    $(".video2edit").show();
    $(".video2nonedit").hide();
})

.controller('LoginpageCtrl', function ($scope, $stateParams, $cordovaCapture, $location) {
    $scope.autoHeight = window.innerHeight - 86;
    $scope.login = function()
    {
        $location.path("app/record");
    };
})
    .controller('ExitCtrl', function ($scope, $stateParams, $cordovaCapture) {});