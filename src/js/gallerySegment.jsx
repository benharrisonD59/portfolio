var React = require("react");
var Carousel = require('react-bootstrap/lib/Carousel');
var CarouselItem = require('react-bootstrap/lib/CarouselItem');

var gallerySegment = React.createClass({

  render: function() {
    return (
      <div className="gallerySegment">
        <h2>{this.props.h2}</h2>
        <div className="photoSegment">
          <Carousel>
            {this.props.photos.map(function(photo){
              return (
                <CarouselItem>
                   <img src={photo}/>
                </CarouselItem>
                );
            })}
          </Carousel>
        </div>
      </div>
    );
  }
});

module.exports = gallerySegment;




