var React = require( "react" );
var Glyphicon = require( "react-bootstrap/lib/Glyphicon" );

var Heading = React.createClass( {
  render: function() {
    return (
      <div className="heading">
        <section id="headerHexagons" className="hexagonContainerLittle">
          <a href="#one"><div id="hhU" className="hexagonLittle"><Glyphicon glyph="user" /></div></a>
          <a href="#two"><div id="hhP" className="hexagonLittle"><Glyphicon glyph="camera" /></div></a>
          <a href="#three"><div id="hhC" className="hexagonLittle"><Glyphicon glyph="hdd" /></div></a>
          <a href="#four"><div id="hhA" className="hexagonLittle"><Glyphicon glyph="align-left" /></div></a>
        </section>
        <section>
          <h1>HEADER</h1>
        </section>
        <section>

        </section>
      </div>
    );
  }
} );

module.exports = Heading;
