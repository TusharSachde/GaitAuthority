var db = openDatabase('gait', '1.0', 'gait DB', 2 * 1024 * 1024);

db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS USERS (id Integer PRIMARY KEY AUTOINCREMENT, username)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS ENQUIRY (id Integer PRIMARY KEY AUTOINCREMENT, shoe Integer, insole Integer, premium Integer, user Integer)');
    //tx.executeSql('DROP TABLE USERS');
    //tx.executeSql('DROP TABLE ENQUIRY');
});
var user = {};


var mydatabase = angular.module('mydatabase', [])
    .factory('MyDatabase', function ($location) {
        var whichshow = {
            pagename: 0
        };
        var sidemenu = {
            shoesale: 0,
            insolesale: 0,
            premiumsale: 0
        };
        var users = [];
        var enquiry = [];
        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM USERS', [], function (tx, results) {

                var length = results.rows.length;
                for (var i = 0; i < length; i++) {
                    users.push(results.rows.item(i));
                }
                console.log(users);
            }, null);
            tx.executeSql('SELECT * FROM ENQUIRY', [], function (tx, results) {

                var length = results.rows.length;
                for (var i = 0; i < length; i++) {
                    enquiry.push(results.rows.item(i));
                }
                console.log(enquiry);
            }, null);
        });


        return {
            getsidemenu: function () {
                return sidemenu;
            },
            setsidemenu: function (shoesale, insolesale, premiumsale) {
                /*sidemenu.insolesale = insolesale;
                sidemenu.premiumsale = premiumsale;
                sidemenu.shoesale = shoesale;*/

                db.transaction(function (tx) {
                    console.log("SELECT count(*) AS `totalshoe` FROM `ENQUIRY` WHERE `shoe`= '1' AND `user` = '" + user.id + "' ");
                    //COUNT SHOES
                    tx.executeSql("SELECT count(*) AS `totalshoe` FROM `ENQUIRY` WHERE `shoe`= '1' AND `user` = '" + user.id + "' ", [], function (tx, results) {
                        sidemenu.shoesale = results.rows.item(0).totalshoe;
                    }, null);
                    tx.executeSql("SELECT count(*) AS `totalinsole` FROM `ENQUIRY` WHERE `insole`= '1' AND `user` = '" + user.id + "' ", [], function (tx, results1) {
                        sidemenu.insolesale = results1.rows.item(0).totalinsole;
                    }, null);
                    tx.executeSql("SELECT count(*) AS `totalpremium` FROM `ENQUIRY` WHERE `premium`= '1' AND `user` = '" + user.id + "' ", [], function (tx, results2) {
                        sidemenu.premiumsale = results2.rows.item(0).totalpremium;
                    }, null);
                });
            },
            authenticate: function (username) {
                usernotpresent = true;
                for (var i = 0; i < users.length; i++) {
                    if (users[i].username == username) {
                        console.log(users[i]);
                        usernotpresent = false;
                        user = users[i];
                        window.location.replace(window.location.origin + window.location.pathname + "#/app/record");
                    }


                }
                if (usernotpresent) {
                    db.transaction(function (tx) {
                        //SEARCH IF USER EXISTS
                        tx.executeSql('INSERT INTO `USERS` (`username`) VALUES ("' + username + '")', [], function (tx, results1) {
                            // console.log("Row INSERTED");
                            db.transaction(function (tx2) {
                                //SEARCH IF USER EXISTS
                                tx2.executeSql('SELECT * FROM USERS WHERE `username`="' + username + '"', [], function (tx2, results2) {
                                    user = results2.rows.item(0);
                                    users.push(user);
                                    console.log("Row INSERTED");
                                    window.location.replace(window.location.origin + window.location.pathname + "#/app/record");
                                }, null);
                            });

                        }, null);
                    });
                }


            },
            setwhichshow: function (name) {
                whichshow.pagename = name;
            },
            getwhichshow: function () {
                return whichshow;
            },
            updateenquiry: function (shoe, insole, premium) {
                db.transaction(function (tx) {
                    console.log(user);
                    var sqlstatement = 'INSERT INTO ENQUIRY (shoe, insole, premium, user) VALUES (' + shoe + ',' + insole + ',' + premium + ',' + user.id + ')';
                    console.log(sqlstatement);
                    tx.executeSql(sqlstatement, [], function (tx, results) {
                        console.log("RAOW INSERTED");
                        window.location.replace(window.location.origin + window.location.pathname + "#/app/record");
                    }, null);
                });
            },
        }
    });