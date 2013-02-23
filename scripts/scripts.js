$(function(){
	function updateState(fileToLoad) {

		var fileToLoadName = fileToLoad + '.html';

		if ((fileToLoad == "") || (fileToLoad == null)) {
			fileToLoad = "index";
			fileToLoadName = "info.html";
		}
		
		console.log(fileToLoad);
		console.log(fileToLoadName);

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

	window.addEventListener("popstate", function(e) {
		var theState = location.pathname.split('/').pop();
		updateState(theState);
		//window.history.pushState(null,null,theState);
	});

	$('.remnav').delegate("a", "click", function() {
		var theState = $(this).attr("href");
		var rex = /\.html/;
		var newState = theState.replace(rex, "");
		updateState(newState);
		window.history.pushState(null,null,newState);
		// window.location.hash = newHash;
		return false;
	});

  $("#socialbuttons a[href^='http://']").attr("target","_blank");
});

$(document).keydown(function(event) {
	var keypressed = event.which;
	switch (keypressed) {
		case 73:
			location.hash = '#info';
			break;
		case 82:
			location.hash = '#results';
			break;
		case 84:
			location.hash = '#traditions';
			break;
		case 80:
			location.hash = '#photos';
			break;
		case 191:
			alert('Shortcuts: blah');
			break;
	}
});

function sniffIE() {
	if ($.browser.msie){
		if ($.browser.version == 9.0) {
			alert('Looks like you\'re using IE 9. That\s cool I guess, but I can\'t guarantee this site will look awesome in your browser. Just FYI.');
		}
		else if ($.browser.version == 8.0) {
			alert('Looks like you\'re using IE 8. That\s cool I guess, but I can\'t guarantee this site will look awesome in your browser. Just FYI.');
		}
		else if ($.browser.version == 7.0) {
			alert('Looks like you\'re using IE 7. You should rrrreeeally think about upgrading your browser.');
		}
		else if ($.browser.version == 6.0) {
			alert('Could it be?... I had heard legends and myths, but I never thought they could be true. IE 6... it lives!<br>Seriously though, you should really think about upgrading your browser.');
		}
	}
}

window.onload = sniffIE;