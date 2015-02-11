goog.provide 'app.Actions'

class app.Actions

  ###*
    @param {este.Dispatcher} dispatcher
    @constructor
  ###
  constructor: (@dispatcher) ->

  @SEARCH: 'search'

  search: (searchRequest) ->
    @dispatcher.dispatch Actions.SEARCH, {}
