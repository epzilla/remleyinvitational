function updateState(fileToLoad) {

	var fileToLoadName = fileToLoad + '.html';

	if ((fileToLoad == "index") || (fileToLoad == "")) {
		fileToLoad = "index";
		fileToLoadName = "info.html";
	}

	if (typeof _gaq !== 'undefined') {
		console.log('pushed '+fileToLoad);
		_gaq.push(['_trackPageview', '/'+fileToLoadName]);
	}

    $('#guts').fadeOut(250, function() {
		if (fileToLoad === "traditions"){
			$('#guts').addClass("trad");
		}
		else {
			$('#guts').removeClass("trad");
		}
		$.get(fileToLoadName, function(data) {
			$('#guts').html(data).fadeIn(250);
		});
    });
    // Iterate over all nav links, setting the "selected" class as-appropriate.
    $('.remnav').each(function(){
      var that = $(this);
      that[ that.find('a').attr( 'href' ) === fileToLoadName ? 'addClass' : 'removeClass' ]( 'active' );
    });
    
    $('.collapse').collapse('hide');

}

$(function(){
	var currentState = location.pathname.split('/').pop();
	if (currentState != "") {
		//We're not at the home page
		updateState(currentState);
	}
	var History = window.History;
	History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
        var State = History.getState(); // Note: We are using History.getState() instead of event.state
        var theState = location.pathname.split('/').pop();
		updateState(theState);
    });

	$('.remnav').delegate("a", "click", function() {
		var theState = $(this).attr("href");
		var rex = /\.html/;
		var newState = theState.replace(rex, "");
		History.pushState(null,null,newState);
		return false;
	});

  $("#socialbuttons a[href^='http://']").attr("target","_blank");
  //History.pushState(null,null,"index");
});

$(document).keydown(function(event) {
	var keypressed = event.which;
	switch (keypressed) {
		case 73:
			updateState('info');
			break;
		case 82:
			updateState('results');
			break;
		case 84:
			updateState('traditions');;
			break;
		case 80:
			updateState('photos');;
			break;
		case 191:
			alert('Ah, you\'ve found the key that reveals the keyboard shortcuts. Good job!\n\n' + 
				'i: Info\nr : Past Results\nt : Traditions\np : Photos');
			break;
	}
});