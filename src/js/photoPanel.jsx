var React = require("react");
var Superagent = require("superagent");
var GallerySegment = require("./gallerySegment.jsx");

var Panel = React.createClass({

  getInitialState: function() {
    return {
      photos: [],
      anmlPhotos: [
        "https://farm8.staticflickr.com/7736/17861966155_8fe88522bb.jpg",
        "https://farm1.staticflickr.com/309/18483947516_435190cf83.jpg",
        "https://farm6.staticflickr.com/5445/17676241729_6b958207d6.jpg",
        "https://farm1.staticflickr.com/495/18512264641_d6679bbeac.jpg",
      ],
      strtPhotos: [
        "https://farm1.staticflickr.com/500/19033423076_fe5991c97c.jpg",
        "https://farm1.staticflickr.com/466/19054159682_c53777a788.jpg",
        "https://farm1.staticflickr.com/365/19033491896_ab2111e9f9.jpg",
      ],
      archPhotos: [
        "https://farm1.staticflickr.com/404/19062774481_267ea12e14.jpg",
        "https://farm1.staticflickr.com/557/18873415509_16320a463c.jpg",
        "https://farm1.staticflickr.com/348/19062793601_3f2e1220c8.jpg",
      ],
      url: 'https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=a46f3dc572841a092d4d38a5b7d050c4&user_id=130884748%40N05&per_page=10&page=1&format=json&nojsoncallback=1'
    };
  },

  componentDidMount: function() {
    Superagent
      .get(this.state.url)
      .end(function(error, result) {
        this.setState({
          photos: result.body.photos.photo.map(this.getFlickrPhotoUrl)
        });
      }.bind(this));
  },

  getFlickrPhotoUrl: function(image) {
    return 'https://farm' + image.farm + '.staticflickr.com/' + image.server + '/' + image.id + '_' + image.secret + '.jpg';
  },

  render: function() {
    return (
      <section id={this.props.childId} className="panelSegment " style={{zIndex: this.props.zIndex}}>
        <div id={"inner"+this.props.childId} className="photoPanel">
          <div className="iconSegment">
            <img src="./images/flickr.svg" alt=""/>
            <img src="./images/instagram.png" alt=""/>
            <img src="./images/prettyinstant.png" alt=""/>
          </div>
          <GallerySegment h2="Flickr Feed" photos={this.state.photos} />
          <GallerySegment h2="Animals" photos={this.state.anmlPhotos} />
          <GallerySegment h2="Architecture" photos={this.state.archPhotos} />
          <GallerySegment h2="Street" photos={this.state.strtPhotos} />
        </div>
      </section>
    );
  }
});

module.exports = Panel;
