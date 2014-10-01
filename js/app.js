angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html",
          controller: 'HomeCtrl'
        }
      }
    })
    .state('app.record', {
      url: "/record",
      views: {
        'menuContent' :{
          templateUrl: "templates/record.html",
          controller: 'HomeCtrl'
        }
      }
    })
    .state('app.loginpage', {
      url: "/loginpage",
      views: {
        'menuContent' :{
          templateUrl: "templates/loginpage.html",
          controller: 'LoginpageCtrl'
        }
      }
    })
    .state('app.exit', {
      url: "/exit",
      views: {
        'menuContent' :{
          templateUrl: "templates/exit.html",
          controller: 'ExitCtrl'
        }
      }
    });
    
    $urlRouterProvider.otherwise('/app/loginpage');
});

