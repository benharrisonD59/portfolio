var React = require("react");

var Panel = React.createClass({
  render: function() {
    return (
      <section id={this.props.childId} className="panelSegment" style={{zIndex: this.props.zIndex}}>
        <div id={"inner"+this.props.childId} className="introPanel">
            <img src="./images/profile.jpg" alt="profile pic" className="profilePic" />
            <p>
              I always find introductions a little awkward. Especially since I have no idea who you are, nor do I know how much you know about me already. Decided to say that by the end of browsing this site, if I've done my job, you should know a great deal more than when you showed up!
            </p>
            <div className="introVerbs">
              <p>Developer</p>
              <p>Photographer</p>
              <p>Emissary</p>
            </div>
          </div>
      </section>
    );
  }
});

module.exports = Panel;
