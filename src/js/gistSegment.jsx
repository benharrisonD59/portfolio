var React = require("react");

var gistSegment = React.createClass({

  render: function() {
    window.a = this.props.file;
    return (
      <div className="gistSegment">
        <h2>{this.props.file.filename}</h2>
        <p>{this.props.file.content}</p>
      </div>

    );
  }

});

module.exports = gistSegment;
