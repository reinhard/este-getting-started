goog.provide('app.pages.PageA');

goog.require('app.Actions');
goog.require('app.Store');
goog.require('app.model.SearchRequest');


/**
  @param {app.Actions} actions
  @param {app.Store} store
  @constructor
  @final
 */
app.pages.PageA = function(actions, store) {

  this.component = React.createFactory(React.createClass({

    displayName: 'PageA',

    handleQueryChange: function(event) {
      store.searchRequest.query = event.target.value.toUpperCase();
      this.forceUpdate();
    },

    handleSearch: function(event) {
      event.preventDefault();
      actions.search(store.searchRequest);
    },

    render: function() {
      return (
         <div>This is Page A.</div>
      );
    }

  }));

};
