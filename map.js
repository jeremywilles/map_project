

//api key
// AIzaSyDR_R0fIJ8eCx9SlRLLY5LtPuh9yTF4Oqc

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}

//possible list library
// http://www.listjs.com/

//live search with knockout.js
// http://opensoul.org/2011/06/23/live-search-with-knockoutjs/

//https://developers.google.com/maps/documentation/javascript/markers

//https://developers.google.com/maps/documentation/javascript/infowindows

//http://stackoverflow.com/questions/3094032/how-to-populate-a-google-maps-infowindow-with-ajax-content



//todo
//markers

var locations = [
	{name: "Animal Kingdom"},
	{name: "Epcot"},
	{name: "Magic Kingdom"},
	{name: "Hollywood Studios"},
	{name: "Disney Springs"}];

var viewModel = {
	locations: ko.observableArray(locations)
};

ko.applyBindings(viewModel);

//listview

//