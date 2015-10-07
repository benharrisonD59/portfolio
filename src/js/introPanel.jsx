var React = require( "react" );

var Panel = React.createClass( {
  render: function() {
    return (
      <section id={this.props.childId} className="panelSegment" style={{zIndex: this.props.zIndex}}>
        <div id={"inner"+this.props.childId}>
          <section className="introContainer">
            <img src="./images/profile.jpg" alt="profile pic" className="profilePic" />
          </section>
          <section className="hexagonContainer">
            <div className="hexagon"><p>Bio</p></div>
            <div className="hexagon"><p>Photos</p></div>
            <div className="hexagon"><p>Code</p></div>
            <div className="hexagon"><p>Blog</p></div>
          </section>
        </div>
      </section>
    );
  }
} );

module.exports = Panel;