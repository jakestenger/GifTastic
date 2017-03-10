///////////////////////////////////////////////////////////////////////////////
// VARIABLE DECLARATIONS
///////////////////////////////////////////////////////////////////////////////

var api_key = "dc6zaTOxFJmzC";
var topics = [
	"Picard",
	"Data",
	"Geordi laforge",
	"NCC-1701",
	"Riker",
	"Ferengi",
	"Janeway",
	"Romulans"
];

///////////////////////////////////////////////////////////////////////////////
// PRIMARY AND UTILITY FUNCTIONS
///////////////////////////////////////////////////////////////////////////////

function buttoner() {
	$("#button-row").empty();
	for (var i = 0; i < topics.length; i++) {
		var b = $("<button>");
		b.addClass("btn btn-info search");
		b.attr("id", "btn-" + i);
		b.attr("topic-index", i);
		b.text(topics[i]);
		$("#button-row").append(b);
	}
}

function makeGrid() {

}

function giphy_search(query, num) {
	// replace all spaces with plus symbols using regex
	query = query.replace(/ /g,"+");
	// combine variables into a single url
	queryURL = "http://api.giphy.com/v1/gifs/search?q=" + query + 
		"&api_key=" + api_key;
	// ajax call
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		tablePlacement(num, response.data[num].images.fixed_width.url);
	});
}

function tablePlacement(num, url) {
	var a = $("<img>");
	a.attr("src", url);
	a.addClass("gif");
	$("#gif-grid").append(a);
}

function animation(state){
	if (state === 'on') {

	} else if (state === 'off') {

	} else {
		console.log("unexpected argument");
		return;
	}
}

function getGifs(query, number) {
	$("#gif-grid").empty();
	for (var i = 0; i <= number; i++) {
		giphy_search(query, i);
	}
}

///////////////////////////////////////////////////////////////////////////////
// CLICK FUNCTIONS BELOW
///////////////////////////////////////////////////////////////////////////////

$(document).on("click", ".search", function(){
	var id = $(this).attr("topic-index");
	getGifs(topics[id], 20);
});

$("#btn-add").on("click", function(){
	event.preventDefault();
	topics.push($("#add-topic-text").val().trim());
	$("#add-topic-text").val("");
	buttoner();
	getGifs(topics[topics.length - 1], 20);
});

///////////////////////////////////////////////////////////////////////////////
// MAIN
///////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	buttoner();
});