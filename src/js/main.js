var React = require("react");
var ReactDOM = require("react-dom");
var Heading = require("./heading.jsx");
var IntroPanel = require("./introPanel.jsx");
var BioPanel = require("./bioPanel.jsx");
var PhotoPanel = require("./photoPanel.jsx");
var CodePanel = require("./codePanel.jsx");
var BlogPanel = require("./blogPanel.jsx");
var OnePageScroll = require("./onePageScroll.jsx");

window.onresize = function() {
  location.reload();
};

var App = React.createClass({

  getInitialState: function() {
    return {
      sectionName: "Intro",
      panelNames: ["Intro", "Bio / RESUMé", "Photography", "Programming", "Articles"],
      scrollSettings: {
        afterMove: this.changeHeaderH2,
        mainContainer: "#app"
      }
    };
  },

  changeHeaderH2: function(panelName) {
    this.setState({
      sectionName: this.state.panelNames[document.querySelector("#app").className.replace("viewing-page-", "") - 1]
    });
  },

  render: function() {
    return (
      <div id="app">
        <Heading sectionName={this.state.sectionName}/>
        <OnePageScroll settings={this.state.scrollSettings}>
          <IntroPanel childId="1" zIndex="1" />
          <BioPanel childId="2" zIndex="2" />
          <PhotoPanel childId="3" zIndex="3" />
          <CodePanel childId="4" zIndex="4" />
          <BlogPanel childId="5" zIndex="5" />
        </OnePageScroll>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById("reactEntryPoint"));
