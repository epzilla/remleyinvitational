$(function(){
      
  // Bind an event to window.onhashchange that, when the hash changes, gets the
  // hash and adds the class "selected" to any matching nav link.
  $(window).hashchange( function(){
    var hash = location.hash;
    
    if (hash === "") { hash = "#info";}
    
    var fileToLoad = hash.substr(1) + '.html';
    $('#guts').fadeOut(250, function() {
		if (hash === "#traditions"){
			$('#guts').addClass("trad");
		}
		else {
			$('#guts').removeClass("trad");
		}
		$.get(fileToLoad, function(data) {
			$('#guts').html(data).fadeIn(250);
		});
    });
    // Iterate over all nav links, setting the "selected" class as-appropriate.
    $('.remnav').each(function(){
      var that = $(this);
      that[ that.find('a').attr( 'href' ) === hash ? 'addClass' : 'removeClass' ]( 'active' );
    });
    
    $('.collapse').collapse('hide');
  });
  
  // Since the event is only triggered when the hash changes, we need to trigger
  // the event now, to handle the hash the page may have loaded with.
  $(window).hashchange();
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