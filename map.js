

//api key
// AIzaSyDR_R0fIJ8eCx9SlRLLY5LtPuh9yTF4Oqc

//todo

//info windows with ajax

//mobile site

var map;

var gMarks = [];

var markers = [
	{name: "Animal Kingdom", lat: 28.3580, lng: -81.5900 },
	{name: "Epcot", lat: 28.3710, lng: -81.5500},
	{name: "Magic Kingdom", lat: 28.4186, lng: -81.5811},
	{name: "Hollywood Studios", lat: 28.3570, lng: -81.5561},
	{name: "Disney Springs", lat: 28.3710, lng: -81.5180}];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 28.386292, lng: -81.554607},
    zoom: 13
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
		for(var x in markers){
			if(markers[x].name.toLowerCase().indexOf(value.toLowerCase())>=0){
				viewModel.markers.push(markers[x]);
				newMap.push(markers[x]);		
				marks(newMap);
			}
		}
	},

	pick: function(pick){
		clearOverlays(gMarks);
		marks([pick]);
		viewModel.markers([pick]);
	}
};

viewModel.query.subscribe(viewModel.search);

ko.applyBindings(viewModel);

