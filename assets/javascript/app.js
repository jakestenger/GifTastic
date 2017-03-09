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


function giphy_search(query, num) {
	console.log(num);
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
	return;
}

function tablePlacement(num, url) {
	var a = $("<img>");
	a.attr("src", url);
	a.addClass("gif");
	$("#gif-grid").append(a);
	return;
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
		return giphy_search(query, i);
	};
}


getGifs("picard", 20);