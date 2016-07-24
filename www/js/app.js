// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic','starter.controllers','ionic.service.analytics', 'angularSoundManager','ngCordova','ngSanitize','ngAnimate','vimeoEmbed']);

app.storeQuery = "Fela Kuti";

    
app.run(function($ionicPlatform, $ionicAnalytics, $rootScope, $window) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    
    $ionicAnalytics.register();
    
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });

  
})
.service('srchQueryService', function($window){	
	$window.searchString = {q:null};
	return {
    getSearchString : function(data){
    	console.log(data);
     return $window.searchString.q = data;
    },
    displaySearchString : function(){
    	console.log($window.searchString);
      return $window.searchString;
    }
    
  };

  
})
.service('facebookService', function($q,$http,$window) {
	var appid="1535347156761607";
 	var accessToken ="2363f42645b681ce76ca06240ff408e7";
 	var authURL = "https://graph.facebook.com/oauth/access_token?" + "client_id=" + appid + "&client_secret=" + accessToken + "&grant_type=client_credentials";
 	var pageURL = "https://graph.facebook.com/notjustokpage?fields=posts.limit(10){caption,created_time,description,full_picture,link,picture,story,permalink_url,likes,story_tags,promotion_status},videos.limit(10){source,video_insights}&";
 	var eventURL = "https://graph.facebook.com/djamedia?fields=posts.limit(10){caption,created_time,description,full_picture,link,picture,story,permalink_url,likes,story_tags,promotion_status},videos.limit(10){source,video_insights}&";
    return {
        getPosts: function(){
			  var postfeed =[];
			  
			  $http.get(authURL).then(function(response){
			  	
				  	$http({
						method:"GET",
						url: pageURL+"access_token=1535347156761607|36R4mGyhYyT20QQRKGBAnp3W5as",
			            contentType: "application/json; charset=utf-8",
			            dataType: "json"
					}).success(function(data){
						
						angular.copy(data.posts.data, postfeed);
						
						
					});
			  });
        	return postfeed;
       },
       getEventPosts: function(){
			  var postfeed =[];
			  
			  $http.get(authURL).then(function(response){
			  	
				  	$http({
						method:"GET",
						url: eventURL+"access_token=1535347156761607|36R4mGyhYyT20QQRKGBAnp3W5as",
			            contentType: "application/json; charset=utf-8",
			            dataType: "json"
					}).success(function(data){
						
						angular.copy(data.posts.data, postfeed);
						
						
					});
			  });
        	return postfeed;
        }
    };
}) 
.service('videoService', function($q,$http,$window, $ionicLoading) {
	var clientId="e04220c8394aa1cd676b9ff81af84247dba66129";
	var clientSecret = "FdWtOC7KicgEQnFztaXDcCCWsC2PWlfbwh98BIoDwgD3oiyJ2Vay99jNoAr4VJS+I2+J5wlZSwPDuiiB5v/7tuS1q0HF8sZgeOu8M6HtwqQZjZSpihQTj7Mhj9cBPreR";
 	var accessToken ="4cf82ff271bda16e0135a7de3625a1e9";
 	var authURL = "https://api.vimeo.com/oauth/"+accessToken;
 	var pageURL = "https://graph.facebook.com/notjustokpage?fields=posts.limit(10){caption,created_time,description,full_picture,link,picture,story,permalink_url,likes,story_tags,promotion_status},videos.limit(10){source,video_insights}&";
 	
    return {
        getPosts: function(c,query){
        	
			  var videofeed =[];
			  $http({
						method:"GET",
						url: "https://api.vimeo.com/videos?",
						params:{
							per_page:10,
							query:query || "Fela Kuti",
							genres : "Afrobeat, Afrobeats, Azonto, Afro-soul, Afro hip-hop, Afrobfunk,najia RnB, naija hiphop",
							client_id:clientId,
							client_secret:clientSecret,
							access_token:accessToken
						},
						cache:c,
			            contentType: "application/json; charset=utf-8",
			            dataType: "json"
					}).success(function(data){
						
						angular.copy(data.data, videofeed);
						console.log(videofeed);
						$ionicLoading.hide();
					});
			
        	return videofeed;
        }
    };
}) 
.service('SoundCloud', function($http, $q,$ionicLoading) {
	//clientId = 655bce42b527848bbc9732b0b5f03916
	//authern = 31539ba36781ccbf506d6510f4c665ad
	//genres : "afrobeats, Afrobeats, naija, 9jaJist, 9ja, Azonto, afro-hiphop, afrobeatsgroove, afrobeatsjazz, nigeria, ghana, naija RnB, Afrobeat Funk"
	var url = "https://api.soundcloud.com/tracks";
	
	var params = {
			client_id : "655bce42b527848bbc9732b0b5f03916",
			q : "Olamide",
			genres : "Afrobeat, Afrobeats, Azonto, Afro-soul, Afro hip-hop, Afrobfunk,najia RnB, naija hiphop",
			limit: 15
	};
			
	return{
		postFeeds : function(){
			var posts = [];
			
				$http({
					method:"GET",
					url:data.json,
		            contentType: "application/json; charset=utf-8",
		            dataType: "json"
				}).success(function(data){
					posts= data;
				});
	   
	        	return posts;
		
		},
	    searchScloud: function(c,query) {
	    	var sounds = [];
			var tracks = [];   
	    
	       $http({
				method:"GET",
				url:url,
				params: {
					client_id : params.client_id,
					q : query || "Fela Kuti",
					genres : "Afrobeats, afrobeats, naija, 9jaJist, 9ja, Azonto, afro-hiphop, afrobeatsgroove, afrobeatsjazz, naija RnB, Afrobeat Funk, Afrofunk",
					limit:20,
					cache : c
				},
	            contentType: "application/json; charset=utf-8",
	            dataType: "json"
			}).success(function(data){
				
				angular.copy(data, sounds);

	            
	         });
			
	   		return sounds;
	        
	      },
	      userPlaylist:function(c,userid){
			var userPlaylists = [];
			var user_permUrl = "https://api.soundcloud.com/users/"+userid+"/playlists?client_id="+params.client_id;
		
		   		$http.get(user_permUrl, {cache:c})
		   			.then(function(response){
		   				
		   					angular.copy(response.data, userPlaylists);
		   				
		   				
		   				return userPlaylists;
		   				
						
		   			},
		   			 function(response){
		   				console.log(response.data);
		   			}
		   		);


	      }
	};
	
})
.factory('videoCacheData', ['$cacheFactory', function($cacheFactory) {
    return $cacheFactory('videoData');
  }])
.factory('SoundCacheData', ['$cacheFactory', function($cacheFactory) {
    return $cacheFactory('soundData');
  }])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  .state('app.update',{
  	url:'/update',
  	templateUrl: 'templates/update.html',
  	controller: 'DashCtrl'
  })
   .state('app.landing', {
      url: '/landing',
      views: {
        'menuContent': {
          templateUrl: 'templates/landing.html',
          controller: 'AppCtrl'
        }
      }
    })
  .state('app.afropick', {
      url: '/afrobeatz-pick',
      views: {
        'menuContent': {
          templateUrl: 'templates/afrobeatz-pick.html',
          controller: 'AfroPickCtrl'
        }
      }
    })
  .state('app.events', {
      url: '/events',
      views: {
        'menuContent': {
          templateUrl: 'templates/events.html',
          controller: 'EventCtrl'
        }
      }
    })
  .state('app.videos', {
      url: '/videos',
      views: {
        'menuContent': {
          templateUrl: 'templates/video.html',
          controller: 'VideosCtrl'
        }
      }
    })  
    .state('app.tracks', {
      url: '/tracks',
      views: {
        'menuContent': {
          templateUrl: 'templates/tracks.html',
          controller: 'TracksCtrl'
        }
      }
    })
    .state('app.radio', {
      url: '/radio',
      views: {
        'menuContent': {
          templateUrl: 'templates/radio-stations.html',
          controller: 'RadioCtrl'
        }
      }
    })
  .state('app.user-playlist', {
    url: '/user-playlist/:userid',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })
    .state('app.djtony', {
      url: '/djtony',
      views: {
        'menuContent': {
          templateUrl: 'templates/special.html',
          controller: 'SpecialCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/tracks');
});

