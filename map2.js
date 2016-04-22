//readme

var places = [
	{name: "Animal Kingdom", lat: 28.3580, lng: -81.5900, id: 'disneys-animal-kingdom-lake-buena-vista' },
	{name: "Epcot", lat: 28.3710, lng: -81.5500, id: 'epcot-lake-buena-vista-2'},
	{name: "Magic Kingdom", lat: 28.4186, lng: -81.5811, id: 'magic-kingdom-park-lake-buena-vista'},
	{name: "Hollywood Studios", lat: 28.3570, lng: -81.5561, id: 'disneys-hollywood-studios-lake-buena-vista'},
	{name: "Disney Springs", lat: 28.3710, lng: -81.5180, id: 'disney-springs-lake-buena-vista-2'},
	{name: "Animal Kindom Lodge", lat: 28.3527, lng: -81.6034, id: 'disneys-animal-kingdom-lodge-orlando'},
	{name: "Disney BoardWalk Resort", lat: 28.3679, lng: -81.5553, id: 'disneys-boardwalk-lake-buena-vista-4'}];

//functional refactor influenced by Matt Prather and his example here:
//http://codepen.io/prather-mcs/pen/KpjbNN

var mapViewModel = function(){

	var self = this;

	self.gMarks = [];

	self.markers = ko.observableArray(places);

	self.query = ko.observable('');

	self.googleMap = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 28.386292, lng: -81.554607},
    zoom: 13
  });

 //this will run when a place from the listview is clicked on

	self.pick = function(item){
		self.clearMap(self.gMarks);
		self.addMarkers([item]);
		self.markers([item]);
		toggleBounce(self.gMarks[0]);
		apiCall(self.gMarks[0]);		
	}

	//searchbox functionality
	//help from http://opensoul.org/2011/06/23/live-search-with-knockoutjs/

	self.search = function(){
		var newMap = [];
		self.markers([]);
		self.clearMap(self.gMarks);
		for(var x in places){
			if(places[x].name.toLowerCase().indexOf(self.query().toLowerCase())>=0){
				self.markers.push(places[x]);
				newMap.push(places[x]);
				self.addMarkers(newMap);
			}
		}
	};

	self.clearMap = function(list){
		for (var i = 0; i < list.length; i++ ) {
    	list[i].setMap(null);
  	}
  	self.gMarks = [];
	};

	//take list of places, create Map Marker objects

	self.addMarkers = function(markers){
		for(var i = 0; i<markers.length; i++){
  		var loc = markers[i];
  		var latLng = {lat: loc.lat, lng: loc.lng};
  		var marker = new google.maps.Marker({
  			position: latLng,
  			map: self.googleMap,
  			title: loc.name
  		});
  	marker.addListener('click', function(){
  		toggleBounce(this);
  		apiCall(this);
  	});
  	self.gMarks.push(marker);
		}
	};

	//turn on bouncing when marker is selected

	var toggleBounce = function(marker){
		console.log("in toggleBounce");
		console.log(marker.getAnimation());
		marker.setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(function(){
			marker.setAnimation(null);
		}, 1300);		
	}

	//API section
	//huge thanks to
	//https://discussions.udacity.com/t/im-having-trouble-getting-started-using-apis/13597
	//and
	//https://github.com/bettiolo/oauth-signature-js

	var apiCall = function(location){
		console.log(location);
		for(var i = 0; i<places.length; i++){
			if(places[i].name == location.title){
				var place = places[i];
			}
		}
		
		var contentString = '<div id="content"></div>';
		var latLng = {lat: location.lat, lng: location.lng};
		var infoWindow = new google.maps.InfoWindow({
			postion: latLng,
			content: contentString
		});
		infoWindow.open(self.googleMap, location);

		var yelp_url = 'http://api.yelp.com/v2/business/' + place.id;

    var parameters = {
      oauth_consumer_key: "qRkzbb3AEjVSjJCp62JqOw",
      oauth_token: "N3A6NtzOh_MozWQxrCVEDJqOT9rE3bjh",
      oauth_nonce: (Math.floor(Math.random() * 1e12).toString()),
      oauth_timestamp: Math.floor(Date.now()/1000),
      oauth_signature_method: 'HMAC-SHA1',
      oauth_version : '1.0',
      callback: 'cb'              // This is crucial to include for jsonp implementation in AJAX or else the oauth-signature will be wrong.
    };

    var encodedSignature = oauthSignature.generate('GET',yelp_url, parameters, "X4l2OtQhUwq7v9uCrU2CkKOfxsk", "v9xCA5ZAlkqXtnB2N4TQ4oNpTj0");
    parameters.oauth_signature = encodedSignature;

    var settings = {
      url: yelp_url,
      data: parameters,
      cache: true,           // This is crucial to include as well to prevent jQuery from adding on a cache-buster parameter "_=23489489749837", invalidating our oauth-signature
      dataType: 'jsonp',
      success: function(results){
        // Do stuff with results
        var yelpContent = $('#content');
        console.log(results);
        var addContent = '<h1>'+results.name+'</h1>'+
        				'<div id="image"><img src="'+results.image_url+'"></div>'+
        				'<div>Phone: '+results.display_phone+'</div>'+
        				'<div>Rating: <img src="'+ results.rating_img_url_small+'"></div>'+
        				'<div>Review: <a href="'+results.url+'">'+results.snippet_text+'</div><br>'+
        				'<div><img src="yelp_powered_btn_light.png" alt="Powered by Yelp"></div>'
        yelpContent.append(addContent);        
      },
      fail: function() {
        // Do stuff on fail
         var yelpContent = $('#content');
         var addContent = '<h1>Yelp API Content<br>Failed to Load</h1>';
         yelpContent.append(addContent);
      }
    };
    // Send AJAX query via jQuery library.
    $.ajax(settings);
	}
	self.addMarkers(places);
}

ko.applyBindings(new mapViewModel());
