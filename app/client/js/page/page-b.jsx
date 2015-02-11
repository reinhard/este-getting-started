goog.provide('app.pages.PageB');

/**
  @constructor
  @final
 */
app.pages.PageB = function() {
  this.component = React.createFactory(React.createClass({

    displayName: 'PageB',

    getInitialState: function() {
      return {secondsElapsed: 0};
    },

    tick: function() {
      this.setState({secondsElapsed: this.state.secondsElapsed + 1});
    },

    componentDidMount: function() {
      this.interval = setInterval(this.tick, 1000);
    },

    componentWillUnmount: function() {
      clearInterval(this.interval);
    },

    render: function() {
      return (
        <div>rendered {this.state.secondsElapsed} seconds ago</div>
      );
    }

  }));
};
