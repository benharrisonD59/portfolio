var React = require( "react" );

var Panel = React.createClass( {
  render: function() {
    return (
      <section id={this.props.childId} className="panelSegment" style={{zIndex: this.props.zIndex}}>
        <div id={"inner"+this.props.childId}>
        <p>{this.props.childId}</p>
          <section className="hexagonContainer">
            <div className="hexagon"><p>Bio</p></div>
            <div className="hexagon"><p>Photography</p></div>
            <div className="hexagon"><p>Programming</p></div>
            <div className="hexagon"><p>Articles</p></div>
          </section>
        </div>
      </section>
    );
  }
} );

module.exports = Panel;