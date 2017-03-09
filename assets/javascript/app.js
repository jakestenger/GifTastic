var api_key = "dc6zaTOxFJmzC";

var topics = [
	"picard",
	"data",
	"geordi laforge",
	"NCC-1701",
	"riker",
	"ferengi",
	"janeway",
	"romulans"
];

function buttoner() {
	$("#button-row").empty();
	for (var i = 0; i < topics.length; i++) {
		b = $("<button>");
		b.addClass("")
		$("#button-row").append()
	}
}

function giphy_search(query, num) {
	// replace all spaces with plus symbols using regex
	query = query.replace(/ /g,"+");
	// combine variables into a single url
	queryURL = "http://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=" + api_key;
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
	};
}

function getGifs(query, number) {
	for (var i = 0; i <= number; i++) {
		giphy_search(query, i);
	};
}


getGifs("picard", 20);