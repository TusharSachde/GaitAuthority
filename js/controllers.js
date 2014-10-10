$video1 = "";
var video1 = 0;

angular.module('starter.controllers', ['ngCordova'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {})

.controller('HomeCtrl', function ($scope, $sce, $stateParams, $cordovaCapture, $ionicSideMenuDelegate, $ionicScrollDelegate) {
    
    //Zoom
    
    var newscale = 0;
    var myElement = document.getElementById('myElement');

        var mc = new Hammer.Manager(myElement);
        var iniscale=1;
        var webscale=1;
         // create a pinch and rotate recognizer
         // these require 2 pointers
        var pinch = new Hammer.Pinch();
        var inipoints={x1:0,x2:0,y1:0,y2:0};
        var disnew=1;
        var disini=1;
        mc.add([pinch]);
//var newscale = 1;
        mc.on("pinch", function (ev) {
            var videowidth=$(".video1").width();
            var videoheight=$(".video1").height();
            console.log(ev.pointers);
            var touch=ev.pointers;
            //myElement.textContent += ev.distance + " ";
            var newpoints={x1:touch[0].clientX,x2:touch[1].clientX,y1:touch[0].clientY,y2:touch[1].clientY};
            var mindis=10;
            if(Math.abs(disnew-disini)<10)
            {
                disnew=Math.pow((Math.pow(newpoints.x1-newpoints.x2,2))+(Math.pow(newpoints.y1-newpoints.y2,2)),0.5);
                //disini=Math.pow((Math.pow(inipoints.x1-inipoints.x2,2))+(Math.pow(inipoints.y1-inipoints.y2,2)),0.5);
                //$(".video1").css("-webkit-transform","scale("+(disnew/disini)*iniscale+")");
                if(ev.scale>1)
                {
                    $(".video1").css("-webkit-transform","scale("+(iniscale+(ev.scale-1))+")");
                    webscale=iniscale+(ev.scale-1);
                }
                else
                {
                    $(".video1").css("-webkit-transform","scale("+(iniscale+(1-ev.scale))+")");
                    webscale=iniscale+(ev.scale-1);   
                }
            }
            else 
            {
                //iniscale=(disnew/disini);
                iniscale=webscale;

                inipoints={x1:touch[0].clientX,x2:touch[1].clientX,y1:touch[0].clientY,y2:touch[1].clientY};
                disini=Math.pow((Math.pow(inipoints.x1-inipoints.x2,2))+(Math.pow(inipoints.y1-inipoints.y2,2)),0.5);
                
            }
            
        });
    
    
    //Pencil
    var ctx, color = "#000";
    //$ionicSideMenuDelegate.canDragContent(false);
    $scope.getpencil = function () {
        $ionicSideMenuDelegate.canDragContent(false);

        function newCanvas() {
            //define and resize canvas
            $("#content").height($(".video1").height());
            var canvas = '<canvas id="canvas" width="' + $(".video1").width() + '" height="' + ($(".video1").height()) + '"></canvas>';
            $("#content").html(canvas);

            // setup canvas
            ctx = document.getElementById("canvas").getContext("2d");
            ctx.strokeStyle = color;
            ctx.lineWidth = 5;

            // setup to trigger drawing on mouse or touch
            $("#canvas").drawTouch();
            $("#canvas").drawPointer();
            $("#canvas").drawMouse();

        }
        newCanvas();
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
    $scope.video1 = {};
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
    


    $video1 = $(".video1").get(0);
    

    $scope.onchangevideospeed = function (video) {
        $video1.playbackRate = video.speed / 50;
    };

    var changevideo1seeker = function () {
        $(".video1seek").val(($video1.currentTime) / ($video1.duration) * 100);
        //console.log(($video1.currentTime) / ($video1.duration) * 100);
        $scope.video1.seek=($video1.currentTime) / ($video1.duration) * 100;
        console.log($scope.video1.seek);
    };
    $video1.ontimeupdate = changevideo1seeker;
    $scope.captureVideo2 = function () {};

    $scope.onchangevideo1seek = function () {
        $video1.currentTime = $scope.video1.seek * $video1.duration / 100;
    };

    $scope.playpause = function () {
        console.log("Video 1 Play");

        if ($video1.paused) {
            $video1.play();

        } else {
            $video1.pause();
        }
        //console.log();
    };

    $scope.forward = function () {
        $video1 = $(".video1").get(0);
        var time = $video1.currentTime;
        $video1.currentTime = time + 5;
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