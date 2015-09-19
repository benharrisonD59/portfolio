var React = require("react");
var Jumbotron = require("react-bootstrap/lib/Jumbotron");

var Jibble = React.createClass({
  render: function() {
    return (
      <Jumbotron>
        <h1>Hello, World!!</h1>
        <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
      </Jumbotron>
    );
  }
});

module.exports = Jibble;