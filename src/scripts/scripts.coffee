'use strict'
Remley = do ->
  self = {}

  setUpTraditionsTracking = ->
    $('.ac-container label').on 'click', ->
      if typeof _gaq != 'undefined'
        theText = $(this).text()
        _gaq.push [
          '_trackEvent'
          'Traditions'
          'Viewed Tradition'
          theText
        ]
      return
    return

  setUpResultsPage = ->
    $('#result-container').hide()
    
    $('#yearModal').modal
      keyboard: false
      show: false
    
    $('.resultset').off()

    if $(window).width() > 940
      $('.resultset').on 'click', ->
        year = $(this).find('.yearnum').html()
        $.get year + '.html', (data) ->
          $('#yearModal').html(data).modal 'toggle'
          return
        
        if typeof _gaq != 'undefined'
          _gaq.push [
            '_trackEvent'
            'Results'
            'Viewed Year'
            '' + year
          ]
        return
    else
      $('.resultset').on 'click', ->
        year = $(this).find('.yearnum').html()
        $.get year + '-b.html', (data) ->
          $('#result-container').html data
          $('#result-container').html(data).fadeIn 250
          window.scrollTo 0, 0
          return
        
        if typeof _gaq != 'undefined'
          _gaq.push [
            '_trackEvent'
            'Results'
            'Viewed Year'
            '' + year
          ]
        return
    
    $(window).resize ->
      $('.resultset').off()
      
      if $(window).width() > 940
        $('.resultset').on 'click', ->
          year = $(this).find('.yearnum').html()
          $.get year + '.html', (data) ->
            $('#yearModal').html(data).modal 'toggle'
            return
          if typeof _gaq != 'undefined'
            _gaq.push [
              '_trackEvent'
              'Results'
              'Viewed Year'
              '' + year
            ]
          return
      else
        $('.resultset').on 'click', ->
          year = $(this).find('.yearnum').html()
          $.get year + '-b.html', (data) ->
            $('#result-container').html data
            $('#result-container').fadeIn 250
            window.scrollTo 0, 0
            return
          if typeof _gaq != 'undefined'
            _gaq.push [
              '_trackEvent'
              'Results'
              'Viewed Year'
              '' + year
            ]
          return
      return
    return

  updateState = (fileToLoad) ->
    fileToLoadName = fileToLoad + '.html'
    
    if fileToLoad == 'index' or fileToLoad == ''
      fileToLoad = 'index'
      fileToLoadName = 'info.html'
    
    if typeof _gaq != 'undefined'
      _gaq.push [
        '_trackPageview'
        '/' + fileToLoadName
      ]
    
    $('#guts').fadeOut 250, ->
      
      if fileToLoad == 'traditions'
        $('#guts').addClass 'trad'
      else
        $('#guts').removeClass 'trad'
      
      $.get fileToLoadName, (data) ->
        $('#guts').html(data).fadeIn 250
        if fileToLoad == 'results'
          setUpResultsPage()
        else if fileToLoad == 'traditions'
          setUpTraditionsTracking()
        return
      return
    
    # Iterate over all nav links, setting the 'selected' class as-appropriate.
    $('.remnav').each ->
      el = $(this)
      linkText = el.find('a').attr( 'href' )
      if linkText == fileToLoadName
        el.addClass 'active'
      else
        el.removeClass 'active'
      return
    
    $('.collapse').collapse 'hide'
    return

  addKeyboardShortcuts = ->
    $(document).keydown (event) ->
      keypressed = event.which
      switch keypressed
        when 73
          updateState 'info'
        when 82
          updateState 'results'
        when 84
          updateState 'traditions'
        when 80
          updateState 'photos'
        when 191
          window.alert 'Ah, you\'ve found the key that reveals the keyboard ' +
                       'shortcuts. Good job!\n\n i: Info\nr : Past ' +
                       'Results\nt : Traditions\np : Photos'
      return
    return

  initialSetup = ->
    currentState = window.location.pathname.split('/').pop()
    History = window.History
    
    if currentState != ''
      #We're not at the home page
      updateState currentState
    
    History.Adapter.bind window, 'statechange', ->
      # Note: We are using statechange instead of popstate
      theState = History.getState().url.split('/').pop()
      # Note: We are using History.getState() instead of event.state
      updateState theState
      return
    
    $('.remnav').delegate 'a', 'click', ->
      theState = $(this).attr('href')
      rex = /\.html/
      newState = theState.replace(rex, '')
      History.pushState null, 'The Remley Invitational', newState
      false
    
    $('#socialbuttons a[href^="http://"]').attr 'target', '_blank'
    
    $('#socialbuttons a').on 'click', ->
      if typeof _gaq != 'undefined'
        if $(this).parent().attr('id') == 'tw-wrapper'
          whichOne = 'Twitter'
        else
          whichOne = 'Facebook'
        _gaq.push [
          '_trackEvent'
          'Social'
          'Clicked Social Button'
          whichOne
        ]
      return
    return

  self.init = ->
    addKeyboardShortcuts()
    initialSetup()
    return

  self

$ ->
  Remley.init()
  return
