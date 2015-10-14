var React = require("react");
var Markdown = require('react-remarkable');

var gistSegment = React.createClass({

  render: function() {
    var fileName = this.props.file.filename
      .replace(new RegExp('[0-9]'), "")
      .replace(new RegExp('_', 'g'), " ")
      .replace(new RegExp('.md'), "");

    return (
      <div className="gistSegment">
        <h2>{fileName}</h2>
        <Markdown source={this.props.file.content} />
      </div>

    );
  }

});

module.exports = gistSegment;
