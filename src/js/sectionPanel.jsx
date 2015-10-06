var React = require( "react" );

var SectionPanel = React.createClass( {
  render: function() {
    return (
      <section id={this.props.childId} className="sectionPanel">
        <div id={"inner" + this.props.childId} >
          <p>{this.props.childId}</p>
        </div>
      </section>
    );
  }
} );

module.exports = SectionPanel;