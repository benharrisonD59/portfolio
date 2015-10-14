var React = require("react");
var Marked = require("react-marked");

var gistSegment = React.createClass({

  render: function() {
    var fileName = this.props.file.filename;
    fileName = fileName.replace(new RegExp('_', 'g'), " ");
    fileName = fileName.replace(new RegExp('.md'), "");
    var contents = Marked(this.props.file.content);

    return (
      <div className="gistSegment">
        <h2>{fileName}</h2>
        <p>{contents}</p>
      </div>

    );
  }

});

module.exports = gistSegment;
