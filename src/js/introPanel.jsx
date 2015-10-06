var React = require( "react" );

var Panel = React.createClass( {
  render: function() {
    return (
      <section id={this.props.childId} className="panel">
        <div>
          <p>{this.props.childId}</p>
        </div>
      </section>
    );
  }
} );

module.exports = Panel;