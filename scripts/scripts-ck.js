function setUpTraditionsTracking(){$(".ac-container label").on("click",function(){if(typeof _gaq!="undefined"){var e=$(this).text();_gaq.push(["_trackEvent","Traditions","Viewed Tradition",e])}})}function setUpResultsPage(){$("#result-container").hide();$("#yearModal").modal({keyboard:!1,show:!1});if($(window).width()>940){$(".resultset").off();$(".resultset").on("click",function(){var e=$(this).find(".yearnum").html();$.get(e+".html",function(e){$("#yearModal").html(e).modal("toggle")});typeof _gaq!="undefined"&&_gaq.push(["_trackEvent","Results","Viewed Year",""+e])})}else{$(".resultset").off();$(".resultset").click(function(){var e=$(this).find(".yearnum").html();$.get(e+"-b.html",function(e){$("#result-container").html(e);$("#result-container").html(e).fadeIn(250);window.scrollTo(0,0)});typeof _gaq!="undefined"&&_gaq.push(["_trackEvent","Results","Viewed Year",""+e])})}$(window).resize(function(){if($(window).width()>940){$(".resultset").off();$(".resultset").on("click",function(){var e=$(this).find(".yearnum").html();$.get(e+".html",function(e){$("#yearModal").html(e).modal("toggle")});typeof _gaq!="undefined"&&_gaq.push(["_trackEvent","Results","Viewed Year",""+e])})}else{$(".resultset").off();$(".resultset").click(function(){var e=$(this).find(".yearnum").html();$.get(e+"-b.html",function(e){$("#result-container").html(e);$("#result-container").fadeIn(250);window.scrollTo(0,0)});typeof _gaq!="undefined"&&_gaq.push(["_trackEvent","Results","Viewed Year",""+e])})}})}function updateState(e){var t=e+".html";if(e=="index"||e==""){e="index";t="info.html"}if(typeof _gaq!="undefined"){console.log("pushed "+e);_gaq.push(["_trackPageview","/"+t])}$("#guts").fadeOut(250,function(){e==="traditions"?$("#guts").addClass("trad"):$("#guts").removeClass("trad");$.get(t,function(t){$("#guts").html(t).fadeIn(250);e==="results"?setUpResultsPage():e==="traditions"&&setUpTraditionsTracking()})});$(".remnav").each(function(){var e=$(this);e[e.find("a").attr("href")===t?"addClass":"removeClass"]("active")});$(".collapse").collapse("hide")}$(function(){var e=location.pathname.split("/").pop();e!=""&&updateState(e);var t=window.History;t.Adapter.bind(window,"statechange",function(){var e=t.getState().url.split("/").pop();updateState(e)});$(".remnav").delegate("a","click",function(){var e=$(this).attr("href"),n=/\.html/,r=e.replace(n,"");t.pushState(null,"The Remley Invitational",r);return!1});$("#socialbuttons a[href^='http://']").attr("target","_blank");$("#socialbuttons a").on("click",function(){if(typeof _gaq!="undefined"){var e=$(this).parent().attr("id")==="tw-wrapper"?"Twitter":"Facebook";_gaq.push(["_trackEvent","Social","Clicked Social Button",e])}})});$(document).keydown(function(e){var t=e.which;switch(t){case 73:updateState("info");break;case 82:updateState("results");break;case 84:updateState("traditions");break;case 80:updateState("photos");break;case 191:alert("Ah, you've found the key that reveals the keyboard shortcuts. Good job!\n\ni: Info\nr : Past Results\nt : Traditions\np : Photos")}});