'use strict';

var Remley = function () {
  var self = {};

  var setUpTraditionsTracking = function () {
    $('.ac-container label').on('click', function () {
      if (typeof _gaq !== 'undefined') {
        var theText = $(this).text();
        _gaq.push(['_trackEvent','Traditions', 'Viewed Tradition', theText]);
      }
    });
  };

  var setUpResultsPage = function () {
    $('#result-container').hide();
    
    $('#yearModal').modal({
      keyboard: false,
      show: false
    });
    
    if ($(window).width() > 940) {
      $('.resultset').off();
      
      $('.resultset').on('click', function () {
        var year = $(this).find('.yearnum').html();
        
        $.get(year+'.html', function (data) {
          $('#yearModal').html(data).modal('toggle');
        });
        
        if (typeof _gaq !== 'undefined') {
          _gaq.push(['_trackEvent','Results', 'Viewed Year', '' + year]);
        }
      });
    }
    else {
      $('.resultset').off();
      
      $('.resultset').click(function () {
        var year = $(this).find('.yearnum').html();
        
        $.get(year+'-b.html', function (data) {
          $('#result-container').html(data);
          $('#result-container').html(data).fadeIn(250);
          window.scrollTo(0,0);
        });
        
        if (typeof _gaq !== 'undefined') {
          _gaq.push(['_trackEvent','Results', 'Viewed Year', '' + year]);
        }
      });
    }
    
    $(window).resize(function () {
      if ($(window).width() > 940) {
        $('.resultset').off();
        
        $('.resultset').on('click', function () {
          var year = $(this).find('.yearnum').html();
          
          $.get(year+'.html', function (data) {
            $('#yearModal').html(data).modal('toggle');
          });
          
          if (typeof _gaq !== 'undefined') {
            _gaq.push(['_trackEvent','Results', 'Viewed Year', '' + year]);
          }
        });
      }
      else {
        $('.resultset').off();
        
        $('.resultset').click(function () {
          var year = $(this).find('.yearnum').html();
          
          $.get(year+'-b.html', function (data) {
            $('#result-container').html(data);
            $('#result-container').fadeIn(250);
            window.scrollTo(0,0);
          });
          
          if (typeof _gaq !== 'undefined') {
            _gaq.push(['_trackEvent','Results', 'Viewed Year', '' + year]);
          }
        });
      }
    });
  };

  var updateState = function (fileToLoad) {

    var fileToLoadName = fileToLoad + '.html';

    if ((fileToLoad === 'index') || (fileToLoad === '')) {
      fileToLoad = 'index';
      fileToLoadName = 'info.html';
    }

    if (typeof _gaq !== 'undefined') {
      _gaq.push(['_trackPageview', '/' + fileToLoadName]);
    }

    $('#guts').fadeOut(250, function () {
      
      if (fileToLoad === 'traditions'){
        $('#guts').addClass('trad');
      }
      else {
        $('#guts').removeClass('trad');
      }
      
      $.get(fileToLoadName, function (data) {
        $('#guts').html(data).fadeIn(250);
        
        if (fileToLoad === 'results') {
          setUpResultsPage();
        } else if (fileToLoad === 'traditions') {
          setUpTraditionsTracking();
        }
      });
    });
    
    // Iterate over all nav links, setting the 'selected' class as-appropriate.
    $('.remnav').each(function () {
      var $this = $(this);
      $this[ $this.find('a').attr( 'href' ) === fileToLoadName ? 'addClass' : 'removeClass' ]( 'active' );
    });
    
    $('.collapse').collapse('hide');
  };

  var addKeyboardShortcuts = function () {
    $(document).keydown(function (event) {
      var keypressed = event.which;
      
      switch (keypressed) {
        case 73:
          updateState('info');
          break;
        case 82:
          updateState('results');
          break;
        case 84:
          updateState('traditions');
          break;
        case 80:
          updateState('photos');
          break;
        case 191:
          window.alert('Ah, you\'ve found the key that reveals the keyboard shortcuts. Good job!\n\n' + 
            'i: Info\nr : Past Results\nt : Traditions\np : Photos');
          break;
      }
    });
  };

  var initialSetup = function () {
    var currentState = window.location.pathname.split('/').pop();
    var History = window.History;

    if (currentState !== '') {
      //We're not at the home page
      updateState(currentState);
    }
    
    History.Adapter.bind(window,'statechange',function () { // Note: We are using statechange instead of popstate
      var theState = History.getState().url.split('/').pop(); // Note: We are using History.getState() instead of event.state
      updateState(theState);
    });

    $('.remnav').delegate('a', 'click', function () {
      var theState = $(this).attr('href');
      var rex = /\.html/;
      var newState = theState.replace(rex, '');
      History.pushState(null,'The Remley Invitational',newState);
      return false;
    });

    $('#socialbuttons a[href^="http://"]').attr('target','_blank');
    
    $('#socialbuttons a').on('click', function () {
      if (typeof _gaq !== 'undefined') {
        var whichOne = ($(this).parent().attr('id') === 'tw-wrapper') ? 'Twitter' : 'Facebook';
        _gaq.push(['_trackEvent','Social', 'Clicked Social Button', whichOne]);
      }
    });
  };

  self.init = function () {
    addKeyboardShortcuts();
    initialSetup();
  };

  return self;
};

$(function () {
  Remley.init();
});