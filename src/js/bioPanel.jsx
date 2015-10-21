var React = require("react");
var Superagent = require("superagent");
var InteractivePanelSegment = require("./interactivePanelSegment.jsx");

var Panel = React.createClass({

  getInitialState: function() {
    return ({
      url: "https://api.github.com/gists/ff7e6061402fb17255a0",
      contentsTable: [],
      contents: {}
    });
  },

  componentDidMount: function() {
    Superagent
      .get(this.state.url)
      .end(function(error, result) {
        var gistFiles = JSON.parse(result.text).files;
        var firstGist = gistFiles[Object.keys(gistFiles)[0]].content;
        if (this.isMounted()) {
          this.setState({
            contentsTable: JSON.parse(firstGist).contentsTable,
            contents: JSON.parse(firstGist).contents
          });
        }
      }.bind(this));
  },

  render: function() {
    return (
      <section id={this.props.childId} className="panelSegment" style={{zIndex: this.props.zIndex}}>
        <div id={"inner"+this.props.childId} className="bioPanel">
          <InteractivePanelSegment contentsTable={this.state.contentsTable} contents={this.state.contents} />
        </div>
      </section>
    );
  }
});

module.exports = Panel;
