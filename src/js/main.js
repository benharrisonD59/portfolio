var React = require("react");
var Heading = require("./heading.jsx");
var IntroPanel = require("./introPanel.jsx");
var BioPanel = require("./bioPanel.jsx");
var PhotoPanel = require("./photoPanel.jsx");
var CodePanel = require("./codePanel.jsx");
var BlogPanel = require("./blogPanel.jsx");
var OnePageScroll = require("./vendor/onePageScroll.js");

window.onresize = function() {
  location.reload();
};

var App = React.createClass({

  getInitialState: function() {
    return {
      sectionName: "Intro"
    };
  },

  componentDidMount: function() {

    this.panelNames = ["Intro", "Bio", "Photography", "Programming", "Articles"];

    OnePageScroll(".panelContainer", {
      sectionContainer: "section",
      easing: "ease",
      animationTime: 500,
      pagination: true,
      updateURL: true,
      beforeMove: function(index) {},
      afterMove: this.changeHeaderH2,
      loop: false,
      keyboard: true,
      responsiveFallback: false,
      mainContainer: document.querySelector("#app")
    });

  },

  changeHeaderH2: function(panelName) {
    var panelName = this.panelNames[document.querySelector("#app").className.replace("viewing-page-", "") - 1];
    this.setState({
      sectionName: panelName
    });
  },

  render: function() {
    return (
      <div id="app">
        <Heading sectionName={this.state.sectionName}/>
        <div className="panelContainer">
          <IntroPanel childId="1" zIndex="1" />
          <BioPanel childId="2" zIndex="2" />
          <PhotoPanel childId="3" zIndex="3" />
          <CodePanel childId="4" zIndex="4" />
          <BlogPanel childId="5" zIndex="5" />
        </div>
      </div>
    );
  }
});
React.render(<App />, document.body);
