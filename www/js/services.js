
app.factory('Spotify', function($http, $q, albumCacheData) {
	var artists = [];
	var searchApi = "https://api.spotify.com/v1/search";
	var listAlbumsURL= "https://api.spotify.com/v1/albums/";
	var albumParams = {
Authorization:'Bearer BQCvnnHNFKhiyGFUZUnOkBuPH0Uhavzo_Gg2opX5Je4-dKnuR0m5L2SuBIeLPU8zmBk61WrPbSECfAS6Mfk2wvAtemUyn5bwOX3s7EdWuaYJThlCyLwD-epCJ5DjWtDI8FGHvYuttBqwGBLK4aTcgpNMD6jx'
		
	};
	var params = {
	q:'Olamide',
	type:'album',
	limit: 20,
	offset: 5,
	Authorization:'Bearer BQBxOecsm86thVJDdxdH2ye8QnFFH8NIi_-xMaESgLz0VyiBiAPZ061PQS7SETCGz50rcxdGEHnUa3bm30GmYNOo00oFELvN7u7fF7Uurk1muja4bHphWRAYzgOQ6qnMLm8BSj4XwBwSXirG1gEUxJk-Gk3K'
		};

	return {
	    artistAlbums: function() {
	    	var albums = {};
	        $http({
				method:"GET",
				url:url,
				params: params,
	            contentType: "application/json; charset=utf-8",
	            dataType: "json"
			}).success(function(data){
				angular.copy(data.albums, albums);
			});
	        return albums;
	      }
		// getArtist : function(id){
			// return $http({
					// method:"GET",
					// url : listAlbumsURL+id,
					// params:albumParams,
					// contentType: "application/json; charset=utf-8",
                    // dataType: "json"
				// }).success(function(data){
					// //artistAlbum = data.images;
					// return data;
				// });
		// }
	};
  
  
  

/*  return {
    artists: dataservice,
    getArtists: function() {
      return this.artists;
    },
    getArtist: function(artistId) {
      var deferred = $q.defer();
	      angular.forEach(this.artists, function(v,k) {
	        if (this.id === artistId) {
	        	
	        	deferred.resolve(this);
	        	
	        }
	        
	      });

      return deferred.promise;
     }*/
})

  .factory('myCacheData', ['$cacheFactory', function($cacheFactory) {
    return $cacheFactory('albumData');
  }]);