function sniffIE(){$.browser.msie&&($.browser.version==9?alert("Looks like you're using IE 9. Thats cool I guess, but I can't guarantee this site will look awesome in your browser. Just FYI."):$.browser.version==8?alert("Looks like you're using IE 8. Thats cool I guess, but I can't guarantee this site will look awesome in your browser. Just FYI."):$.browser.version==7?alert("Looks like you're using IE 7. You should rrrreeeally think about upgrading your browser."):$.browser.version==6&&alert("Could it be?... I had heard legends and myths, but I never thought they could be true. IE 6... it lives!<br>Seriously though, you should really think about upgrading your browser."))}$(function(){$(window).hashchange(function(){var a=location.hash;a===""&&(a="#info");var b=a.substr(1)+".html";$("#guts").fadeOut(250,function(){a==="#traditions"?$("#guts").addClass("trad"):$("#guts").removeClass("trad");$.get(b,function(a){$("#guts").html(a).fadeIn(250)})});$(".remnav").each(function(){var b=$(this);b[b.find("a").attr("href")===a?"addClass":"removeClass"]("active")});$(".collapse").collapse("hide")});$(window).hashchange();$("#socialbuttons a[href^='http://']").attr("target","_blank")});$(document).keydown(function(a){var b=a.which;switch(b){case 73:location.hash="#info";break;case 82:location.hash="#results";break;case 84:location.hash="#traditions";break;case 80:location.hash="#photos";break;case 191:alert("Shortcuts: blah")}});window.onload=sniffIE;