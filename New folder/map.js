

//api key
// AIzaSyDR_R0fIJ8eCx9SlRLLY5LtPuh9yTF4Oqc

//todo

//info windows with ajax




//mobile site

var map, infoWindow;

var gMarks = [];

var markers = [
	{name: "Animal Kingdom", lat: 28.3580, lng: -81.5900, id: 'disneys-animal-kingdom-lake-buena-vista' },
	{name: "Epcot", lat: 28.3710, lng: -81.5500, id: 'epcot-lake-buena-vista-2'},
	{name: "Magic Kingdom", lat: 28.4186, lng: -81.5811, id: 'magic-kingdom-park-lake-buena-vista'},
	{name: "Hollywood Studios", lat: 28.3570, lng: -81.5561, id: 'disneys-hollywood-studios-lake-buena-vista'},
	{name: "Disney Springs", lat: 28.3710, lng: -81.5180, id: 'disney-springs-lake-buena-vista-2'},
	{name: "Animal Kindom Lodge", lat: 28.3527, lng: -81.6034, id: 'disneys-animal-kingdom-lodge-orlando'},
	{name: "Disney BoardWalk Resort", lat: 28.3679, lng: -81.5553, id: 'disneys-boardwalk-lake-buena-vista-4'}];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 28.386292, lng: -81.554607},
    zoom: 12
  });
  marks(markers);

}

function marks(markers){
  for(var i = 0; i<markers.length; i++){
  	//console.log(markers[i]);
  	var loc = markers[i];
  	var latLng = {lat: loc.lat, lng: loc.lng};
  	var marker = new google.maps.Marker({
  		position: latLng,
  		map: map,
  		title: loc.name  		
  	});
  	marker.addListener('click', selected);
  	gMarks.push(marker);
	}
}
	

function clearOverlays(markersArray) {
	console.log(markersArray);
  for (var i = 0; i < markersArray.length; i++ ) {
    markersArray[i].setMap(null);
  }
  markersArray.length = 0;
}

//test input
function nonce_generate() {
  return (Math.floor(Math.random() * 1e12).toString());
}



function addInfo(place){

	console.log(place.id);
	var data;

	var contentString = '<div id="content"></div>';

	var yelp_url = 'http://api.yelp.com/v2/business/' + place.id;

    var parameters = {
      oauth_consumer_key: "qRkzbb3AEjVSjJCp62JqOw",
      oauth_token: "N3A6NtzOh_MozWQxrCVEDJqOT9rE3bjh",
      oauth_nonce: nonce_generate(),
      oauth_timestamp: Math.floor(Date.now()/1000),
      oauth_signature_method: 'HMAC-SHA1',
      oauth_version : '1.0',
      callback: 'cb'              // This is crucial to include for jsonp implementation in AJAX or else the oauth-signature will be wrong.
    };   

    var encodedSignature = oauthSignature.generate('GET',yelp_url, parameters, "X4l2OtQhUwq7v9uCrU2CkKOfxsk", "v9xCA5ZAlkqXtnB2N4TQ4oNpTj0");
    parameters.oauth_signature = encodedSignature;



// https://discussions.udacity.com/t/passing-ajax-data-to-makers-infowindows/14989
// https://discussions.udacity.com/search?q=get%20api%20data%20into%20infowindow
/*
display:

Name
Telephone:   
Rating: 
Website:
Reviews: 
Yelp logo

*/
    var settings = {
      url: yelp_url,
      data: parameters,
      cache: true,                // This is crucial to include as well to prevent jQuery from adding on a cache-buster parameter "_=23489489749837", invalidating our oauth-signature
      dataType: 'jsonp',
      success: function(results) {
        // Do stuff with results
        console.log(results);
        console.log(results.display_phone);
        $('#content').append(results);

        
      },
      fail: function() {
        // Do stuff on fail
        console.log("fail");
      }
    };

    // Send AJAX query via jQuery library.
    $.ajax(settings);
    console.log(contentString);
    
    /*
  = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site.</p>'+
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';
*/
	infoWindow = new google.maps.InfoWindow({
    			content: contentString
  			});


}


function selected(){
	console.log(this);
	addInfo();
	this.setAnimation(google.maps.Animation.BOUNCE);
	infoWindow.open(map, this);
	
}

	






//live search with knockout.js
// http://opensoul.org/2011/06/23/live-search-with-knockoutjs/

//https://developers.google.com/maps/documentation/javascript/infowindows

//http://stackoverflow.com/questions/3094032/how-to-populate-a-google-maps-infowindow-with-ajax-content

var viewModel = {
	markers: ko.observableArray(markers),

	query: ko.observable(''),

	search: function(value){

		var newMap = [];
		
		viewModel.markers([]);	
		clearOverlays(gMarks);
		this.clear(gMarks);
		for(var x in markers){
			if(markers[x].name.toLowerCase().indexOf(value.toLowerCase())>=0){
				viewModel.markers.push(markers[x]);
				newMap.push(markers[x]);		
				marks(newMap);
			}
		}
	},

	pick: function(pick){
		console.log(pick);
		clearOverlays(gMarks);
		marks([pick]);
		viewModel.markers([pick]);
		addInfo(pick);
		gMarks[0].setAnimation(google.maps.Animation.BOUNCE);
		infoWindow.open(map, gMarks[0]);
		
	},

	clear : function(data){
		console.log(data);
	}
};

viewModel.query.subscribe(viewModel.search);

ko.applyBindings(viewModel);



