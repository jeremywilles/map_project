

//api key
// AIzaSyDR_R0fIJ8eCx9SlRLLY5LtPuh9yTF4Oqc

//todo

//info windows with ajax


//live search


//mobile site

var map;

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

  marks();

  }

function marks(){
	console.log(markers.length);
  for(var i = 0; i<markers.length; i++){
  	var loc = markers[i];
  	var latLng = {lat: loc.lat, lng: loc.lng};
  	console.log(latLng);
  	var marker = new google.maps.Marker({
  		position: latLng,
  		map: map,
  		title: loc.name  		
  	});
	}
}



//possible list library
// http://www.listjs.com/

//live search with knockout.js
// http://opensoul.org/2011/06/23/live-search-with-knockoutjs/

//https://developers.google.com/maps/documentation/javascript/markers

//https://developers.google.com/maps/documentation/javascript/infowindows

//http://stackoverflow.com/questions/3094032/how-to-populate-a-google-maps-infowindow-with-ajax-content

var viewModel = {
	locations: ko.observableArray(markers),


	query: ko.observable(''),

	search: function(value){
		
		viewModel.locations.removeAll();

		console.log(value);
		//console.log(locations);
		console.log(things);

		for(var x in data){
				console.log("in for loop");
				console.log(x);
				if(locations[x].name.toLowerCase().indexOf(value.toLowerCase())>=0){
					//console.log(locations[x].name.toLowerCase());
					viewModel.locations.push(locations[x]);
				}
		}
	}
};

viewModel.query.subscribe(viewModel.search);

//viewModel.query.subscribe(function(){console.log(viewModel.search);});

ko.applyBindings(viewModel);


//listview

//