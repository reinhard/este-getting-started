goog.provide('app.pages.Header');

/**
  @constructor
  @final
 */
app.pages.Header = function() {
  this.component = React.createClass({

    displayName: 'Header',

    render: function() {
      return (
        <div>
          <h1>Este Getting started</h1>
          <a href='/'>Page A</a> | <a href='/page-b'>Page B</a>
          <hr />
        </div>
      );
    }

  });
};
