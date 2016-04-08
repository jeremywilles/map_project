

//api key
// AIzaSyDR_R0fIJ8eCx9SlRLLY5LtPuh9yTF4Oqc

//todo

//info windows with ajax



//mobile site

var map, infoWindow;

var gMarks = [];

var markers = [
	{name: "Animal Kingdom", lat: 28.3580, lng: -81.5900 },
	{name: "Epcot", lat: 28.3710, lng: -81.5500},
	{name: "Magic Kingdom", lat: 28.4186, lng: -81.5811},
	{name: "Hollywood Studios", lat: 28.3570, lng: -81.5561},
	{name: "Disney Springs", lat: 28.3710, lng: -81.5180},
	{name: "Animal Kindom Lodge", lat: 28.3527, lng: -81.6034},
	{name: "Disney BoardWalk Resort", lat: 28.3679, lng: -81.5553}];

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
	

console.log('1'+gMarks);

function clearOverlays(markersArray) {
	console.log(markersArray);
  for (var i = 0; i < markersArray.length; i++ ) {
    markersArray[i].setMap(null);
  }
  markersArray.length = 0;
}

//test input


function addInfo(){
 var contentString = '<div id="content">'+
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
		addInfo();
		gMarks[0].setAnimation(google.maps.Animation.BOUNCE);
		infoWindow.open(map, gMarks[0]);
		
	}
};

viewModel.query.subscribe(viewModel.search);

ko.applyBindings(viewModel);

