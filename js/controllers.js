$video1 = "";
var video1path = "";
var video2path = "";
var page2 = false;
var page3 = false;
/*var page2 = true;
var page3 = true;*/
var video1 = 0;
var myconsole = 0;
var ctx;


/*var vidtaken = {};
vidtaken.show = false;*/

console.log("RUN RUN RUN");
angular.module('starter.controllers', ['ngCordova'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {




})

.controller('HomeCtrl', function ($scope, $sce, $stateParams, $cordovaCapture, $ionicSideMenuDelegate, $ionicScrollDelegate, $location, MyDatabase) {

        //$scope.vidplength1 = 0;
        //$scope.vidplength2 = 0;

        //var vid1 = $(".comparevideo1").get(0); 
        //$scope.vidplength1 = vid1.
        //$scope.vidplength1 = vid1.duration

        $scope.vidtaken = true;
        if (page2 == false) {
            $scope.vidtaken = false;
        };

        $scope.video1 = {};
        MyDatabase.setwhichshow("record");
        $scope.autoHeight = window.innerHeight - 20;
        $scope.exitfunction = function () {
            $location.path("app/exit");
        }
        MyDatabase.setsidemenu();
        console.log(MyDatabase.getsidemenu());
        myconsole = MyDatabase.getsidemenu();


        //Variable for Video Actions
        $video1 = $(".video1").get(0);

        $scope.editmode = [false, false, false];
        /*$scope.editmode.video1 = false;
    $scope.editmode.comparevideo1 = false;
    $scope.editmode.comparevideo2 = false;*/
        console.log($scope.editmode[2]);



        //CREATE NEW CANVAS FUNCTION
        var newCanvas = function (vid, content, editn, canvase) {
            var pointonex = 0;
            var pointoney = 0;
            var pointtwox = 0;
            var pointtwoy = 0;
            //define and resize canvas
            console.log(canvase);
            if (vid == "both") {
                vid = ".comparevideo1";
            };
            $(content).height($(vid).height());
            var canvas = '<canvas id="' + canvase + '" width="' + $(content).width() + '" height="' + ($(vid).height()) + '"></canvas>';
            $(content).html(canvas);

            // setup canvas drawing
            var canvaso = document.getElementById(canvase);
            ctx = canvaso.getContext("2d");
            ctx.strokeStyle = color;
            ctx.lineWidth = 5;
            var canvasOffset = $("#"+canvase).offset();
            var offsetX = canvasOffset.left;
            var offsetY = canvasOffset.top;
            var storedLines = [];
            var startX = 0;
            var startY = 0;
            var isDown;

            //STROKE LOGIC


            $("#"+canvase).on(TouchMouseEvent.DOWN, function(e){
                handleMouseDown(e);
            });
            $("#"+canvase).on(TouchMouseEvent.MOVE, function(e){
                handleMouseMove(e);
            });
            $("#"+canvase).on(TouchMouseEvent.UP, function(e){
                handleMouseUp(e);
            });
             $("#clear").click(function () {
            storedLines.length = 0;
            redrawStoredLines();
        });

            function handleMouseDown(e) {
                var mouseX = parseInt(e.pageX - offsetX);
                var mouseY = parseInt(e.pageY - offsetY);

                isDown = true;
                startX = mouseX;
                startY = mouseY;

            }

            function handleMouseMove(e) {

                if (!isDown) {
                    return;
                }

                redrawStoredLines();

                var mouseX = parseInt(e.pageX - offsetX);
                var mouseY = parseInt(e.pageY - offsetY);

                // draw the current line
                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(mouseX, mouseY);
                ctx.stroke();

            }


            function handleMouseUp(e) {

                isDown = false;

                var mouseX = parseInt(e.pageX - offsetX);
                var mouseY = parseInt(e.pageY - offsetY);

                storedLines.push({
                    x1: startX,
                    y1: startY,
                    x2: mouseX,
                    y2: mouseY
                });

                redrawStoredLines();

            }


            function redrawStoredLines() {

                ctx.clearRect(0, 0, canvaso.width, canvaso.height);

                if (storedLines.length == 0) {
                    return;
                }

                // redraw each stored line
                for (var i = 0; i < storedLines.length; i++) {
                    ctx.beginPath();
                    ctx.moveTo(storedLines[i].x1, storedLines[i].y1);
                    ctx.lineTo(storedLines[i].x2, storedLines[i].y2);
                    ctx.stroke();
                }
            };
                /*$("#" + canvase).on('click', function (e) {
            if(pointonex == 0)
            {
                pointonex = e.pageX - this.offsetLeft;
                pointoney = e.pageY - this.offsetTop- 44;
            }else{
                pointtwox = e.pageX - this.offsetLeft;
                pointtwoy = e.pageY - this.offsetTop- 44;
                ctx.beginPath();
                ctx.moveTo(pointonex, pointoney);
                ctx.lineTo(pointtwox, pointtwoy);
                ctx.stroke();
                pointonex=0;
                pointoney=0;
            };
        });*/
            };

            //Pencil
            var ctx, color = "#ef3323";
            //$ionicSideMenuDelegate.canDragContent(false);
            $scope.getpencil = function (vid, playbtn, pausebtn, editn, edit, nonedit, content, canvas) {
                console.log(vid);
                //if (vid != ".video1") {
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
                //};
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

            $scope.onbothvideoseek = function (vid1, vid2, vid1seek, vid2seek, seek, editn, editbtn, noneditbtn, content, canvas) {
                $video1 = $(vid1).get(0);
                $video2 = $(vid2).get(0);

                $video1.currentTime = seek * $video1.duration / 100;
                $video2.currentTime = seek * $video2.duration / 100;

                $(vid1seek).val(seek);
                $(vid2seek).val(seek);


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

            $scope.videospeed = function (vid, val) {
                var $video = $(vid).get(0);
                console.log('50 50 50 50');

                $video.playbackRate = val;

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
            var addvid = false;
            var addvid2 = false;
            $scope.path = "";

            ////////////////////////////////////////////////////////////////////////////////////////////////
            ///////////////////////////////THIS FUNCTION ALSO MANAGES DURING CHANGING BETWEEN PAGES/////////
            ////////////////////////////////////////////////////////////////////////////////////////////////

            //Capture button function
            $scope.captureVideo = function (holder, vid, vidclass, vidseek, vidplay, vidpause) {

                /*vidtaken.show = true;*/

                if (page2 == false || page3 == false) {
                    var options = {
                        limit: 1
                    };

                    $cordovaCapture.captureVideo(options).then(function (mediaFiles) {
                        $scope.path = mediaFiles[0].fullPath;
                        //////STORING PATH FOR FUTURE USE/////
                        if (vidclass == ".video1") {
                            video1path = $scope.path;
                            addvid = true;
                        };
                        if (vidclass == ".video2") {
                            video2path = $scope.path;
                            addvid2 = true;
                        };
                        /////////////////////////////////

                        var filestart = $scope.path.substr(0, 6);
                        if (filestart == "file:/") {
                            $scope.path = $scope.path.substr(6);
                        }
                        $(holder).html('<video class="' + vid + '" width="100%" ><source src="file:///' + $scope.path + '" type="video/mp4"></video>');
                        $scope.vidtaken = true;



                        //ON UPDATE AND ON END FUNCTIONS
                        $video1 = $(vidclass).get(0);
                        var video1seekupdate = function () {
                            $(vidseek).val(($video1.currentTime) / ($video1.duration) * 100);
                            //console.log(($video1.currentTime) / ($video1.duration) * 100);
                            // $scope.ngvideo1.seek = ($video1.currentTime) / ($video1.duration) * 100;

                        };

                        $video1.ontimeupdate = video1seekupdate;

                        //function called when video ended
                        var videoend = function () {
                            $(vidpause).hide();
                            $(vidplay).show();
                            $scope.video1.playpause = false;
                        };
                        $video1.onended = videoend;

                        console.log($scope.path);




                    }, function (err) {
                        // An error occured. Show a message to the user
                    });

                } else {
                    if (holder == ".myvideocon1") {
                        $scope.path = video1path;

                    } else {
                        $scope.path = video2path;
                        page2 = false;
                        page3 = false;
                    };

                    var filestart = $scope.path.substr(0, 6);
                    if (filestart == "file:/") {
                        $scope.path = $scope.path.substr(6);
                    }
                    console.log($scope.path);
                    $(holder).html('<video class="' + vid + '" width="100%" ><source src="file:///' + $scope.path + '" type="video/mp4"></video>');
                    /*$(holder).html('<video class="' + vid + '" width="100%" ><source src="http://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"></video>');*/

                    //SET VIDEO OBJECT
                    $video1 = $(vidclass).get(0);


                    //PLAY VIDEO
                    $video1.currentTime = 1;

                    //ON UPDATE AND ON END FUNCTIONS            
                    var video1seekupdate = function () {
                        $(vidseek).val(($video1.currentTime) / ($video1.duration) * 100);
                        //console.log(($video1.currentTime) / ($video1.duration) * 100);
                        //$scope.ngvideo1.seek = ($video1.currentTime) / ($video1.duration) * 100;
                    };

                    $video1.ontimeupdate = video1seekupdate;

                    //function called when video ended
                    var videoend = function () {
                        $(vidpause).hide();
                        $(vidplay).show();
                        $scope.video1.playpause = false;
                    };
                    $video1.onended = videoend;

                    console.log($scope.path);


                };
                ////////////////////////////////////////////////////////////////////////////////////////////////
                ////////////////////////////////////////////////////////////////////////////////////////////////
                ////////////////////////////////////////////////////////////////////////////////////////////////




            };

            //CLEAR DATA BUTTON
            $scope.cleardata = function () {
                console.log("TRUNCATIONG TABLE 1");
                MyDatabase.cleartable();
            };

            //ADD VIDEO 2
            $scope.addvideo = function () {
                $scope.resetvideo(".video1");
                $video1.playbackRate = 1;
                $(".video1edit").show();
                $(".video1nonedit").hide();
                newCanvas(".video1", "#content", 0, "canvas");
                $("#canvas").hide();
                editmode = false;
                page2 = true;
                $location.path("app/record2");

            };
            //GO TO COMPARE PAGE
            $scope.comparevideo = function () {
                $scope.resetvideo(".video2");
                $video1.playbackRate = 1;
                $(".video1edit").show();
                $(".video1nonedit").hide();
                newCanvas(".video2", "#content", 2, "canvas");
                $("#canvas").hide();
                editmode = false;
                page3 = true;

                $location.path("app/home");

            };

            //$scope.captureVideo(".myvideocon1", "video1", ".video1", ".video1seek", ".video1play", ".video1pause");
            if (page3 == true) {
                console.log("CALLING FIRST VIDEO IN COMPARE");
                console.log(video1path);
                $scope.captureVideo(".myvideocon1", "comparevideo1", ".comparevideo1", ".comparevideo1seek", ".video1play", ".video1pause");

                console.log("CALLING SECOND VIDEO IN COMPARE");
                console.log(video2path);
                $scope.captureVideo(".myvideocon2", "comparevideo2", ".comparevideo2", ".comparevideo2seek", ".video2play", ".video2pause");
            };
            //console.log("ng video 1 seek is"+ngvideo1.seek);

            //SIDE MENU
            $scope.toggleRight = function () {
                $ionicSideMenuDelegate.toggleRight();
            };
        })

    //CONTROLLER FOR THE VIDEO IN THE "RECORD" PAGE
    .controller('RecordSeekCtrl', function ($scope, $stateParams, MyDatabase) {
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
            // $scope.ngvideo1.seek = ($video1.currentTime) / ($video1.duration) * 100;

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

    .controller('LoginpageCtrl', function ($scope, $stateParams, $cordovaCapture, $location, MyDatabase) {
        /*vidtaken.show = false;*/
        $.jStorage.flush();

        user = {};
        $scope.user = {};
        $scope.user.email = "";
        MyDatabase.setwhichshow("login");
        //OPEN THE DATABASE AND CREATE DB VARIABLE

        page2 = false;
        $scope.autoHeight = window.innerHeight - 20;

        //FUNCTION WHEN LOGIN N BUTTON IS PRESSED
        $scope.login2 = function () {
            MyDatabase.authenticate("user");
            //MAKE USER TYPED TEXT LOWER CASE
            //var username = $scope.user.email.toLowerCase();

            //TRANSACTIONS
            //MyDatabase.authenticate(username);
            //REMOVED FROM SERVICES


        };
    })
    .controller('menuCtrl', function ($scope, $stateParams, $cordovaCapture, $location, MyDatabase) {
        $scope.userinfo = {};
        $scope.userinfo.totalshoe = 5;
        $scope.userinfo.totalinsole = 23;
        $scope.userinfo.totalpremium = 2;
        console.log("menu");
        $scope.whichshow = MyDatabase.getwhichshow();
        $scope.sidemenu = MyDatabase.getsidemenu();

        //OPEN THE DATABASE AND CREATE DB VARIABLE
        var db = openDatabase('gait', '1.0', 'gait DB', 2 * 1024 * 1024);

    })
    .controller('ExitCtrl', function ($scope, $stateParams, $cordovaCapture, $location, MyDatabase, $ionicSideMenuDelegate) {
        $scope.premiumshow = false;
        $scope.slideclass = 'hidepremium';
        $scope.orderdetails = {};
        $scope.orderdetails.shoe = false;
        $scope.orderdetails.insole = false;
        $scope.orderdetails.premium = false;
        $scope.premiumchange = function () {
            $scope.premiumshow = !$scope.premiumshow;
            if ($scope.premiumshow == true) {
                $scope.slideclass = 'showpremium';
            } else {
                $scope.orderdetails.premium = false;
                $scope.slideclass = 'hidepremium';
            };
        };

        page2 = false;

        MyDatabase.setsidemenu();



        $scope.submitorder = function () {

            /*vidtaken.show = false;*/

            //CONVERT TRUE/FALSE to 0/1
            if ($scope.orderdetails.shoe == false) {
                var shoe = 0
            } else {
                shoe = 1
            };
            if ($scope.orderdetails.insole == false) {
                var insole = 0
            } else {
                insole = 1
            };
            if ($scope.orderdetails.premium == false) {
                var premium = 0
            } else {
                premium = 1
            };

            MyDatabase.updateenquiry(shoe, insole, premium);
            //window.location.replace(window.location.origin + window.location.pathname + "#/app/loginpage");
        };

        //SIDE MENU
        $scope.toggleRight = function () {
            $ionicSideMenuDelegate.toggleRight();
        };
        //CLEAR DATA BUTTON
        $scope.cleardata = function () {
            MyDatabase.cleartable();
        };
    });