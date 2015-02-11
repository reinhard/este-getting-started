goog.provide('app.pages.Basepage');

goog.require('app.Routes');
goog.require('app.pages.Header');

/**
  @param {app.pages.PageA} pageA
  @param {app.pages.PageB} pageB
  @param {app.pages.Header} header
  @param {app.Routes} routes
  @param {app.Store} store
  @constructor
  @final
 */
app.pages.Basepage = function(pageA, pageB, header, routes, store) {

  this.component = React.createFactory(React.createClass({

    displayName: 'EsteGettingStarted',

    componentDidMount: function() {
      store.listen('change', this.onStoreChange);
    },

    componentWillUnmount: function() {
      store.unlisten('change', this.onStoreChange);
    },

    onStoreChange: function() {
      this.forceUpdate();
    },

    render: function() {
      var page = pageA;
      if(routes.active === routes.pageB) {
        page = pageB;
      }

      return (
        <div>
          <header.component />
          {page.component()}
        </div>
      );
    }

  }));
};
