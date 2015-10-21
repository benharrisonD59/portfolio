var React = require("react");
var InteractivePanelSegment = require("./interactivePanelSegment.jsx");
var BioContents = require("./vendor/bioContents.json");

var Panel = React.createClass({

  getInitialState: function() {
    return ({
      contentsTable: BioContents.contentsTable,
      contents: BioContents.contents
    });
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
