goog.provide 'app.Store'

goog.require 'este.Store'
goog.require 'app.model.SearchResult'
goog.require 'app.model.SearchRequest'

class app.Store extends este.Store

  ###*
    @param {este.Dispatcher} dispatcher
    @constructor
    @extends {este.Store}
  ###
  constructor: (dispatcher) ->
    super()

    dispatcher.register (action, payload) =>
      switch action
        when app.Actions.SEARCH then @search payload

    @searchResult = new app.model.SearchResult
    @searchRequest = new app.model.SearchRequest

  ###*
    @type {app.model.SearchResult}
  ###
  searchResult: null

  ###*
    @type {app.model.SearchRequest}
  ###
  searchRequest: null

  ###*
    @param {app.model.SearchResult} result
  ###
  search: (result) ->
    @searchResult = new app.model.SearchResult result
    @notify()
