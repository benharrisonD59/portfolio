var React = require("react");
var Markdown = require('react-remarkable');
var FitText = require('react-fittext');

var gistSegment = React.createClass({

  render: function() {
    var fileName = this.props.file.filename
      .replace(new RegExp('[0-9]'), "")
      .replace(new RegExp('_', 'g'), " ")
      .replace(new RegExp('.md'), "");

    return (
      <div className="gistSegment">
        <FitText>
          <h2>{fileName}</h2>
        </FitText>
        <FitText>
          <Markdown source={this.props.file.content} />
        </FitText>
      </div>
    );
  }

});

module.exports = gistSegment;
