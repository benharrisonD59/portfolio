var React = require( "react" );
var SectionPanel = require( "./sectionPanel.jsx" );
var ScrollMagic = require( "scrollmagic" );

// init ScrollMagic Controller
var controller = new ScrollMagic.Controller();

var App = React.createClass( {

  componentDidMount: function() {
    // Scene Handler
    var scene1 = new ScrollMagic.Scene( {
        triggerElement: "#one", // point of execution
        duration: window.innerHeight, // pin element for the window height - 1
        triggerHook: 0, // don't trigger until #pinned-trigger1 hits the top of the viewport
        reverse: true // allows the effect to trigger when scrolled in the reverse direction
      } )
      .setPin( "#innerone" ) // the element we want to pin
      .addTo( controller );
    var scene2 = new ScrollMagic.Scene( {
        triggerElement: "#two", // point of execution
        duration: window.innerHeight, // pin element for the window height - 1
        triggerHook: 0, // don't trigger until #pinned-trigger1 hits the top of the viewport
        reverse: true // allows the effect to trigger when scrolled in the reverse direction
      } )
      .setPin( "#innertwo" ) // the element we want to pin
      .addTo( controller );
  },

  render: function() {
    return (
      <div className="sectionContainer">
        <SectionPanel childId="one" />
        <SectionPanel childId="two" />
        <SectionPanel childId="three" />
      </div>
    );
  }
} );

React.render( <App />, document.getElementById( 'main' ) );
