function sniffIE(){$.browser.msie&&($.browser.version==9?alert("Looks like you're using IE 9. Thats cool I guess, but I can't guarantee this site will look awesome in your browser. Just FYI."):$.browser.version==8?alert("Looks like you're using IE 8. Thats cool I guess, but I can't guarantee this site will look awesome in your browser. Just FYI."):$.browser.version==7?alert("Looks like you're using IE 7. You should rrrreeeally think about upgrading your browser."):$.browser.version==6&&alert("Could it be?... I had heard legends and myths, but I never thought they could be true. IE 6... it lives!<br>Seriously though, you should really think about upgrading your browser."))}$(function(){function e(e){var t=e+".html";if(e==""||e==null){e="index";t="info.html"}console.log(e);console.log(t);$("#guts").fadeOut(250,function(){e==="traditions"?$("#guts").addClass("trad"):$("#guts").removeClass("trad");$.get(t,function(e){$("#guts").html(e).fadeIn(250)})});$(".remnav").each(function(){var e=$(this);e[e.find("a").attr("href")===t?"addClass":"removeClass"]("active")});$(".collapse").collapse("hide")}window.addEventListener("popstate",function(t){var n=location.pathname.split("/").pop();e(n)});$(".remnav").delegate("a","click",function(){var t=$(this).attr("href"),n=/\.html/,r=t.replace(n,"");e(r);window.history.pushState(null,null,r);return!1});$("#socialbuttons a[href^='http://']").attr("target","_blank")});$(document).keydown(function(e){var t=e.which;switch(t){case 73:location.hash="#info";break;case 82:location.hash="#results";break;case 84:location.hash="#traditions";break;case 80:location.hash="#photos";break;case 191:alert("Shortcuts: blah")}});window.onload=sniffIE;