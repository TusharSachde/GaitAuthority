$video1="";

angular.module('starter.controllers', ['ngCordova'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {})

.controller('HomeCtrl', function ($scope, $sce, $stateParams, $cordovaCapture) {
    
    /*
    var ctx, color = "#000";	

$(document).ready(function () {
	
	// setup a new canvas for drawing wait for device init
    setTimeout(function(){
	   newCanvas();
    }, 1000);
	
	// prevent footer to toggle on touch
	$("[data-role=footer]").fixedtoolbar({ tapToggle: false });
	
	// reset palette selection (css) and select the clicked color for canvas strokeStyle
	$(".palette").click(function(){
		$(".palette").css("border-color", "#777");
		$(".palette").css("border-style", "solid");
		$(this).css("border-color", "#fff");
		$(this).css("border-style", "dashed");
		color = $(this).css("background-color");
		ctx.beginPath();
		ctx.strokeStyle = color;
	});
    
	// link the new button with newCanvas() function
	$("#new").click(function() {
		newCanvas();
	});
});

// function to setup a new canvas for drawing
function newCanvas(){
	//define and resize canvas
    $("#content").height($(window).height()-90);
    var canvas = '<canvas id="canvas" width="'+$(window).width()+'" height="'+($(window).height()-90)+'"></canvas>';
	$("#content").html(canvas);
    
    // setup canvas
	ctx=document.getElementById("canvas").getContext("2d");
	ctx.strokeStyle = color;
	ctx.lineWidth = 5;	
	
	// setup to trigger drawing on mouse or touch
	$("#canvas").drawTouch();
    $("#canvas").drawPointer();
	$("#canvas").drawMouse();
}

// prototype to	start drawing on touch using canvas moveTo and lineTo
$.fn.drawTouch = function() {
	var start = function(e) {
        e = e.originalEvent;
		ctx.beginPath();
		x = e.changedTouches[0].pageX;
		y = e.changedTouches[0].pageY-44;
		ctx.moveTo(x,y);
	};
	var move = function(e) {
		e.preventDefault();
        e = e.originalEvent;
		x = e.changedTouches[0].pageX;
		y = e.changedTouches[0].pageY-44;
		ctx.lineTo(x,y);
		ctx.stroke();
	};
	$(this).on("touchstart", start);
	$(this).on("touchmove", move);	
}; 
    
// prototype to	start drawing on pointer(microsoft ie) using canvas moveTo and lineTo
$.fn.drawPointer = function() {
	var start = function(e) {
        e = e.originalEvent;
		ctx.beginPath();
		x = e.pageX;
		y = e.pageY-44;
		ctx.moveTo(x,y);
	};
	var move = function(e) {
		e.preventDefault();
        e = e.originalEvent;
		x = e.pageX;
		y = e.pageY-44;
		ctx.lineTo(x,y);
		ctx.stroke();
    };
	$(this).on("MSPointerDown", start);
	$(this).on("MSPointerMove", move);
};        

// prototype to	start drawing on mouse using canvas moveTo and lineTo
$.fn.drawMouse = function() {
	var clicked = 0;
	var start = function(e) {
		clicked = 1;
		ctx.beginPath();
		x = e.pageX;
		y = e.pageY-44;
		ctx.moveTo(x,y);
	};
	var move = function(e) {
		if(clicked){
			x = e.pageX;
			y = e.pageY-44;
			ctx.lineTo(x,y);
			ctx.stroke();
		}
	};
	var stop = function(e) {
		clicked = 0;
	};
	$(this).on("mousedown", start);
	$(this).on("mousemove", move);
	$(window).on("mouseup", stop);
};
    */
    
    
    $scope.appclass = "has-header";
    $scope.scroller = true;
    
    $scope.changeclass = function()
    {
        console.log($scope.appclass);
        $scope.appclass='edit-class'; 
        console.log($scope.appclass);
        $scope.scroller = false;
    };

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
    
    $scope.forward = function()
    {
        $video1= $(".video1").get(0);
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