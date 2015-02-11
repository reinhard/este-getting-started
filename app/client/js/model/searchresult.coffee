goog.provide 'app.model.SearchResult'

class app.model.SearchResult

  ###*
    @param {Object=} json
    @constructor
  ###
  constructor: (json) ->
    (
      goog.mixin @, json
    ) if json

  ###*
    @type {number}
  ###
  count: 0
