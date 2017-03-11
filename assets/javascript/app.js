///////////////////////////////////////////////////////////////////////////////
// VARIABLE DECLARATIONS
///////////////////////////////////////////////////////////////////////////////

var api_key = "dc6zaTOxFJmzC";
var gifs = {};
var topics = [
    "Picard",
    "Data",
    "Geordi laforge",
    "NCC-1701",
    "Riker",
    "Ferengi",
    "Janeway",
    "Romulans",
    "Borg",
    "phaser"
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
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + query + 
        "&api_key=" + api_key;
    // ajax call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        gifs["gif" + num] = {};
        gifs["gif" + num]["fixed_width_url_animated"] = 
            response.data[num].images.fixed_width.url;
        gifs["gif" + num]["fixed_width_url_unanimated"] = 
            response.data[num].images.fixed_width_still.url;
        gifs["gif" + num]["rating"] = response.data[num].rating
        gifs["gif" + num]["animate"] = false;

        gifs["gif" + num]["name"] = response.data[num].slug
        tablePlacement(num, gifs["gif" + num]);
    });
}

function tablePlacement(num, gif) {
    var a = $("<div>");
    a.addClass("gif-box");

    var b = $("<img>");
    b.attr("id", "gif" + num);
    b.attr("gif-id", num);
    b.attr("src", gif.fixed_width_url_unanimated);
    b.addClass("gif");

    var c = $("<p>");
    c.addClass("gif-info");
    c.append("<b>Name: </b>" + gif.name);

    var d = $("<p>");
    d.addClass("gif-info");
    d.append("<b>Rating: </b>" + gif.rating);

    a.html(b);
    a.append(c);
    a.append(d);

    $("#gif-grid").append(a);
}

function animation(num){
    // if the gif is currently animated...
    if (gifs["gif" + num]["animate"]) {
        gifs["gif" + num]["animate"] = false;
        $("#gif" + num).attr("src", gifs["gif" + num]["fixed_width_url_unanimated"]);
    } else {
        gifs["gif" + num]["animate"] = true;
        $("#gif" + num).attr("src", gifs["gif" + num]["fixed_width_url_animated"]);
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
    topics.push("Star Trek " + $("#add-topic-text").val().trim());
    $("#add-topic-text").val("");
    buttoner();
    getGifs(topics[topics.length - 1], 20);
});

$(document).on("click", ".gif", function(){
    var num = $(this).attr("gif-id");
    animation(num);
});

///////////////////////////////////////////////////////////////////////////////
// MAIN
///////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
    buttoner();
});