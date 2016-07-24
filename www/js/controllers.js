app = angular.module('starter.controllers', [])
.controller('DashCtrl', function($scope) {
  
  var deploy = new Ionic.Deploy();
  
  // Update app code with new release from Ionic Deploy
  $scope.doUpdate = function() {
    deploy.update().then(function(res) {
      console.log('Ionic Deploy: Update Success! ', res);
    }, function(err) {
      console.log('Ionic Deploy: Update error! ', err);
    }, function(prog) {
      console.log('Ionic Deploy: Progress... ', prog);
    });
  };

  // Check Ionic Deploy for new code
  $scope.checkForUpdates = function() {
    console.log('Ionic Deploy: Checking for updates');
    deploy.check().then(function(hasUpdate) {
      console.log('Ionic Deploy: Update available: ' + hasUpdate);
      $scope.hasUpdate = hasUpdate;
    }, function(err) {
      console.error('Ionic Deploy: Unable to check for updates', err);
    });
  }
})
.controller('AppCtrl', function($scope, $rootScope, SoundCloud, $ionicModal,$ionicLoading,$timeout) {

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope,
    animation: 'slide-in-up'
    
  }).then(function(modal) {
    $scope.modal = modal;
     	
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
 $rootScope.$on('section', function(event, data) {
        
            $rootScope.section = data;
      
    }); 
  $rootScope.$on('player:playlist', function(event, data) {
        $rootScope.$apply(function() {
            $rootScope.playlist = data;
        });
    });
  
})
.controller('AfroPickCtrl', function($scope, $http,$q,SoundCloud, SoundCacheData,facebookService,$ionicLoading,$timeout,$ionicAnalytics) {
				$scope.loading = $ionicLoading.show({
				    content: '<i class="icon ion-load-d"></i>',
				    animation: 'fade-in',
				    showBackdrop: false,
				    maxWidth: 50,
				    showDelay: 0
				  });
				  
			 
		$scope.postfeed = facebookService.getPosts();
	 	$scope.numLimit = 10; 

	 			$timeout(function(){
	 				$ionicLoading.hide();
	 					
				},1500);
				
		$ionicAnalytics.track('Artist', {
					    page_name:"Pick",
					    source: "NotJustOk"
					  });		

})
.controller('EventCtrl', function($scope, $http,$q,SoundCloud, SoundCacheData,facebookService,$ionicLoading,$timeout, $ionicAnalytics) {
				$scope.loading = $ionicLoading.show({
				    content: '<i class="icon ion-load-d"></i>',
				    animation: 'fade-in',
				    showBackdrop: false,
				    maxWidth: 50,
				    showDelay: 0
				  });
				  
			 
		$scope.postfeed = facebookService.getEventPosts();
	 	$scope.numLimit = 4; 

	 			$timeout(function(){
	 				$ionicLoading.hide();
	 					
				},1500);
				
					$ionicAnalytics.track('Artist', {
					    page_name:"Event",
					    source: "DJAMEDIA"
					  });		

})
.controller('TracksCtrl', function($scope, $log, $timeout, $ionicPlatform,$cordovaMedia, $rootScope, $http, $state, $window, $ionicModal, $ionicPopover, SoundCloud, SoundCacheData, srchQueryService, $ionicLoading, $ionicAnalytics) {
	
	var url = "https://api.soundcloud.com/tracks";
	
	var params = {
			client_id : "655bce42b527848bbc9732b0b5f03916",
			q : "Olamide",
			genres : "Afrobeats, afrobeats, naija, 9jaJist, 9ja, Azonto, afro-hiphop, afrobeatsgroove, afrobeatsjazz, naija RnB, Afrobeat Funk, Afrofunk, Afro house, Hiplife, Hip-life",
			track_type : "original, remix",
			limit: 50
	};
			
	 var doSearch = ionic.debounce(function(query) {
	//var doSearch = function(query) {
		 
		 $scope.moredataURL = "";	
		  $scope.sounds =[];
		  var tracks = [];

         //artist or user	 
         SC.initialize({
			client_id : "655bce42b527848bbc9732b0b5f03916"
			});   	

						
			$http({
				method:"GET",
				url:url,
				params: {
					client_id : params.client_id,
					q : query,
					genres : "Afrobeat, Afrobeats, Azonto, Afro-soul, Afro hip-hop, Afrobfunk,najia RnB, naija hiphop",
					limit: 40,
					linked_partitioning: 1,
					cache : SoundCacheData
				},
	            contentType: "application/json; charset=utf-8",
	            dataType: "json"
				}).success(function(data){
					var data = data.collection;
					 
					  	$scope.moredataURL= data.next_href;
						 
					    $ionicAnalytics.track('Artist', {
						    page_name:"artist/track",
						    artist_searched: $scope.query
						  });
	
					 $scope.$broadcast('scroll.refreshComplete');
					 
				         SC.initialize({
							client_id : "655bce42b527848bbc9732b0b5f03916"
						
						});
						var track = {};
				            for (var i = 0; i < data.length; i ++) {
				                SC.stream( data[i].uri + '/stream?client_id=' + params.client_id, {
				                	useHTML5Audio: true,
	  						 		 preferFlash: false
				                },function( sm_object ){
				                     track = {
				                        id: data[i].id,
				                        user:data[i].user,
				                        artwork_url: data[i].artwork_url,
				                        title: data[i].title,
				                        artist: data[i].genre,
				                        downloadable: data[i].downloadable,
				                        download_url: data[i].download_url,
				                        url: sm_object.url
				                    };
				                     //$scope.$apply(function () {
				                     	
				                         tracks.push(track);
				                     //});
				                });
				                
				            }    
				            angular.copy(tracks, $scope.sounds);
				            return $scope.sounds;
				        },function(){
				        	 $scope.$broadcast('scroll.refreshComplete');
				        });
				 	$ionicLoading.hide();
				 	
	
		  },2000);
		  
		  $scope.search = function() {
		  	$scope.loading = $ionicLoading.show({
				    content: '<i class="icon ion-load-d"></i>',
				    animation: 'fade-in',
				    showBackdrop: false,
				    maxWidth: 50,
				    showDelay: 0
				  });
		  	 var queryText = srchQueryService.getSearchString($scope.query); 
		  	   
		  	   	doSearch($scope.query);
		  	
		    	
		  };
		$scope.doRefresh = function() {
		     $scope.search();

		  };

	 $scope.loadMoreData=function(){
	 
	    };

    $rootScope.$broadcast('section', "artist");
       
		  	  
		/*$ionic modal*/		  
				  
		$ionicModal.fromTemplateUrl('templates/modal.html', {
		    scope: $scope,
		    animation: 'slide-in-up'
		  }).then(function(modal) {
		    $scope.modal = modal;
		  });
		  $scope.openModal = function() {
		    $scope.modal.show();
		    
		  };
		  $scope.closeModal = function() {
		    $scope.modal.hide();
		  };
		  // Cleanup the modal when we're done with it!
		  
		  $scope.$on('$destroy', function() {
		    $scope.modal.remove();
		  });
		  // Execute action on hide modal
		  $scope.$on('modal.hidden', function() {
		    // Execute action
		  });
		  // Execute action on remove modal
		  $scope.$on('modal.removed', function() {
		    // Execute action
		  });
		  $scope.$on('playlistType',function(event,data){
			  	//console.log(data);
			  	//$scope.playlistType = data;
			  });		  

})

.controller('VideosCtrl', function($scope, $rootScope, $http, $state, $sce, SoundCloud, SoundCacheData,videoService,srchQueryService,$ionicLoading,$ionicAnalytics) {
	SC.initialize();
	SC.streamStopAll;
	var querytext = "";
	$scope.loading = $ionicLoading.show({
				    content: '<i class="icon ion-load-d"></i>',
				    animation: 'fade-in',
				    showBackdrop: false,
				    maxWidth: 50,
				    showDelay: 0
				  });
				  
				  
				  
	$scope.fetchSrchQuery = srchQueryService.displaySearchString();
	$scope.$watch('fetchSrchQuery', function(newVal, oldVal){
		console.log($scope.fetchSrchQuery);
		querytext = $scope.fetchSrchQuery.q;

		if(querytext !== (undefined || "")){
			//$scope.videos = videoService.getPosts(querytext,vidCacheData);
			document.getElementById('query').value = querytext;
			$scope.query = querytext;
			$scope.videos = videoService.getPosts("VideoCacheData",querytext);
		}
	}, true);
			
			
		var doSearch = ionic.debounce(function(query) {
		    app.storeQuery = query;
		 	$scope.videos = videoService.getPosts("VideoCacheData",$scope.query); //artist or user
		 	
		  }, 500);
		  
		  $scope.search = function() {
		    doSearch($scope.query);
		  };
		  
			$scope.doRefresh = function() {
			     $scope.search();
	
			  };
			 $ionicAnalytics.track('Artist', {
					    page_name:"video",
					    artist_searched: $scope.query
					  }); 
					  
			$rootScope.$on('music:isPlaying', function(event, data) {
		       //console.log(data);
		       $rootScope.$apply(function() {
	            $rootScope.playlist = data;
	        });
	       
	  	});			  
})

.controller('SpecialCtrl', function($scope, $http, SoundCloud, SoundCacheData) {
 	$http.get("https://api.soundcloud.com/users/96988665/tracks?client_id=655bce42b527848bbc9732b0b5f03916")
 	.then(function(response){
 		
 				$scope.djtracks = response.data;

   			},
   			 function(response){
   				console.log(response.data);
   			});	
})

.controller('PlaylistCtrl',function($scope, $rootScope, $state, $stateParams, $ionicPlatform, $cordovaMedia,  SoundCloud, SoundCacheData, $http, $ionicLoading, $ionicLoading, $log) {

var params = {
			client_id : "655bce42b527848bbc9732b0b5f03916"
	};
	var userid = $stateParams.userid;
	    userid = userid.split(':');
		userid = userid[1];
	var user_uri = "https://api.soundcloud.com/users/"+userid+"/playlists?client_id=655bce42b527848bbc9732b0b5f03916";
	$scope.userPlaylists = [];
	$scope.playlist = [];
	//console.log(userPlaylists.length);
		$scope.loading = $ionicLoading.show({
				    content: '<i class="icon ion-load-d"></i>',
				    animation: 'fade-in',
				    showBackdrop: false,
				    maxWidth: 50,
				    showDelay: 0
				  });
		  
   		$http.get(user_uri)
   			.then(function(response){
   				
   				angular.copy(response.data, $scope.userPlaylists);
				//angular.copy(response.data, tracks);
	    		
   				if ($scope.userPlaylists.length > 0) {
   					
   					$scope.username = $scope.userPlaylists[0].user.username;
   					$scope.avatar = $scope.userPlaylists[0].user.avatar_url;
   					$scope.title = $scope.userPlaylists[0].title;
   					$scope.userPlaylists = $scope.userPlaylists[0];
   					
					 var track = [];
					 var trackdata ={};
				            for (var i = 0; i < response.data.length; i++) {
				            	
				            		
				            		for(var j = 0; j < response.data[i].tracks.length; j++){
				            			
				            			SC.initialize({
											client_id : params.client_id
										
										});
				   				SC.stream( response.data[i].tracks[j].stream_url + '?client_id=' + params.client_id, {
						                	useHTML5Audio: true,
			  						 		 preferFlash: false
						                },function( track_object ){
						                     trackdata = {
						                        id: response.data[i].tracks[j].id,
						                        user:response.data[i].tracks[j].user.username,
						                        artwork_url:response.data[i].tracks[j].artwork_url,
						                        title:response.data[i].tracks[j].title,
						                        artist:response.data[i].tracks[j].genre,
						                        downloadable:response.data[i].tracks[j].downloadable,
						                        download_url:response.data[i].tracks[j].download_url,
						                        url: track_object.url
						                    };
						                    
						                     //console.log(track_object.url,'::',response.data[i].tracks[j].id);
						                });
				            			
				            			track.push(trackdata);
				            			
				            		}
				            		                
		   						
		   					}
		   				
		   					
		   			angular.copy(track, $scope.playlist);
					$ionicLoading.hide();
   				}else{

   					document.getElementById('playlists').innerHTML = '<h3 ng-if="!userPlaylists.length">Oops! something went wrong..!</h3>';
   					$ionicLoading.hide();
   					return;
   				}
   				
   			},
   			 function(response){
   			 	
   			 		return response, $scope.playlist;
   			 		
   				$rootScope.$broadcast('playlistType', $scope.playlist[0].user.username);
   			});
    
		
})
.controller('RadioCtrl',function($scope, $rootScope, $state, $stateParams, $ionicPlatform, $cordovaMedia, $http, $ionicLoading, $ionicLoading, $log) {
	$scope.stationList = [
		{
			name: "MusicNest Radio",
			imageURL: "http://www.musicnestradio.com/wp-content/uploads/2016/03/applogoblack.png",
		 	link : "http://109.123.114.172:6441/Live"
		 }
	];
	
})
.directive('pushSearch', function() {
  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      var amt, st, header;

      $element.bind('scroll', function(e) {
        if(!header) {
          header = document.getElementById('search-bar');
        }

      });
    }
  };
});

