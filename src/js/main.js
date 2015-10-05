var React = require( "react" );
var SectionPanel = require( "./sectionPanel.jsx" );

var App = React.createClass( {
  render: function() {
    return (
      <div className="sectionContainer">
        <SectionPanel />
        <SectionPanel />
        <SectionPanel />
      </div>
    );
  }
} );

React.render( <App />, document.getElementById( 'main' ) );