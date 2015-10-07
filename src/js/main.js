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

  getInitialState: function() {
    return {
      sectionName: "Intro"
    };
  },

  componentDidMount: function() {
    // Scene Handler
    var scene1 = new ScrollMagic.Scene( {
        triggerElement: "#one", // point of execution
        duration: window.innerHeight, // pin element for the window height - 1
        triggerHook: 0, // don't trigger until #pinned-trigger1 hits the top of the viewport
        reverse: true // allows the effect to trigger when scrolled in the reverse direction
      } )
      .setPin( "#innerone" )
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
    var scene5 = new ScrollMagic.Scene( {
        triggerElement: "#one",
        duration: window.innerHeight,
        triggerHook: 0,
        reverse: true
      } )
      .setClassToggle( '#hhH', 'orange' )
      .on("progress", function(){this.setState({sectionName: "Intro"});}.bind(this))
      .addTo( controller );
    var scene6 = new ScrollMagic.Scene( {
        triggerElement: "#two",
        duration: window.innerHeight,
        triggerHook: 0,
        reverse: true
      } )
      .setClassToggle( '#hhU', 'orange' )
      .on("progress", function(){this.setState({sectionName: "Bio"});}.bind(this))
      .addTo( controller );
    var scene7 = new ScrollMagic.Scene( {
        triggerElement: "#three",
        duration: window.innerHeight,
        triggerHook: 0,
        reverse: true
      } )
      .setClassToggle( '#hhP', 'orange' )
      .on("progress", function(){this.setState({sectionName: "Photography"});}.bind(this))
      .addTo( controller );
    var scene8 = new ScrollMagic.Scene( {
        triggerElement: "#four",
        duration: window.innerHeight,
        triggerHook: 0,
        reverse: true
      } )
      .setClassToggle( '#hhC', 'orange' )
      .on("progress", function(){this.setState({sectionName: "Programming"});}.bind(this))
      .addTo( controller );
    var scene9 = new ScrollMagic.Scene( {
        triggerElement: "#five",
        duration: window.innerHeight,
        triggerHook: 0,
        reverse: true
      } )
      .setClassToggle( '#hhA', 'orange' )
      .on("progress", function(){this.setState({sectionName: "Articles"});}.bind(this))
      .addTo( controller );
  },

  render: function() {
    return (
      <div className="app">
        <Heading sectionName={this.state.sectionName} />
        <div className="panelContainer">
          <IntroPanel childId="one" zIndex="1" />
          <BioPanel childId="two" zIndex="2" />
          <PhotoPanel childId="three" zIndex="3" />
          <CodePanel childId="four" zIndex="4" />
          <BlogPanel childId="five" zIndex="5" />
        </div>
      </div>
    );
  }
} );

React.render( <App />, document.getElementById( 'main' ) );
