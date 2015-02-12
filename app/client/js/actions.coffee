goog.provide 'app.Actions'

class app.Actions

  ###*
    @param {este.Dispatcher} dispatcher
    @constructor
  ###
  constructor: (@dispatcher) ->

  @SEARCH: 'search'

  search: (searchRequest) ->
    resultValue = searchRequest.query.toUpperCase()
    @dispatcher.dispatch Actions.SEARCH, new app.model.SearchResult resultValue
