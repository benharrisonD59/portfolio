var React = require( "react" );

var Panel = React.createClass( {
  render: function() {
    return (
      <section id={this.props.childId} className="panelSegment" style={{zIndex: this.props.zIndex}}>
        <div id={"inner"+this.props.childId}>
          <p>{this.props.childId}</p>
        </div>
      </section>
    );
  }
} );

module.exports = Panel;