var query;
var searchCount = 0;

function getQuery() {
	query = searchForm.inputbox.value;
}

function searchWikipedia() {
	getQuery();
    var jsonURL = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch="+query+"&format=json&callback=?";
	$.getJSON(jsonURL, function(json) {
		console.log(json);
		console.log("JSON successfully retrieved!");
		console.log(json.query.search.length);
		searchCount++;
		if (searchCount > 1) {
				$("#entry").html("");
		}
		if (json.query.search.length === 0) {
			if (searchCount <= 1) {
				$("#entry").css("opacity", "1");
			}
			$("#entry").html("No results were found for your query.");
		} else {
			$.each(json.query.search, function(index, value) {
			var title = value.title;
			var snippet = value.snippet;
			var wikiURL = "https://en.wikipedia.org/wiki/"+title;
			$("#entry").css("opacity", "1");
			$("#entry").append("<h2><a href=\""+wikiURL+"\" target=\"_blank\">"+title+"</a></h2>"+"<p>"+snippet+"...<a href=\""+wikiURL+"\" target=\"_blank\">more</a></p>");
			})
		}
	});
}

// Recognize pressing "enter" as pressing the "search" button

$(document).keypress(function(e) {
    if(e.which == 13) {
    	event.preventDefault();
    	searchWikipedia();
    }
});