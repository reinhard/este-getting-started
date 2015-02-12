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
      store.searchRequest.query = event.target.value;
      this.forceUpdate();
    },

    handleSearch: function(event) {
      event.preventDefault();
      actions.search(store.searchRequest);
    },

    render: function() {
      var resultValue = store.searchResult.value;
      var resultPanel;
      if(resultValue) {
        resultPanel = <p>resultValue: {resultValue}</p>
      }

      return (
         <div>
           <p>This is Page A.</p>

           <form onSubmit={this.handleSearch}>
             <input value={store.searchRequest.query}
               onChange={this.handleQueryChange}
               type='text'
               autoFocus='true'/>
               <button>search</button>
           </form>
           
           {resultPanel}
        </div>
      );
    }

  }));

};
