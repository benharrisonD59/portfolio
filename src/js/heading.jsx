var React = require("react");
var ReactDOM = require("react-dom");
var Glyphicon = require("react-bootstrap/lib/Glyphicon");
var FitText = require('react-fittext');

var Heading = React.createClass({

  handleHexClick: function(moveToWhere) {
    moveTo('.panelContainer', moveToWhere);
  },

  render: function() {
    return (
      <div id="head" className="heading">
        <div id="headerHexagons" className="hexagonContainerLittle">
          <div id="hhH" className="hexagonLittle" onClick={this.handleHexClick.bind(this, 1)}><Glyphicon glyph="home" /></div>
          <div id="hhU" className="hexagonLittle" onClick={this.handleHexClick.bind(this, 2)}><Glyphicon glyph="user" /></div>
          <div id="hhP" className="hexagonLittle" onClick={this.handleHexClick.bind(this, 3)}><Glyphicon glyph="camera" /></div>
          <div id="hhC" className="hexagonLittle" onClick={this.handleHexClick.bind(this, 4)}><Glyphicon glyph="hdd" /></div>
          <div id="hhA" className="hexagonLittle" onClick={this.handleHexClick.bind(this, 5)}><Glyphicon glyph="align-left" /></div>
        </div>
        <div id="title">
          <FitText>
            <h1>Benjamin R Harrison</h1>
          </FitText>
        </div>
        <div id="pageName">
          <FitText compressor={1.2}>
            <h2>{this.props.sectionName}</h2>
          </FitText>
        </div>
      </div>
    );
  }
});

module.exports = Heading;