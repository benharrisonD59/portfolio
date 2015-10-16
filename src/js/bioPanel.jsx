var React = require("react");
var Superagent = require("superagent");
var GistSegment = require("./gistSegment.jsx");

var Panel = React.createClass({

  getInitialState: function() {
    return {
      gistKeys: [],
      gists: {},
      url: "https://api.github.com/gists/ff7e6061402fb17255a0"
    };
  },

  componentDidMount: function() {
    Superagent
      .get(this.state.url)
      .end(function(error, result) {
        this.setState({
          gistKeys: Object.keys(JSON.parse(result.text).files),
          gists: JSON.parse(result.text).files
        });
      }.bind(this));
  },

  render: function() {
    return (
      <section id={this.props.childId} className="panelSegment" style={{zIndex: this.props.zIndex}}>
        <div id={"inner"+this.props.childId} className="bioPanel">
          {this.state.gistKeys.map(function(key){
            return (<GistSegment file={this.state.gists[key]} key={key}/>);
          }.bind(this))}
        </div>
      </section>
    );
  }
});

module.exports = Panel;
