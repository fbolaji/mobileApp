app = angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, SoundCloud, $ionicModal, $timeout) {

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
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
})
.controller('AfroPickCtrl', function($scope, $http, SoundCloud, SoundCacheData) {
	
})
.controller('ExploreCtrl', function($scope, $http, SoundCloud, SoundCacheData) {
	
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
.controller('TracksCtrl', function($scope, $http, SoundCloud, SoundCacheData) {
		$scope.searchText = {q: "Afrobeat"}; 

	 
	
	 var doSearch = ionic.debounce(function(query) {
		    
		 	$scope.sounds = SoundCloud.searchScloud("SoundCacheData",$scope.query); //artist or user
		 
		  }, 200);
		  
		  $scope.search = function() {
		    doSearch($scope.query);
		  };
	  
})

.controller('PlaylistCtrl',function($scope, $stateParams, $ionicPlatform, $cordovaMedia,  SoundCloud, SoundCacheData, $http, $ionicLoading, $log) {

       // var userid = $stateParams.userid;
// 	
		// $scope.userPlaylists = SoundCloud.userPlaylist("SoundCacheData",userid);
		// console.log($scope.userPlaylists);
		
		
		
	var userid = $stateParams.userid;
	//var str = userid.split(":");
	 // userid=str[1];
	
	
	
	var user_uri = "https://api.soundcloud.com/users/"+userid+"/playlists?client_id=655bce42b527848bbc9732b0b5f03916";
	var userPlaylists = [];

   		$http.get(user_uri)
   			.then(function(response){
   				
   				angular.copy(response.data, userPlaylists);
   				
   				$scope.username = userPlaylists[0].user.username;
   				$scope.userPlaylists = userPlaylists;
   				

   			},
   			 function(response){
   				console.log(response.data);
   			}
   		);

		
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
        st = e.detail.scrollTop;
        if(st < 0) {
          header.style.webkitTransform = 'translate3d(0, 0px, 0)';
        } else {
          header.style.webkitTransform = 'translate3d(0, ' + -st + 'px, 0)';
        }
      });
    }
  };
});

