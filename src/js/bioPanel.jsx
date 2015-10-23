var React = require("react");
var Superagent = require("superagent");
var InteractivePanelSegment = require("./interactivePanelSegment.jsx");

var Panel = React.createClass({

  getInitialState: function() {
    return ({
      url: "https://api.github.com/gists/ff7e6061402fb17255a0",
      contentsTable: [],
      contents: {},
      previewTitle: "<-Take a look at the left for premium content",
      previewContent: [
        {
          "title": "Reasons and Things",
          "contents": [
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta natus illum recusandae voluptatum dolorem! Obcaecati, maxime in omnis, architecto molestias accusamus perspiciatis, sapiente, provident eos perferendis corrupti dolore consectetur repudiandae.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum tenetur ipsam repellat! Atque officiis pariatur accusantium quod, corporis numquam assumenda tenetur suscipit, maxime modi sed possimus. Sit dolores tempora architecto. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores asperiores doloribus laudantium reiciendis, blanditiis odio animi veniam, provident perspiciatis eos, enim ut consequuntur laboriosam sint. Neque excepturi, dolorem ad. Tenetur? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque delectus labore molestias ratione assumenda saepe, quod distinctio blanditiis quo iste facilis eos adipisci, cum commodi ea minus quaerat quasi eveniet."
          ]
        }
      ]
    });
  },

  componentWillMount: function() {
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
          <InteractivePanelSegment contentsTable={this.state.contentsTable} contents={this.state.contents} previewTitle={this.state.previewTitle} previewContent={this.state.previewContent}/>
        </div>
      </section>
    );
  }
});

module.exports = Panel;
