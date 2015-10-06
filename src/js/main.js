var React = require( "react" );
var Heading = require( "./heading.jsx" );
var IntroPanel = require( "./introPanel.jsx" );
var BioPanel = require( "./bioPanel.jsx" );
var PhotoPanel = require( "./photoPanel.jsx" );
var CodePanel = require( "./codePanel.jsx" );
var BlogPanel = require( "./blogPanel.jsx" );
var ScrollMagic = require( "scrollmagic" );

// init ScrollMagic Controller
var controller = new ScrollMagic.Controller();

var App = React.createClass( {

  componentDidMount: function() {
    // Scene Handler
    var scene1 = new ScrollMagic.Scene( {
        triggerElement: "#one", // point of execution
        duration: window.innerHeight - 200, // pin element for the window height - 1
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
    var scene3 = new ScrollMagic.Scene( {
        triggerElement: "#three", // point of execution
        duration: window.innerHeight, // pin element for the window height - 1
        triggerHook: 0, // don't trigger until #pinned-trigger1 hits the top of the viewport
        reverse: true // allows the effect to trigger when scrolled in the reverse direction
      } )
      .setPin( "#innerthree" ) // the element we want to pin
      .addTo( controller );
    var scene4 = new ScrollMagic.Scene( {
        triggerElement: "#four", // point of execution
        duration: window.innerHeight, // pin element for the window height - 1
        triggerHook: 0, // don't trigger until #pinned-trigger1 hits the top of the viewport
        reverse: true // allows the effect to trigger when scrolled in the reverse direction
      } )
      .setPin( "#innerfour" ) // the element we want to pin
      .addTo( controller );
  },

  render: function() {
    return (
      <div className="app">
        <Heading />
        <div className="panelContainer">
          <IntroPanel childId="one" />
          <BioPanel childId="two" />
          <PhotoPanel childId="three" />
          <CodePanel childId="four" />
          <BlogPanel childId="five" />
        </div>
      </div>
    );
  }
} );

React.render( <App />, document.getElementById( 'main' ) );
